import { Icon } from "../../components";

export default function Sidebar() {
    return (
        <div className="w-auto h-screen bg-neutral-800 border-r border-neutral">
            <nav className="flex flex-col justify-center items-center h-full ">
                <ul className="flex flex-col gap-4 list-none! m-0! p-0!">
                    <li>
                        <a href="/">
                            <Icon name="mdi:home" size={7}/>
                        </a>
                    </li>
                    <li>
                        <a href="/cut-planner">
                            <Icon name="ic:baseline-article" size={7}/>
                        </a>
                    </li>
                    <li>
                        <a href="/catalogue">
                            <Icon name="mdi:view-grid-outline" size={7}/>
                        </a>
                    </li>
                    <li>
                        <a href="/account">
                            <Icon name="mdi:account" size={7}/>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}