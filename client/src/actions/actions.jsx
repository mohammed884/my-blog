import axios from "axios";
const {VITE_SERVER_URL} = import.meta.env;
export const getTags = async () => {
    const url = `${VITE_SERVER_URL}/tag`
    const { data } = await axios(url);
    return data;
}
export const getBlogs = async () => {
    const url = `${VITE_SERVER_URL}/blog`
    const { data } = await axios(url);
    return data;
}
export const getBlog = async title => {
    const url = `${VITE_SERVER_URL}/blog/${title.replace(/-/g, " ")}`
    const { data } = await axios(url);
    console.log(data);
    return data;
}
export const search = async title => {
    const url = `${VITE_SERVER_URL}/blog/search?title=${title}`
    const { data } = await axios(url);
    return data;
}