import EditorJS from '@editorjs/editorjs';
import { getTags } from "../actions/actions";
import { createSignal, createResource, For, Show } from 'solid-js';
import editorConfig from '../utilities/editorConfig';
import generateHtml from "../utilities/generateHtml";
import axios from 'axios';
function addBlog() {
    const [tags] = createResource(getTags);
    const [errorMessage, setErrorMessage] = createSignal("")
    const [title, setTitle] = createSignal("");
    const [shortDescription, setShortDescription] = createSignal("");
    const [selectedTags, setSelectedTags] = createSignal([]);
    const [cover, setCover] = createSignal({});
    const [blocks, setBlocks] = createSignal([]);
    const [isOpen, setIsOpen] = createSignal(false)
    const editor = new EditorJS(editorConfig);
    const handleSubmit = async e => {
        e.preventDefault();
        let content = "";
        const URL = `${import.meta.env.VITE_SERVER_URL}/blog/add`;
        const editorData = await editor.save();
        setBlocks(editorData.blocks);
        for (let i = 0; i < blocks().length; i++) {
            const block = blocks()[i];
            const htmlBlock = generateHtml(block.type, block.data)
            content = content + htmlBlock.outerHTML
        };
        const fd = new FormData();
        fd.append("title", title())
        fd.append("shortDescription", shortDescription())
        fd.append("tags", selectedTags())
        fd.append("cover", cover())
        fd.append("content", content)

        const res = await axios.post(URL, fd, { withCredentials: true });
        console.log(res.data);
    };
    const handleSelectTag = async e => {
        const tag = e.target.value;
        const isSelected = selectedTags().includes(tag);
        if (isSelected) setSelectedTags(selectedTags().filter(t => t !== tag))
        else setSelectedTags([...selectedTags(), tag]);
    }
    const handleChange = async (e, setter) => {
        const { id, value, files } = e.target;
        if (id === "cover") return setter(files[0])
        setter(value);
    };
    const saveBlogLocally = async () => {
        const editorData = await editor.save();
        const data = {
            title: title(),
            blocks: editorData.blocks,
            shortDescription: shortDescription(),
            selectedTags: selectedTags(),
        };
        localStorage.setItem("blog", JSON.stringify(data));
    }
    const removeBlogLocally = () => {
        const isSure = window.confirm("هل انت متاكد من حذف المدونة من Local storage");
        if (!isSure) return;
        localStorage.removeItem("blog")
    }
    return (
        <div class="sm:w-[97%] md:w-[80%] xl:w-[50%] min-h-[100vh] bg-white mx-auto mt-8 shadow-md rounded-md p-6">
            <div class="flex justify-between sticky">
                <h1 class="w-fit text-[1.8rem] text-light_dark font-bold p-2  border-custom_blue">اضف مدونه</h1>
                <div class="relative text-start en">
                    <img onClick={() => setIsOpen(prev => !prev)} class="cursor-pointer " width="22" height="22" src="/src/assets/svgs/menu.svg" alt="menu" />
                    {isOpen() &&
                        <div class="w-[25vh] bg-gray-800 absolute text-end rounded-md p-3">
                            <button onClick={saveBlogLocally} class="w-[100%] border-2 border-emerald-400 text-slate-100 p-2 rounded-md cursor-pointer">حفظ محلي</button>
                            <br />
                            <button onClick={removeBlogLocally} class="w-[100%] border-2 border-red-400 text-slate-100 p-2 mt-2 rounded-md cursor-pointer">حذف محلي</button>
                        </div>
                    }
                </div>
            </div>
            <div>
                {errorMessage() &&
                    <span class="text-red-500">{errorMessage()}</span>
                }
            </div>
            <form
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                class="flex flex-col">
                <div>
                    <label htmlFor="title">
                        <input onInput={e => handleChange(e, setTitle)} type="text" id="title" placeholder="العنوان" />
                    </label>
                </div>
                <div>
                    <label htmlFor="shortDescription">
                        <textarea
                            onInput={e => handleChange(e, setShortDescription)}
                            id="shortDescription"
                            cols="80" rows="7"
                            placeholder="الوصف القصير"></textarea>
                    </label>
                </div>
                <div>
                    <div class="flex flex-wrap gap-2">
                        <Show when={!tags.loading}>
                            <For each={tags()}>
                                {
                                    tag => <div class={`border p-2 ${selectedTags().includes(tag.title) ? "border-emerald-400" : "border-custom_blue"} en`}>
                                        <label class="text-[1.05rem] cursor-pointer" htmlFor={`${tag.title}`}>{tag.title}</label>
                                        <input value={tag.title} class="hidden" onChange={handleSelectTag} type="checkbox" id={`${tag.title}`} />
                                    </div>
                                }
                            </For>
                        </Show>
                    </div>
                </div>
                <div class="mt-8">
                    <label htmlFor="cover" class={`text-[1rem] cursor-pointer border-2 border-dashed ${cover().name && "border-emerald-400"} p-2`}>الصورة</label>
                    {cover().name && <span class="mr-2">{cover().name} </span>}
                    <input class="hidden" type="file" onChange={e => handleChange(e, setCover)} id="cover" />
                </div>
                <div class="mt-8">
                    <label htmlFor="editorjs" class="text-[1.3rem]">المحتوى</label>
                    <div onChange={e => handleChange(e, setBlocks)} class="max-w-[100%] border-2 border-slate-100" id="editorjs">

                    </div>
                </div>
                <div class="flex mt-3 items-center justify-between">
                    <button type="submit" class="bg-blue-500 text-slate-100 p-2 rounded-md">اضف المقال</button>
                </div>
            </form>
        </div>
    )
}

export default addBlog;