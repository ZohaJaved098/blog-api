"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function HomePage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Show
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const storedBlogs = localStorage.getItem('blog');
        if (storedBlogs) {
          try {
              const parsedBlogs = JSON.parse(storedBlogs);
              setBlogs(parsedBlogs);
          } catch (e) 
          {
            console.error('Error parsing blogs from localStorage:', e);
            setBlogs([]); 
          }
        } else 
        {
          const response = await axios.get<BlogPost[]>('/api');
          setBlogs(response.data);
          localStorage.setItem('blog', JSON.stringify(response.data));
        }
        
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []); 

  // Delete
  async function handleDeleteClick (id: number) {
    if(confirm(`Are you sure you want to delete?`)){
      try {
        await axios.delete(`/api/blog/${id}`);
        const updatedBlogs = blogs.filter(blog => blog.id !== id);
        setBlogs(updatedBlogs);
        localStorage.setItem('blog', JSON.stringify(updatedBlogs));

      } catch (error) {
        console.error('Error deleting resource:', error);
      }
    }
  }

  if (loading) return <div className="text-2xl tracking-wider mt-8 font-black text-[#ac3b61] text-center">Loading...</div>;

  return (
    <div className={`w-full h-auto flex flex-wrap m-auto mt-10 justify-around gap-5 scrollbar`}>
      {blogs.map((blog) => (
        <div key={blog.id} className="flex flex-col justify-around w-[30%] h-[250px] max-lg:w-[45%] max-md:w-[80%] p-5 rounded-xl gap-1 bg-[#eee2dc] hover:bg-[#efbda2] shadow-container-shadow">
          <div className="flex flex-col justify-around h-full p-1">
            <h1 className="text-center text-[#ac3b61] text-lg capitalize font-semibold">{blog.title}</h1>
            <p className="text-left text-ellipsis line-clamp-2 px-3 text-[#123c69] text-md font-medium ">{blog.body}</p>
          </div>
          <div className="flex justify-end gap-3">
            <Link href={`view/${blog.id}`} className="p-3 bg-[#123c69] hover:bg-[#436993] text-[#eee2dc] text-center font-bold capitalize rounded-lg hover:shadow-hover-shadow">
              <img src="/visibility_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" alt="View this Blog" />
            </Link>
            <Link href={`/edit/${blog.id}`}>
              <button className="p-3 bg-[#123c69] hover:bg-[#436993] text-[#eee2dc] font-bold capitalize text-center rounded-lg hover:shadow-hover-shadow">
                <img src="/edit_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" alt="Edit this Blog" />
              </button>
            </Link>
            <button onClick={()=>handleDeleteClick(blog.id)} className="p-3 bg-[#123c69] hover:bg-[#436993] text-[#eee2dc] text-center font-bold capitalize rounded-lg hover:shadow-hover-shadow">
              <img src="/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" alt="Delete this Blog" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
