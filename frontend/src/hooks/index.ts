import axios from "axios";
import { useEffect, useState } from "preact/hooks";
import { BACKEND_URL } from "../config";

 export interface Blog {
    content: string;
    title: string;
    id: number;
    author: {
        name: string;
    };
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then(response => {
            console.log(response.data.blogs);
            setBlogs(response.data.blogs);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching blogs:", error);
            setLoading(false); // Ensure loading state is set to false even on error
        });
    }, []);

    return {
        loading,
        blogs,
    };
};

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>(); // Change to Blog | null

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then(response => {
            console.log(response.data);
            setBlog(response.data); // Change to response.data.blog
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching blog:", error);
            setLoading(false); // Ensure loading state is set to false even on error
        });
    }, [id]); // Make sure to include id in the dependency array

    return {
        loading,
        blog,
    };
}
