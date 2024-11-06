'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation'; 
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
    // const router = useRouter();
    const {id}= useParams();
    
    useEffect(() => {
        if (id) {
            try {
                axios.get(`/api/blog/${id}`);
                const storedBlogs = localStorage.getItem('blog');
                if (storedBlogs) {
                    const blogs = JSON.parse(storedBlogs) as BlogPost[];
                    const blogToEdit = blogs.find((blog) => blog.id === Number(id));
                    if (blogToEdit) {
                    setTitle(blogToEdit.title);
                    setBody(blogToEdit.body);
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
      }, [id]);
      
    return (
        <div className={`flex-col w-[50%] max-lg:w-[80%] mt-2 p-10 max-lg:p-10 m-auto justify-between bg-[#de809f] rounded-md gap-5`}>
                <h1 className="font-bold text-center text-4xl max-md:text-2xl text-[#771f3d] capitalize">Read {title}'s Blog</h1>
                <form id="read-form" className="flex flex-col w-[90%] mt-2 p-3 max-lg:p-2 m-auto justify-between bg-[#de809f] rounded-md gap-5">
                    <label htmlFor="read-title" className="flex flex-col text-left text-[#123c69] text-lg capitalize font-semibold gap-2">
                        Title: 
                        <input
                            type="text"
                            id="read-title"
                            value={title}
                            disabled
                            className="bg-[#edc7b7] p-5 w-full h-[25px] text-lg text-[#123c69] capitalize outline-none border-0 rounded-md"
                        />
                    </label>
                    <label htmlFor="read-body" className="flex flex-col text-left text-[#123c69] text-lg capitalize font-semibold gap-2">
                        Blog: 
                        <textarea
                            id="read-body"
                            value={body}
                            disabled
                            rows={5}
                            className="bg-[#edc7b7] scrollbar text-[#123c69] p-5 w-full text-lg outline-none border-0 rounded-md"
                        />
                    </label>
                    <div className="flex flex-wrap justify-end ">
                        <Link href='/' type="button" className="p-5 bg-[#123c69] hover:bg-[#436993] w-[50%] max-md:w-[60%] text-[#edc7b7] text-center font-bold rounded-lg hover:shadow-hover-shadow" >
                            Go Back
                        </Link>
                    </div>
                </form>
            </div>
        
    );
}
