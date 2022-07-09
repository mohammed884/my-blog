export const filterBlogs = (blogs, tags) => {
    const filteredBlogs = [];
    for (let i = 0; i < blogs.length; i++) {
        const blog = blogs[i];
        for (let x = 0; x < tags.length; x++) {
            const tag = tags[x];
            const isSelected = blog.tags.some(({title}) => title === tag);
            const isExists = filteredBlogs.some((filteredBlog) => filteredBlog.title === blog.title);
            if (isSelected && !isExists) filteredBlogs.push(blog)
        }
    }
    return filteredBlogs
}