import { createSignal, createResource, For, Show } from "solid-js";
import { getTags, } from "../actions/actions"
import { articles, setFilteredArticles} from "../pages/Home"
import { filterBlogs } from "../utilities/filterBlogs";
const [selectedTags, setSelectedTags] = createSignal([]);
function Search() {
    const [tags] = createResource(getTags);
    let timeout;
    const handleFiltering = e => {
        const tag = e.target.value;
        const isSelected = selectedTags().includes(tag);
        if (isSelected) setSelectedTags(selectedTags().filter(t => t !== tag))
        else setSelectedTags([...selectedTags(), tag]);
        setFilteredArticles(filterBlogs(articles(), selectedTags()))
    }
    const handleSearch = ({ target: value }) => {
        if (!value || value === " ") return;
        clearTimeout(timeout);
        timeout = setTimeout(async () => console.log("send a request"), 1000);
    }
    return (
        <div class="mt-8 sm:w-[100%] lg:w-[40%] min-h-[20vh]">
            <div class="mb-3">
                <input onInput={handleSearch} class="w-[100%] bg-[#f0f2f2] border-r-2 rounded-sm outline-0 border-custom_blue p-2" type="search" placeholder="ابحث من هنا..." />
            </div>
            <div class="w-[70%] bg-slate-200 rounded-[.1em] border-r-2 border-emerald-400 p-2">
                <div class="flex">
                    <span class="font-bold">ملاحظة</span>
                </div>
                <div>
                    <p>يمكنك استخدام الهاشتاكات للبحث عن المقالات</p>
                </div>
            </div>
            <div class="w-[100%] flex flex-wrap gap-3 mt-2">
                <Show when={!tags.loading} fallback={<p>...Loading</p>}>
                    <For each={tags()}>
                        {
                            (tag) => (
                                <>
                                    <label
                                        htmlFor={tag.title}
                                        class={`
                                                flex 
                                                w-fit 
                                                h-fit 
                                                pl-4 
                                                border 
                                                ${selectedTags().includes(tag.title) ? "border-emerald-400" : "border-[#06283D]"}
                                                cursor-pointer 
                                                rounded-sm
                                                opacity-90
                                                down-effect
                                            `}>
                                        <div class="flex items-center justify-center bg-blue-500 ml-3 pr-1">
                                            <span class="ml-2 text-slate-100">{tag.count}</span>
                                        </div>
                                        <div class="flex en">
                                            <p class="text-[1.1rem]">{tag.title}</p>
                                        </div>
                                    </label>
                                    <input class="hidden" type="checkbox" onChange={handleFiltering} name={tag.title} id={tag.title} value={tag.title} />
                                </>
                            )
                        }
                    </For>
                </Show>
            </div>
        </div>
    )
}
export { selectedTags }
export default Search;