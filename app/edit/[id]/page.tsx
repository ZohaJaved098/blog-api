'use client';
import { useRouter,useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function Edit() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();
  const { id } = useParams(); 
  useEffect(() => {
    if (id) {
      const storedBlogs = localStorage.getItem('blog');
      if (storedBlogs) {
        const blogs = JSON.parse(storedBlogs) as BlogPost[];
        const blogToEdit = blogs.find((blog) => blog.id === Number(id));
        if (blogToEdit) {
          setTitle(blogToEdit.title);
          setBody(blogToEdit.body);
        }
      }
    }
  }, [id]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const blogs = JSON.parse(localStorage.getItem('blog') || '[]') as BlogPost[];
      const updatedBlogs = blogs.map((blog) =>
        blog.id === Number(id) ? { ...blog, title, body } : blog
      );
      await axios.patch(`/api/blog/${id}`, { title, body });
      localStorage.setItem('blog', JSON.stringify(updatedBlogs));
      
      router.push('/'); // Redirect back to the home page

    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="flex flex-col w-[50%] max-lg:w-[80%] mt-2 p-10 max-lg:p-10 m-auto justify-between bg-[#de809f] rounded-md gap-5">
      <h1 className="font-bold text-center text-4xl max-md:text-2xl text-[#771f3d]">Edit</h1>
      <form id="edit-form" className="flex flex-col w-[90%] mt-2 p-3 max-lg:p-2 m-auto justify-between bg-[#de809f] rounded-md gap-5" onSubmit={handleEditSubmit}>
        <label htmlFor="edit-title" className="flex flex-col text-left text-[#123c69] text-lg capitalize font-semibold gap-2">
          Edit Title
          <input
            type="text"
            id="edit-title"
            placeholder="Write title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#edc7b7] text-[#123c69] p-5 w-full h-[25px] text-lg capitalize outline-none border-0 rounded-md"
          />
        </label>
        <label htmlFor="edit-body" className="flex flex-col text-left text-[#123c69] text-lg capitalize font-semibold gap-2">
          Edit Blog
          <textarea
            id="edit-body"
            placeholder="Write your blog here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={8}
            className="bg-[#edc7b7] scrollbar text-[#123c69] p-5 w-full text-lg outline-none border-0 rounded-md"
          />
        </label>
        <div className="flex flex-wrap justify-between max-sm:flex-col max-sm:gap-3 max-sm:items-center">
          <button type="submit" className="p-5 bg-[#771f3d] hover:bg-[#e76691] w-[45%] max-sm:w-[70%] text-[#edc7b7] text-center font-bold rounded-lg hover:shadow-hover-shadow">
            Save Changes
          </button>
          <Link href="/" type="button" className="p-5 bg-[#123c69] hover:bg-[#436993] w-[45%] max-sm:w-[70%] text-[#edc7b7] text-center font-bold rounded-lg hover:shadow-hover-shadow">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
