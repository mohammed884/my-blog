import { createSignal } from "solid-js";
import axios from "axios"
function login() {
    const [password, setPassword] = createSignal("");
    const [errorMessage, setErrorMessage] = createSignal("");
    const handleSubmit = async e => {
        e.preventDefault();
        const URL = `${import.meta.env.VITE_SERVER_URL}/login`;
        const res = await axios.post(URL, { password: password() }, { withCredentials: true });
        if (res.data.success) return window.location.href = "/"
        else setErrorMessage(res.data.message);
    }
    return (
        <div class="w-[100%] h-[100vh] mt-8">
            <form class="sm:w-[90%] md:w-[60%] lg:w-[50%] xl:w-[30%] h-[60vh] bg-white shadow-md mx-auto p-3" onSubmit={handleSubmit}>
                {errorMessage() &&
                    <p class="w-[100%] bg-red-300 text-gray-800 rounded-sm border-r-2 border-red-500 p-3">
                        {errorMessage()}
                    </p>
                }
                <div>
                    <label class="text-[1.3rem] font-bold" htmlFor="password">رمز الحماية</label>
                    <input type="password" id="password" onInput={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" class="bg-light_dark text-slate-200 rounded-md mt-3 p-2">سجل الدخول</button>
            </form>
        </div>
    )
}

export default login;