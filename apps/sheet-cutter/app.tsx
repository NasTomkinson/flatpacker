import Layout from "./app/layout";
import SheetCutter from "./app/sheetCutter";
import { configureStore } from "@reduxjs/toolkit";

export const CutlistStore = configureStore({
    reducer: {
        
    }
})

export default function App() {
    return (
        <Layout> 
            <SheetCutter />
        </Layout>
    )   
}
