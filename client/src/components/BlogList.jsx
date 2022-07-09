import { For } from "solid-js";
import { Link } from "solid-app-router";
import { selectedTags } from "../components/Search"
function BlogList({ blog, index, isPopular }) {
    const { title, tags, date, shortDescription, views, cover } = blog;
    return (
        <article class="h-fit border p-3 rounded-sm">
            <img class="w-[100%] aspect-video rounded-md" src={`/src/assets/images/${cover}`} alt={`${title} blog image`} />
            <div class="flex items-center mt-2">
                <p class={`${!isPopular ? "text-[1.4rem]" : "text-[1.2rem]"} text-[#06283D] font-semibold`}>{title}</p>
                <div class="flex items-center mr-2 text-[.9rem]">
                    <span class="ml-1">30</span>
                    <img src="/src/assets/svgs/eye.svg" alt="eye icon" width="20" height="20" />
                </div>
            </div>
            <label htmlFor={`blog-descirption-${index()}`}>
                <textarea
                    id={`blog-descirption-${index()}`}
                    class={`w-[80%] bg-none ${!isPopular ? "text-[1.05rem]" : "text-[.95rem]"} text-[#06283D] mt-2 outline-0 resize-none`}
                    readOnly>{shortDescription}</textarea>
            </label>

            <ul>
                <li class="w-fit text-blue-600 hover:underline">
                    <Link href={`/blog/${title.replace(/ /g, "-")}`}>
                        اقرا المقال
                    </Link>
                </li>
            </ul>
            <div class="sm:w-[100%] lg:w-[60%] flex flex-wrap gap-2 mt-4">
                <For each={tags}>
                    {tag =>
                        <span class={`
                        en 
                        border 
                        text-[.9rem]
                        ${selectedTags().includes(tag.title) ? "border-emerald-400" : "border-[#06283D]"} 
                        p-2
                        rounded-sm`}>
                            {tag.title}
                        </span>
                    }
                </For>
            </div>
            <time class="text-sm mt-5">{date}</time>
        </article>
    )
}

export default BlogList;