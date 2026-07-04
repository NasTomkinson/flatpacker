import { CutEngine } from './cutEngine'

const sampleSheetData = [
    {
        label: "shelves",
        width: 1000,
        height: 500,
        quantity: 3 
    }, 
    {
        label: "doors",
        width: 800,
        height: 400, 
        quantity: 1
    },
    {
        label: "tops",
        width: 800,
        height: 600, 
        quantity: 2
    },
]

// Keep one engine instance outside the React render cycle. This ensures its cut
// list is expanded only once, including when development Strict Mode re-renders.
const cutEngine = new CutEngine({ 
    cutlist: sampleSheetData, 
    sheetSettings: { width: 2440, height: 1220, depth: 20, kerf: 2 } 
})

export default function SheetCutter () {
    void cutEngine

    return (
        <div className="flex flex-col p-4 bg-background text-foreground">
            <p> Sheet cutter!!!!!!! </p>            
        </div>

    )

}
