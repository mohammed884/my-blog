import { createResource, Show } from "solid-js";
import { getArticle } from "../actions/actions";
import { useParams } from 'solid-app-router';
function Blog() {
    const params = useParams();
    const [blog] = createResource(params.title, getArticle);
    return (
        <div class="w-[90%] h-[100vh] mx-auto">
            <Show when={!blog.loading} fallback={<p>...Loading</p>}>
                <article class="w-[80%] h-[100%] mx-auto mt-12">
                    <div class="w-[100%] justify-between flex items-center">
                        <h1 class="text-[2.2rem] text-light_dark font-semibold">{blog().title}</h1>
                        <div class="flex flex-col items-center mr-2">
                            <img
                                class="rotate-180 bg-white rounded-full border border-green-500 mb-1 cursor-pointer"
                                src="/src/assets/svgs/arrow.svg"
                                width="30"
                                height="30"
                                alt="arrow up" />
                            <span class="text-[1.09rem]">{blog().likes.length}</span>
                            <img
                                class="bg-white rounded-full border border-red-500 mt-1 cursor-pointer"
                                height="30"
                                width="30"
                                src="/src/assets/svgs/arrow.svg"
                                alt="arrow down" />
                        </div>
                    </div>
                    <time class="text-[.9rem] text-light_dark mb-4">{blog().date}</time>
                    <br />
                    <label class="h-fit" htmlFor="content">
                        <textarea
                            class="w-[100%] min-h-[90%] text-light_dark bg-[#f4f6f6] mt-4 resize-none outline-none"
                            id="content"
                            readOnly>
                            {blog().content}
                        </textarea>
                    </label>
                </article>
            </Show>
        </div>
    )
}

export default Blog;