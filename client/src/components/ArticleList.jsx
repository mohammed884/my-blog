import { For } from "solid-js";
import { Link } from "solid-app-router"
function BlogList({ article, index, isPopular }) {
    const { title, tags, date, shortDescription, views } = article;
    console.log(index());
    return (
        <article class="mb-8">
            <div class="flex items-center">
                <p class={`${!isPopular ? "text-[1.5rem]" : "text-[1.2rem]"} text-[#06283D] font-semibold`}>{title}</p>
                <div class="flex items-center mr-2 text-[.9rem]">
                    <span class="ml-1">30</span>
                    <img src="/src/assets/svgs/eye.svg" alt="eye icon" width="20" height="20" />
                </div>
            </div>
            <label htmlFor={`blog-descirption-${index()}`}>
                <textarea 
                id={`blog-descirption-${index()}`} 
                class={`w-[80%] bg-[#f6f6f4] ${!isPopular ? "text-[1.05rem]" : "text-[.95rem]"} text-[#06283D] mt-2 outline-0 resize-none`} 
                readOnly>{shortDescription}</textarea>
            </label>
           
            <ul>
                <li class="w-fit text-blue-600 hover:underline">
                    <Link href={`/articles/${title.replace(/ /g, "-")}`}>
                        اقرا المقال
                    </Link>
                </li>
            </ul>
            <div class="w-fit border mt-4 border-custom_blue rounded-sm p-2">
                <For each={tags}>
                    {(tag) => <span>{tag.title}</span>}
                </For>
            </div>
            <time class="text-sm mt-5">{date}</time>

        </article>
    )
}

export default BlogList;