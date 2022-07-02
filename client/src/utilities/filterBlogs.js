export const filterBlogs = (blogs, tags) => {
    const data = [];
    for (let i = 0; i < blogs.length; i++) {
        const blog = blogs[i];
        for (let x = 0; x < tags.length; x++) {
            const tag = tags[x];
            const isSelected = blog.tags.some(({title}) => title === tag);
            if (isSelected) data.push(blog)
        }
    }
    return data
}