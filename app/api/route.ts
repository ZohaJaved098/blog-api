import { NextResponse } from "next/server";
import axios from "axios";


export async function GET(request: Request) {
    try {
        const blogs = await axios("https://jsonplaceholder.typicode.com/posts");
        return NextResponse.json(blogs.data);
    } catch (err) {
        console.error("Error processing GET request:", err);
        return NextResponse.json({ message: "Error processing request", err }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { title, body } = await request.json();
        const blog={title, body}
        return NextResponse.json({ message: 'Blog created successfully', blog }, { status: 201 });
    } catch (err) {
        console.error("Error processing POST request:", err);
        return NextResponse.json({ message: "Error processing request", err }, { status: 500 });
    }
}