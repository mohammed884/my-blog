import { createResource, Show ,createEffect} from "solid-js";
import { getBlog } from "../../actions/actions";
import { useParams } from 'solid-app-router';
function Blog() {
    const params = useParams();
    const [blog] = createResource(params.title, getBlog);
    // const [relatedBlogs] = createResource(blog().tags, getRelatedBlogs);
    createEffect(() => {
        if (blog.loading) return;
        const contentContainer = document.getElementById("content");
        contentContainer.innerHTML = blog().content
    })
    return (
        <div class="w-[90%] h-[100vh] mx-auto">
            <Show when={!blog.loading} fallback={<p>...Loading</p>}>
                <article class="w-[80%] h-[100%] mx-auto mt-12">
                    <div class="w-[100%] h-fit justify-between flex items-center">
                        <h1 class="text-[2.2rem] text-light_dark font-semibold">{blog().title}</h1>
                        <div class="flex items-center mr-2">
                            <img
                                class="rotate-180 bg-white rounded-full border border-green-500 ml-2 cursor-pointer"
                                src="/src/assets/svgs/arrow.svg"
                                width="30"
                                height="30"
                                alt="arrow up" />
                            <span class="text-[1.09rem]">{blog().likes.length}</span>
                            <img
                                class="bg-white rounded-full border border-red-500 mr-2 cursor-pointer"
                                height="30"
                                width="30"
                                src="/src/assets/svgs/arrow.svg"
                                alt="arrow down" />
                        </div>
                    </div>
                    <time class="text-[.9rem] text-light_dark">{blog().date}</time>
                    <div
                        class="w-[100%] min-h-[90%] text-light_dark bg-[#f4f6f6] mt-4 resize-none outline-none"
                        id="content">
                        {blog().content}
                    </div>
                    <div class="mt-5">
                        <For each={blog().tags}>
                            {tag => <span class="border border-custom_blue p-2">{tag.title}</span>}
                        </For>
                    </div>
                </article>
            </Show>
            {/* <div>
                <Show when={!relatedArticles.loading}>
                    <For each={relatedArticles()}>
                        {article => <ArticleList article={article} />}
                    </For>
                </Show>
            </div> */}
        </div>
    )
}

export default Blog;