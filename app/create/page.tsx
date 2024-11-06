'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';

interface BlogPost {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export default function Create() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [blogs, setBlogs] = useState<BlogPost[]>([]); 
    const router = useRouter();

    // Load existing blogs from local storage on component mount
    useEffect(() => {
        const storedBlogs = localStorage.getItem('blog');
        if (storedBlogs) {
            setBlogs(JSON.parse(storedBlogs) as BlogPost[]); 
        }
    }, []);

    const handleCreateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title && body) {
            try {
                const blogs = JSON.parse(localStorage.getItem('blog') || '[]') as BlogPost[];
                const nextId = blogs.length ? Math.max(...blogs.map(blog => blog.id)) + 1 : 1;
                const newBlog = { id: nextId, title, body, userId: 1 };

                await axios.post('/api', newBlog);

                const updatedBlogs = [newBlog, ...blogs]; 
                localStorage.setItem('blog', JSON.stringify(updatedBlogs));

                setBlogs(updatedBlogs);

                router.push('/');

                setTitle('');
                setBody('');
            } catch (error) {
                console.error("Error creating blog:", error);
            }
        }
    };

    return (
        <div className={`flex flex-col w-[50%] max-lg:w-[80%] mt-2 p-10 max-lg:p-5 m-auto justify-between bg-[#de809f] rounded-md gap-5`}>
            <h1 className="font-bold text-center text-4xl max-md:text-2xl text-[#771f3d]">Create New Blog</h1>
            <form id="create-form" className="flex flex-col w-[90%] mt-2 p-3 max-lg:p-2 m-auto justify-between bg-[#de809f] rounded-md gap-5" onSubmit={handleCreateSubmit}>
                <label htmlFor="title" className="flex flex-col text-left text-[#123c69] text-lg max-lg:text-base capitalize font-semibold gap-2">
                    Write Title for your Blog
                    <input
                        type="text"
                        id="title"
                        placeholder="Write title here..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-[#edc7b7] p-5 w-full h-[25px] text-lg text-[#123c69] capitalize outline-none border-0 rounded-md"
                    />
                </label>
                <label htmlFor="body" className="flex flex-col text-left text-[#123c69] text-lg max-lg:text-base capitalize font-semibold gap-2">
                    Write your Blog
                    <textarea
                        id="body"
                        placeholder="Write your blog here..."
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        rows={5}
                        className="bg-[#edc7b7] scrollbar text-[#123c69] p-5 w-full text-lg outline-none border-0 rounded-md"
                    />
                </label>
                <div className="flex flex-wrap justify-between max-sm:flex-col max-sm:gap-3 max-sm:items-center">
                    <button type="submit" className="p-5 bg-[#771f3d] hover:bg-[#e76691] w-[45%] max-sm:w-[70%] text-[#edc7b7] font-bold rounded-lg hover:shadow-hover-shadow">
                        Create Blog
                    </button>
                    <Link href="/" className="p-5 bg-[#123c69] hover:bg-[#436993] w-[45%] max-sm:w-[70%] text-[#edc7b7] text-center font-bold rounded-lg hover:shadow-hover-shadow">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
