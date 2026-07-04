interface CutList {
    label?: string, 
    width: number, 
    height: number, 
    quantity: number 
}

interface SheetSettings {
    width: number,
    height: number,
    depth: number,
    kerf: number,
}

interface PieceCapacity {
    piece: CutList,
    piecesPerRow: number,
    piecesPerColumn: number,
}

export class CutEngine {

    constructor({cutlist, sheetSettings}: { cutlist: CutList[], sheetSettings: SheetSettings}) { 

        // Expand the cut list once when the engine is created so later stages can
        // work with individual pieces instead of quantities.
        const expandedCutList = CutEngine.expandPeices(cutlist)

        console.log("Expanded cut list:", expandedCutList)

        const groupedCutList = CutEngine.groupPeicesByDimensions(expandedCutList)
        console.log("Grouped cut list:", groupedCutList)

        // Calculate the horizontal and vertical capacity of every grouped piece.
        const rowCapacities = CutEngine.CalculateRows(groupedCutList, sheetSettings)
        console.log("Row capacities:", rowCapacities)
    }

    /**
     * Converts each cut-list entry into the requested number of individual pieces.
     *
     * For example, a "shelves" entry with a quantity of two becomes "shelves-1"
     * and "shelves-2". Each expanded piece has a quantity of one.
     */
    static expandPeices(cutList: CutList[]): CutList[] {
        // flatMap keeps the input order while flattening each entry's pieces into
        // one array.
        return cutList.flatMap((cut) =>
            // Create one new object per requested piece without mutating the input.
            Array.from({ length: cut.quantity }, (_, index) => ({
                ...cut,
                // Add a readable, one-based suffix when the original has a label.
                label: cut.label ? `${cut.label}-${index + 1}` : undefined,
                // Every result represents one physical piece.
                quantity: 1,
            }))
        )
    }

    /**
     * Groups cuts when they share either a width or a height.
     *
     * Matches are connected transitively: if one cut matches a second cut by
     * width and the second matches a third by height, all three share a group.
     */
    static groupPeicesByDimensions(cutlist: CutList[]): Record<string, CutList[]> {
        // Track indexes rather than cut objects so duplicate-looking cuts are
        // still treated as separate physical pieces.
        const groupedIndexes = new Set<number>()
        const groups: Record<string, CutList[]> = {}

        cutlist.forEach((_, startingIndex) => {
            // A previously visited cut already belongs to exactly one group.
            if (groupedIndexes.has(startingIndex)) {
                return
            }

            // Search every direct and transitive dimension match from this cut.
            const indexesToCheck = [startingIndex]
            const groupIndexes: number[] = []
            groupedIndexes.add(startingIndex)

            while (indexesToCheck.length > 0) {
                // The queue is known to contain an index at this point.
                const currentIndex = indexesToCheck.shift()!
                const currentCut = cutlist[currentIndex]
                groupIndexes.push(currentIndex)

                cutlist.forEach((candidate, candidateIndex) => {
                    // Skip cuts already assigned to this or an earlier group.
                    if (groupedIndexes.has(candidateIndex)) {
                        return
                    }

                    // Either matching dimension connects the candidate to the group.
                    const sharesDimension =
                        candidate.width === currentCut.width ||
                        candidate.height === currentCut.height

                    if (sharesDimension) {
                        groupedIndexes.add(candidateIndex)
                        indexesToCheck.push(candidateIndex)
                    }
                })
            }

            // Use stable sequential keys because a group may contain several widths
            // and heights connected through other cuts.
            groups[`group-${Object.keys(groups).length + 1}`] =
                groupIndexes.map((index) => cutlist[index])
        })

        return groups
    }

    /**
     * Calculates how many copies of each grouped piece fit across and down a sheet.
     *
     * Kerf is included only between adjacent pieces, so one piece does not require
     * an additional kerf allowance along the outside edge of the sheet.
     */
    static CalculateRows(
        groupedCutList: Record<string, CutList[]>,
        sheetSettings: Pick<SheetSettings, 'width' | 'height' | 'kerf'>,
    ): Record<string, PieceCapacity[]> {
        const capacities: Record<string, PieceCapacity[]> = {}

        Object.entries(groupedCutList).forEach(([groupName, pieces]) => {
            // Keep results under their original group so related cuts stay together.
            capacities[groupName] = pieces.map((piece) => ({
                piece,
                // Adding one kerf to both values is equivalent to placing kerf only
                // in the gaps: n * pieceSize + (n - 1) * kerf <= sheetSize.
                piecesPerRow: CutEngine.calculateCapacity(
                    sheetSettings.width,
                    piece.width,
                    sheetSettings.kerf,
                ),
                piecesPerColumn: CutEngine.calculateCapacity(
                    sheetSettings.height,
                    piece.height,
                    sheetSettings.kerf,
                ),
            }))
        })

        return capacities
    }

    /**
     * Returns the number of equal-sized pieces that fit along one sheet dimension.
     */
    private static calculateCapacity(
        sheetSize: number,
        pieceSize: number,
        kerf: number,
    ): number {
        // Invalid or non-positive piece sizes cannot produce a meaningful capacity.
        if (sheetSize <= 0 || pieceSize <= 0 || kerf < 0) {
            return 0
        }

        // Clamp at zero because a piece larger than the sheet does not fit.
        return Math.max(0, Math.floor((sheetSize + kerf) / (pieceSize + kerf)))
    }

}
 
