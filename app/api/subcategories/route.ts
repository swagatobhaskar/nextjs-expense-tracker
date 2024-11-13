import dbConnect from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

const subCategorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    }
}, {timestamps: true});

export const Subcategory = mongoose.models.Subcategory || mongoose.model('Subcategory', subCategorySchema);

export async function GET() {
    await dbConnect();
    const subcategories = await Subcategory.find({}).populate('category');
    return new Response(JSON.stringify(subcategories), { status: 200 });
  //   return NextResponse.json(posts);
  }

// export async function GET(request: NextRequest) {
//     await dbConnect();
//     if (request) {
//         const searchParams = request.nextUrl.searchParams
//         const query = searchParams.get('query')
//         // query is "hello" for /api/search?query=hello
//         const subcategoriesByCategoryID = await Subcategory.find({category_id: query}).populate('');

//         return NextResponse.json(subcategoriesByCategoryID, {status: 200})
//     } else {
//         const subcategories = await Subcategory.find({});
//         return new Response(JSON.stringify(subcategories), { status: 200 });
//     }
// }

export async function POST(request: Request) {
    const { name, category } = await request.json();
    await dbConnect();
    const subcategory = new Subcategory({ name, category });
    await subcategory.save();
    return NextResponse.json(subcategory, { status: 201 });
}
  
export async function DELETE(request: Request) {
    const { _id } = await request.json();
    await dbConnect();
    const subcategory = await Subcategory.findByIdAndDelete(_id);
  
    if (!subcategory) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }
  
    return NextResponse.json({ message: 'Category Deleted Successfully!' }, { status: 200 });
  }
  

export async function PUT(request: Request) {
    const subcategory_data = await request.json();
    await dbConnect();
    const updated_subcategory = Subcategory.findByIdAndUpdate(
        subcategory_data.id, subcategory_data, {new: true}
    );

    if (!updated_subcategory) {
        return NextResponse.json({message: "item not found"}, {status: 404});
    }

    return NextResponse.json(updated_subcategory);
}
