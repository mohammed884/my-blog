import { createResource } from "solid-js"
import { getArticles } from "../actions/actions";
import BlogList from "./ArticleList";
export default function HomeSideBar() {
  const [popularArticles] = createResource(getArticles)
  return (
    <aside class="w-[65%] mr-4 sticky">
      <div class="flex items-center">
        <h1 class="text-[1.4rem] font-bold ml-1">
          مقالات رائجة
        </h1>
        <img src="/src/assets/svgs/fire.svg" alt="fire icon" width="20" height="20"/>
      </div>
      <div class="w-[100%] mt-3">
        <Show when={!popularArticles.loading} fallback={<p>...Loading</p>}>
          <For each={popularArticles()}>{(article, index) => <BlogList isPopular={true} article={article} index={index} />}</For>
        </Show>
      </div>
    </aside>
  )
}
