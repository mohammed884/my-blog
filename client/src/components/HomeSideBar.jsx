import { createResource } from "solid-js"
import { getBlogs } from "../actions/actions";
import BlogList from "./BlogList";
export default function HomeSideBar() {
  const [popularBlogs] = createResource(getBlogs)
  return (
    <aside class="w-[30%] mr-6 sticky">
      <div class="flex items-center">
        {/* <h1 class="text-[1.4rem] font-bold ml-1">
          مقالات رائجة
        </h1> */}
        {/* <img src="/src/assets/svgs/fire.svg" alt="fire icon" width="20" height="20"/> */}
      </div>
      <div class="w-[100%] mt-3">
        <Show when={!popularBlogs.loading} fallback={<p>...Loading</p>}>
          <For each={popularBlogs()}>{(blog, index) => <BlogList isPopular={true} blog={blog} index={index} />}</For>
        </Show>
      </div>
    </aside>
  )
}
