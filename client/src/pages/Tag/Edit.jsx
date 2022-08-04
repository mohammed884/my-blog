import axios from "axios";
import { createEffect, createSignal, createResource } from "solid-js"
import { useParams, useNavigate } from "@solidjs/router";
import { getTag } from "../../actions/actions";

function EditTag() {
    const params = useParams();
    const navigate = useNavigate()
    const [tagRes] = createResource(params.title, getTag)
    const [title, setTitle] = createSignal("");
    const [errorMessage, setErrorMessage] = createSignal("");
    const handleSubmit = async e => {
        e.preventDefault();
        const URL = `${import.meta.env.VITE_SERVER_URL}/tag/edit/${params.title.replace(/-/g, " ")}`;
        const res = await axios.patch(URL, { title: title() }, { withCredentials: true });
        if (res.data.success) return window.location.href = "/"
        else setErrorMessage(res.data.message);
    };
    createEffect(() => {
        if (tagRes.loading) return;
        if (tagRes().tag === null || !tagRes().success) navigate("/", {replace:true})
        else setTitle(tagRes().tag.title)
    })
    return (
        <div class="w-[100%] h-[100vh] flex justify-center mt-8">
            <form class="sm:w-[90%] md:w-[60%] lg:w-[50%] xl:w-[30%] h-fit bg-white shadow-md mx-auto rounded-md p-3" onSubmit={handleSubmit}>
                {errorMessage() &&
                    <p class="w-[100%] bg-red-300 text-gray-800 rounded-sm border-r-2 border-red-500 p-3">
                        {errorMessage()}
                    </p>
                }
                <div>
                    <label class="text-[1.3rem] font-bold" htmlFor="title">تعديل</label>
                    <input class="en" type="text" id="title" value={title()} onInput={e => setTitle(e.target.value)} />
                </div>
                <button type="submit" class="bg-light_dark text-slate-200 rounded-md mt-3 p-2">طبق التعديل</button>
            </form>
        </div>
    )
}

export default EditTag;