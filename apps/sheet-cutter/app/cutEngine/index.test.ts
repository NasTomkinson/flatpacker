import { describe, expect, it } from 'vitest'

import { CutEngine } from './index'

describe('CutEngine.expandPeices', () => {
    it('creates one numbered piece for each requested quantity', () => {
        // Arrange a cut that represents two identical physical shelves.
        const cutList = [
            {
                label: 'shelves',
                width: 100,
                height: 100,
                quantity: 2,
            },
        ]

        // Act by expanding the quantity into individual pieces.
        const result = CutEngine.expandPeices(cutList)

        // Assert that each piece retains its dimensions, receives a unique label,
        // and has an individual quantity of one.
        expect(result).toEqual([
            {
                label: 'shelves-1',
                width: 100,
                height: 100,
                quantity: 1,
            },
            {
                label: 'shelves-2',
                width: 100,
                height: 100,
                quantity: 1,
            },
        ])

        // Confirm expansion did not alter the caller's original cut-list entry.
        expect(cutList[0]).toEqual({
            label: 'shelves',
            width: 100,
            height: 100,
            quantity: 2,
        })
    })
})

describe('CutEngine.groupPeicesByDimensions', () => {
    it('groups cuts that share a width or height exactly once', () => {
        // Arrange width matches, height matches, a transitive bridge, and one cut
        // that has neither dimension in common with the others.
        const cutList = [
            { label: 'shelf-1', width: 100, height: 40, quantity: 1 },
            { label: 'shelf-2', width: 100, height: 50, quantity: 1 },
            { label: 'side-1', width: 200, height: 50, quantity: 1 },
            { label: 'back-1', width: 300, height: 80, quantity: 1 },
        ]

        // Act by grouping cuts according to either matching dimension.
        const result = CutEngine.groupPeicesByDimensions(cutList)

        // Assert that the first three cuts form one connected group: the shelves
        // match by width, while shelf-2 and side-1 match by height.
        expect(result).toEqual({
            'group-1': [
                { label: 'shelf-1', width: 100, height: 40, quantity: 1 },
                { label: 'shelf-2', width: 100, height: 50, quantity: 1 },
                { label: 'side-1', width: 200, height: 50, quantity: 1 },
            ],
            'group-2': [
                { label: 'back-1', width: 300, height: 80, quantity: 1 },
            ],
        })

        // Confirm that no cut was duplicated across the generated groups.
        expect(Object.values(result).flat()).toHaveLength(cutList.length)
    })
})

describe('CutEngine.CalculateRows', () => {
    it('calculates row and column capacity for every piece in each group', () => {
        // Arrange two pieces in one group to confirm that each piece uses its own
        // dimensions while remaining associated with the group.
        const groupedCutList = {
            'group-1': [
                { label: 'shelf-1', width: 100, height: 50, quantity: 1 },
                { label: 'side-1', width: 200, height: 50, quantity: 1 },
            ],
        }

        // Act using a 304 × 154 sheet and a 2-unit kerf between pieces.
        const result = CutEngine.CalculateRows(groupedCutList, {
            width: 304,
            height: 154,
            kerf: 2,
        })

        // Assert that kerf permits three 100-wide pieces but only one 200-wide
        // piece per row, while both pieces fit three times vertically.
        expect(result).toEqual({
            'group-1': [
                {
                    piece: {
                        label: 'shelf-1',
                        width: 100,
                        height: 50,
                        quantity: 1,
                    },
                    piecesPerRow: 3,
                    piecesPerColumn: 3,
                },
                {
                    piece: {
                        label: 'side-1',
                        width: 200,
                        height: 50,
                        quantity: 1,
                    },
                    piecesPerRow: 1,
                    piecesPerColumn: 3,
                },
            ],
        })
    })

    it('returns zero when a piece is larger than the sheet', () => {
        // Arrange one piece that exceeds both available sheet dimensions.
        const groupedCutList = {
            'group-1': [
                { label: 'oversized-1', width: 500, height: 300, quantity: 1 },
            ],
        }

        // Act and assert that an oversized piece has no row or column capacity.
        expect(CutEngine.CalculateRows(groupedCutList, {
            width: 400,
            height: 200,
            kerf: 2,
        })).toEqual({
            'group-1': [
                {
                    piece: {
                        label: 'oversized-1',
                        width: 500,
                        height: 300,
                        quantity: 1,
                    },
                    piecesPerRow: 0,
                    piecesPerColumn: 0,
                },
            ],
        })
    })
})
