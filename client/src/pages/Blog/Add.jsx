import EditorJS from '@editorjs/editorjs';
import { getTags } from "../../actions/actions";
import { createSignal, createResource, For, Show, createEffect } from 'solid-js';
import editorConfig from '../../utilities/editorConfig';
import axios from 'axios';
function addBlog() {
    const [tags] = createResource(getTags);
    const [serverMessage, setServerMessagee] = createSignal({ message: "", success: false })
    const [title, setTitle] = createSignal("");
    const [shortDescription, setShortDescription] = createSignal("");
    const [selectedTags, setSelectedTags] = createSignal([]);
    const [cover, setCover] = createSignal({});
    const [isOpen, setIsOpen] = createSignal(false);
    let elementWithError = ""
    let editor;
    createEffect(() => {
        const locallyStoredBlog = JSON.parse(localStorage.getItem("blog"));
        editor = new EditorJS({ ...editorConfig, data: locallyStoredBlog ? locallyStoredBlog.editorData : {} });
        if (!locallyStoredBlog) return;
        const { title, shortDescription, tags, } = locallyStoredBlog
        setTitle(title)
        setSelectedTags(tags)
        setShortDescription(shortDescription);
    })

    const handleSubmit = async e => {
        e.preventDefault();
        let content = "";
        const URL = `${import.meta.env.VITE_SERVER_URL}/blog/add`;
        const editorData = await editor.save()
        const fd = new FormData();
        fd.append("title", title())
        fd.append("shortDescription", shortDescription())
        fd.append("tags", JSON.stringify(tags()))
        fd.append("rawContent", JSON.stringify(editorData))
        fd.append("cover", cover())
        const { data } = await axios.post(URL, fd, { withCredentials: true });
        if (!data.success) {
            const { success, message } = data;
            setServerMessagee({ message: message.replace(/"/g, ""), success });
            let label = data.context ? data.context.label : "";
            label = label === "content" ? "editorjs" : label;
            if (elementWithError) elementWithError.classList.remove("border-yellow-300");
            if (!label) return
            elementWithError = document.getElementById(label);
            elementWithError.classList.add("border-yellow-300");
        } else window.location.href = `/blog/${title().replace(/ /g, "-")}`
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
            shortDescription: shortDescription(),
            tags: selectedTags(),
            editorData
        };
        localStorage.setItem("blog", JSON.stringify(data));
        setIsOpen(false)
    }
    const removeBlogLocally = () => {
        const isSure = window.confirm("هل انت متاكد من حذف المدونة من Local storage");
        if (!isSure) return;
        localStorage.removeItem("blog");
        resetForm("_", true)
        setIsOpen(false);

    }
    const resetForm = (_, directReset) => {
        const isSure = !directReset && window.confirm("هل تريد ترسيت قيم الفورم؟");
        if (!isSure && !directReset) return;
        editor.clear()
        setTitle("")
        setShortDescription("")
        setSelectedTags([])
        setCover({})
        setIsOpen(false)
    }
    return (
        <div class="sm:w-[97%] md:w-[80%] xl:w-[50%] min-h-[100vh] bg-white mx-auto mt-8 shadow-md rounded-md p-6">
            <div class="flex justify-between sticky">
                <h1 class="w-fit text-[1.8rem] text-light_dark font-bold p-2  border-custom_blue">اضف مدونه</h1>
                <div class="relative text-start en">
                    <img onClick={() => setIsOpen(prev => !prev)} class="cursor-pointer " width="22" height="22" src="/src/assets/svgs/menu.svg" alt="menu" />
                    {isOpen() &&
                        <div class="w-[25vh] bg-slate-50 absolute text-end rounded-md shadow-md p-3">
                            <button onClick={saveBlogLocally} class="w-[100%] border-2 border-emerald-400 text-gray-800 p-2 rounded-md cursor-pointer">حفظ محلي</button>
                            <br />
                            <button onClick={removeBlogLocally} class="w-[100%] border-2 border-red-400 text-gray-800 p-2 mt-2 rounded-md cursor-pointer">حذف محلي</button>
                            <br />
                            <button onClick={resetForm} class="w-[100%] border-2 border-yellow-400 text-gray-800 p-2 mt-2 rounded-md cursor-pointer">رست الفورم</button>
                        </div>
                    }
                </div>
            </div>
            <div>
                {serverMessage().message &&
                    <p class="w-[100%] bg-red-300 text-gray-800 rounded-sm border-r-2 border-red-500 p-3">
                        {serverMessage().message}
                    </p>
                }
            </div>
            <form
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                class="flex flex-col">
                <div>
                    <label htmlFor="title">
                        <input
                            onInput={e => handleChange(e, setTitle)}
                            value={title()}
                            type="text"
                            id="title"
                            placeholder="العنوان" />
                    </label>
                </div>
                <div>
                    <label htmlFor="shortDescription">
                        <textarea
                            onInput={e => handleChange(e, setShortDescription)}
                            id="shortDescription"
                            cols="80" rows="7"
                            value={shortDescription()}
                            placeholder="الوصف القصير"></textarea>
                    </label>
                </div>
                <div>
                    <div class="flex flex-wrap gap-2">
                        <Show when={!tags.loading}>
                            <For each={tags()}>
                                {
                                    tag => <div class={`border p-2 ${selectedTags().includes(tag._id) ? "border-emerald-400" : "border-custom_blue"} en`}>
                                        <label class="text-[1.05rem] cursor-pointer" htmlFor={`${tag._id}`}>{tag.title}</label>
                                        <input value={tag._id} class="hidden" onChange={handleSelectTag} type="checkbox" id={`${tag._id}`} />
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
                    <div class="max-w-[100%] border-2 border-slate-100" id="editorjs">

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