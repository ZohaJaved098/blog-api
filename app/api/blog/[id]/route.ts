
import { NextResponse } from "next/server";
import axios from "axios";
export async function GET(request: Request, { params }: { params: { id: string } }  ) {
    try {
        const {id}= params;
        console.log(id)
        const blogs = await axios(`https://jsonplaceholder.typicode.com/posts/${id}`);
        return NextResponse.json(blogs.data);
    } catch (error) {
        console.error("Error processing GET by Id request:", error);
        return NextResponse.json({ message: "Error processing request", error }, { status: 500 });
        
    }
}
 
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    const {title, body} =await request.json();
    const {id}= params
    try {
        const response = await axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, { title, body });
        console.log(response.data)
        return NextResponse.json({ message: `Resource ${id} updated successfully.`, data: response.data }, { status: 200 });
    } catch (error) {
        console.error("Error processing Put by Id request:", error);
        return NextResponse.json({ message: "Error processing request", error }, { status: 500 }); 
    }
}
 
export async function DELETE(request: Request, { params }: { params: { id: number } }) {
    const { id } = params
    try {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        return NextResponse.json({message: `Blog ${id} deleted successfully` }, {status:200})
    } catch (error) {
        console.error("Error processing Delete request:", error);
        return NextResponse.json({ message: "Error processing request", error }, { status: 500 });
    }
}
 
