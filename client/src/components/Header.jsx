import { NavLink } from "@solidjs/router";

function Header() {
    return (
        <header class="w-[100%] h-[60px] bg-[#ffffff] border-b-2 sticky en">
            <nav class="w-[80%] h-[100%] flex items-center mx-auto">
                <ul>
                    <li class="text-[#1a1a1a] font-bold">
                        <NavLink href="/">Mohammed Abdulaziz Blog</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;