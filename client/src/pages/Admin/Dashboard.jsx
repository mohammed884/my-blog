import { Link } from "@solidjs/router";
import { For } from "solid-js";

function dashboard() {
    const links = [
        { title: "اضف مدونه", href: "/blog/add" },
        { title: "اضف تاك", href: "/tag/add" },
        { title: "الهاشتاكات", href: "/admin/tags" },
    ]
    return (
        <div class="w-[100%] h-[100vh]">
            <aside class="w-[15%] h-[100vh] border-l-2 border-custom_blue">
                <ul class="flex flex-col justify-center items-center">
                    <For each={links}>
                        {link => <Link class="w-[100%]" href={link.href}>
                            <li class="w-[100%] border-b-2 border-t-2 border-custom_blue bg-slate-100 hover:bg-slate-200 text-center p-3 mt-2">
                                {link.title}
                            </li>
                        </Link>
                        }
                    </For>
                </ul>
            </aside>
            <main>

            </main>
        </div>
    )
}

export default dashboard;