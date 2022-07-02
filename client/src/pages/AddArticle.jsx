import EditorJS from '@editorjs/editorjs';
import { getTags } from "../actions/actions";
import { createSignal, createResource, For, Show } from 'solid-js';
import editorConfig from '../utilities/editorConfig';
import generateHtml from "../utilities/generateHtml";
function addBlog() {
    const [tags] = createResource(getTags);
    console.log(tags());
    const [blocks, setBlocks] = createSignal([]);
    const editor = new EditorJS(editorConfig);
    const onSave = async () => {
        const data = await editor.save();
        setBlocks(data.blocks)
    }
    return (
        <div class="w-[70%] h-[100vh] mx-auto mt-8">
            <h1 class="text-[2rem] font-bold p-2 border-r-2 border-custom_blue">اضف مقالا</h1>
            <form class="flex flex-col">
                <div>
                    <label htmlFor="title-inp">العنوان</label>
                    <br />
                    <input type="text" name="" id="title-inp" placeholder="العنوان"/>
                </div>
                <div>
                    <label htmlFor="short-description">الوصف القصير</label>
                    <br />
                    <textarea id="short-description" cols="80" rows="7" placeholder="الوصف القصير"></textarea>
                </div>
                <div>
                    <label htmlFor="editorjs">محتوى المقالة</label>
                    <div class="max-w-[100%] border-2" id="editorjs"></div>
                </div>
            </form>
            <Show when={blocks()}>
                <For each={blocks()}>
                    {({ type, data }) => generateHtml(type, data)}
                </For>
            </Show>

            <button onClick={onSave}>save</button>
        </div>
    )
}

export default addBlog;