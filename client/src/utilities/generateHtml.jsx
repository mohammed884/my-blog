import keywords from "../constants/keywords"
import style from "../style/blogIndex.module.css";
import highlighter from "highlight.js"
const createElementWithContent = (tag, content, classes = []) => {
    const el = document.createElement(tag);
    classes.forEach(cl => el.classList.add(cl));
    el.innerHTML = content
    return el
};
const generateHtml = (type, data) => {
    switch (type) {
        case "paragraph":
            return createElementWithContent("p", data.text, ["w-[100%]", "text-[1.2rem]", "font-medium", "mt-3"])

        case "list":
            const { items } = data;
            return <ul class="list-decimal mt-3">{items.map(list => createElementWithContent("li", list, ["text-[1.2rem]", "mt-2"]))}</ul>

        case "header":
            const { text, level } = data;
            return createElementWithContent(`h${level}`, text, ["content-header"])

        case "code":
            const { code } = data;
            const lines = code.split("\n").length;
            // for (let i = 0; i < s.length; i++) {
            //     let element = s[i];
            //     console.log(element);
            //     const isNewLine = element.search("\n") > -1
            //     const keyword = keywords.find(k => {
            //         let isFounded = undefined
            //         if (k.title === element) isFounded = k;
            //         else if (element.search(k.title) > -1) {
            //             element = createElementWithContent("div", element.replace(k.title, ""));
            //             isFounded = { ...k, index: i - 1 > -1 ? i - 1 : 0 }
            //         }
            //         return isFounded
            //     });
            //     if (isNewLine) lines++;
            //     // if (keyword && !keyword.index) element = createElementWithContent("span", `${element} `, keyword.classes);
            //     if (keyword) {
            //         highlighted.splice(i - 1, 0, createElementWithContent("span", `${keyword.title}     `, keyword.classes))
            //     }
            //     highlighted.push(typeof element !== "object" ? element : `${element} `)
            // }
            console.log(code);
            return <div class="bg-[#f5f5fb] rounded-md p-3 en mt-3">
                 <pre class="flex">
                     <div class="flex flex-col leading-[1.861em] sm:mr-3 lg:mt-0">
                         {
                             Array(lines).fill(lines).map((_, i) => <span class="text-slate-900">
                                 {i + 1}
                                 <span class="text-[#FF5656]"> -&gt</span>
                             </span>)
                         }
                     </div>
                     <code class={`${style.code}`} >
                        {highlighter.highlight(code, {language: "javascript"}).value}
                     </code>
                </pre>
            </div> 

        case "embed":
            const { embed, service, width, height, caption } = data;
            return <figure>
                <iframe
                    src={`${embed}`}
                    width={width}
                    height={height}
                    loading="lazy"
                    allowFullScreen
                    title={`${service} iframe`}></iframe>
                {caption && <figcaption>{caption}</figcaption>}
            </figure>

    }
}
export default generateHtml