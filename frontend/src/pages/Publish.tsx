import axios from "axios";
import { Appbar } from "../components/AppBar";
import { BACKEND_URL } from "../config";
import { useState } from "preact/hooks";
import { ChangeEvent } from "preact/compat";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const navigate = useNavigate();

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle((e.target as HTMLInputElement)?.value);
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription((e.target as HTMLTextAreaElement)?.value);
    };

    const handlePublish = async () => {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                { title, content: description },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            navigate(`/blog/${response.data.id}`);
        } catch (error) {
            // Handle error
            console.error("Error publishing post:", error);
        }
    };

    return (
        <div>
            <Appbar />
            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full">
                    <input
                        onChange={handleTitleChange}
                        type="text"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        placeholder="Title"
                    />
                    <TextEditor onChange={handleDescriptionChange} />
                    <button
                        onClick={handlePublish}
                        type="submit"
                        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    >
                        Publish Post
                    </button>
                </div>
            </div>
        </div>
    );
};

interface TextEditorProps {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextEditor({ onChange }: TextEditorProps) {
    return (
        <div className="w-full mb-4 border mt-5">
            <div className="flex items-center justify-between px-3 py-2">
                <div className="px-4 py-2 bg-white rounded-b-lg w-full">
                    <label htmlFor="editor" className="sr-only">Description</label>
                    <textarea
                        onChange={onChange}
                        id="editor"
                        rows={8}
                        className="block w-full px-0 text-sm text-gray-800 bg-white focus:ring-0 dark:placeholder-gray-400 focus:outline-none"
                        placeholder="Write an article..."
                        required
                    />
                </div>
            </div>
        </div>
    );
}
