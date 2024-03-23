import { useBlogs } from "../hooks";
import { Appbar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogsSkeleton } from "../components/BlogSkeleton";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return<div>
            <Appbar/>
         <div className="flex flex-col justify-center items-center">
            <BlogsSkeleton/>
            <BlogsSkeleton/>
            <BlogsSkeleton/>
            <BlogsSkeleton/>
            <BlogsSkeleton/>
            <BlogsSkeleton/>
        </div>
        </div>
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div >
                    {blogs.map((blog) => (
                        <BlogCard
                            id = {blog.id}
                            authorName="kirandeep"
                            title={blog.title}
                            content={blog.content}
                            publishedDate="15-march-2024"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
