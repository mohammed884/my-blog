import { createResource, For, Show } from "solid-js";
import {getTags } from "../../actions/actions";
function Tag() {
    const [tags] = createResource(getTags); 
    console.log(tags());
    return (
        <div class="w-[70%] h-[100vh]">
            <h1>الهاشاتكات</h1>
            <Show when={!tags.loading}>
                <For each={tags()}>
                    {
                        tag => (
                            <div class="w-[100%]">

                            </div>
                        )
                    }
                </For>
            </Show>
        </div>
    )
}

export default Tag;