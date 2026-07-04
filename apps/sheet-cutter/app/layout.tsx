import React from "react";
import { Sidebar } from "./_components/sidebar";

export default function Layout({ children }: { children: React.ReactNode })  {
    return (
        <div className="flex flex-row w-full"> 
            <Sidebar />
            {children}
        </div>
    )   
}
