import dbConnect from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true},
})

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export async function GET() {
    await dbConnect();
    const categories = await Category.find({});
    return new Response(JSON.stringify(categories), { status: 200 });
  //   return NextResponse.json(posts);
  }

export async function POST(request: Request) {
    const { name } = await request.json();
    await dbConnect();
    const category = new Category({ name });
    await category.save();
    return NextResponse.json(category, { status: 201 });
}
  
export async function DELETE(request: Request) {
    const { _id } = await request.json();
    await dbConnect();
    const category = await Category.findByIdAndDelete(_id);
  
    if (!category) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }
  
    return NextResponse.json({ message: 'Category Deleted Successfully!' }, { status: 200 });
  }
  

export async function PUT(request: Request) {
    const category_data = await request.json();
    await dbConnect();
    const updated_category = Category.findByIdAndUpdate(
        category_data.id, category_data, {new: true}
    );

    if (!updated_category) {
        return NextResponse.json({message: "item not found"}, {status: 404});
    }

    return NextResponse.json(updated_category);
}
