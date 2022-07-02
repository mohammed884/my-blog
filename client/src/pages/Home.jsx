import { Show, For, createSignal, createResource, createEffect } from "solid-js";
import Search from "../components/Search";
import { getArticles } from "../actions/actions";
import BlogList from "../components/ArticleList";
import HomeSideBar from "../components/HomeSideBar";
const [articles] = createResource(getArticles)
const [filteredArticles, setFilteredArticles] = createSignal([])
function home() {
    return (
        <section class="w-[80%] h-[100vh] ar mx-auto">
            <Search />
            <div class="w-[90%] mt-3 flex justify-between ">
                <div class="w-[100%] mt-3 border-l-2 border-custom_blue">
                    <Show when={filteredArticles() || articles()} fallback={<p>...Loading</p>}>
                        <For each={filteredArticles().length > 0 ? filteredArticles() : articles()}>{(article, index) => <BlogList article={article} index={index} />}</For>
                    </Show>
                </div>
                <HomeSideBar />
            </div>
        </section>
    )
}
export {articles,setFilteredArticles}

export default home;