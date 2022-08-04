import { Show, For, createSignal, createResource, } from "solid-js";
import Search from "../components/Search";
import { getBlogs } from "../actions/actions";
import BlogList from "../components/BlogList";
const [blogs] = createResource(getBlogs)
const [filteredBlogs, setFilteredBlogs] = createSignal([])
function home() {
    return (
        <section class="lg:w-[80%] h-[100vh] ar mx-auto">
            <Search />
            <div class="w-[90%]  min-h-[90%] flex justify-between rounded-md">
                <div class="w-[100%] grid grid-cols-3 gap-2 mt-3 border-custom_blue">
                    <Show when={filteredBlogs() || blogs()} fallback={<p>...Loading</p>}>
                        <For each={filteredBlogs().length > 0 ? filteredBlogs() : blogs()}>{(blog, index) => <BlogList blog={blog} index={index} />}</For>
                    </Show>
                </div>
            </div>
        </section>
    )
}
export { blogs, setFilteredBlogs }

export default home;