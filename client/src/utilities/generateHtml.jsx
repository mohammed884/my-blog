const keywords = [
    { title: "(", classes: ["text-[#E8630A]"] },
    { title: ")", classes: ["text-[#E8630A]"] },
    { title: `"`, classes: ["text-[#F15412]"] },
    { title: `'`, classes: ["text-[#F15412]"] },
    { title: "{", classes: ["text-yellow-500"] },
    { title: "}", classes: ["text-yellow-500"] },
    { title: "/", classes: ["text-blue-300"] },
    { title: "[", classes: ["text-[#EBECF1]"] },
    { title: "]", classes: ["text-[#EBECF1]"] },
    { title: "<", classes: ["text-blue-300"] },
    { title: ">", classes: ["text-blue-300"] },
    { title: "=", classes: ["text-blue-300"] },
    { title: "$", classes: ["text-red-500"] },
    { title: "&", classes: ["text-red-500"] },
    { title: ".", classes: ["text-[#E8630A]"] },
]
const createElementWithContent = (tag, content, classes = []) => {
    const el = document.createElement(tag);
    if (classes.length > 0) classes.forEach(cl => el.classList.add(cl));
    el.innerHTML = content
    return el
};

const generateHtml = (type, data) => {
    switch (type) {
        case "paragraph":
            return createElementWithContent("p", data.text, ["text-[1.1rem]", "font-medium"])

        case "list":
            const { items } = data;
            return <ul>{items.map(list => createElementWithContent("li", list))}</ul>

        case "header":
            const { text, level } = data;
            return createElementWithContent(`h${level}`, text, ["content-header"])

        case "code":
            const { code } = data;
            const lines = []
            const highlighted = [];
            let num = 1;
            for (let i = 0; i < code.length; i++) {
                let element = code[i]
                console.log(element);
                if (element.search("\n") > -1) lines.push(num++);
                const keyword = keywords.find(k => k.title === element)
                if (keyword) element = createElementWithContent("span", element, keyword.classes)
                highlighted.push(element)
            }
            lines.push(num++)
            return <div class="code-container mt-2">
                <pre class="flex">
                    <div class="w-[5%] flex flex-col leading-[1.861em]">
                        {
                            lines.map(line => <span class="text-slate-200">
                                {line}
                                <span class="text-[#FF5656]"> -&gt</span>
                            </span>)
                        }
                    </div>
                    <code class="code" is:raw>
                        {highlighted}
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