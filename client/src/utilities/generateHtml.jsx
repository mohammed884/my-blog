const createElementWithContent = (tag, content, classes = []) => {
    const el = document.createElement(tag);
    if (classes.length) classes.forEach(cl => el.classList.add(cl));
    el.innerHTML = content
    return el
};
const isWithHtml = (content) => {
    const check = content.indexOf("<") > -1 && content.indexOf("</") < content.length - 1;
    return check;
}
const generateHtml = (type, data) => {
    switch (type) {
        case "paragraph": {
            const { text } = data;
            if (isWithHtml(text)) return createElementWithContent("p", text)
            else return <p>{text}</p>
        }
        case "list": {
            const { items } = data;
            return <ul>
                {
                    items.map(list => {
                        if (isWithHtml(list)) return createElementWithContent("li", list)
                        else return <li>{list}</li>
                    })}
            </ul>
        }
        case "header": {
            const { text, level } = data;
            return createElementWithContent(`${tag}${level}`, text)
        }
        case "code": {
            const { code } = data;
            const splitedCode = code.split("");
            const lines = []
            const highlighted = [];
            let num = 1;
            const keywords = [
                { key: "(", classes: "text-yellow-200" },
                { key: ")", classes },
                { key: `"` },
                { key: "{" },
                { key: "}" },
                { key: "<" },
                { key: ">" }
            ]
            for (let i = 0; i < splitedCode.length; i++) {
                let element = splitedCode[i]
                if (element.search("\n") > -1) lines.push(num++);
                const isKeyword = keywords.find(k => k === element)
                if (isKeyword) {
                    const span = createElementWithContent("span", element, ["text-yellow-200"]);
                    element = span
                }
                highlighted.push(element)
            }
            lines.push(num++)
            return <div class="bg-gray-800 p-4 en">
                <pre class="flex">
                    <div class="w-[5%] flex flex-col leading-[1.8em]">
                        {
                            lines.map(line => <span class="text-slate-200">
                                {line}
                                <span class="text-red-500"> -&gt</span>
                            </span>)
                        }
                    </div>
                    <code class="code" is:raw>
                        {highlighted}
                    </code>
                </pre>
            </div>
        }
        case "embed": {
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
}
export default generateHtml