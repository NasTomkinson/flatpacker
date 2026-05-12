import React from "react";

export default function Layout({ children }: { children: React.ReactNode })  {
    return (
        <div className="text-3xl">
            <h1>Layout!!</h1>
            {children}
        </div>
    )   
}
