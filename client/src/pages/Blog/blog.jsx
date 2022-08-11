import { createResource, Show, createEffect } from "solid-js";
import { getBlog } from "../../actions/actions";
import { useParams } from '@solidjs/router';
import generateHtml from "../../utilities/generateHtml";
function Blog() {
    const params = useParams();
    const [blog] = createResource(params.title, getBlog);
    createEffect(() => {
        if (blog.loading) return;
        let content = ""
        const rawContent = blog().rawContent;
        for (let i = 0; i < rawContent.blocks.length; i++) {
            const block = rawContent.blocks[i];
            const htmlBlock = generateHtml(block.type, block.data)
            content = `${content}${htmlBlock.outerHTML}`;
        };
        const contentContainer = document.getElementById("content");
        contentContainer.innerHTML = content
    });
    return (
        <div class="sm:w-[96%] lg:w-[80%] xl:w-[60%] h-[100vh] mx-auto">
            <Show when={!blog.loading} fallback={<p>...Loading</p>}>
                <article class="w-[100%] h-[100%] mx-auto mt-12 leading-8">
                    <div class="w-[100%] h-fit justify-between flex items-center">
                        <h1 class="text-[2.2rem] text-light_dark font-semibold">{blog().title}</h1>
                        <div class="flex">
                        </div>
                    </div>
                    <time class="text-[.9rem]">{blog().date}</time>
                    <div class="w-[100%] text-gray-800 mt-4" id="content"></div>
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