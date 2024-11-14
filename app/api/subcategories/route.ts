import dbConnect from "@/lib/db";
import mongoose from "mongoose";
import { type NextRequest, NextResponse } from "next/server";
import { Category } from "../categories/route";

const subCategorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    }
}, {timestamps: true});

export const Subcategory = mongoose.models.Subcategory || mongoose.model('Subcategory', subCategorySchema);

// export async function GET() {
//     await dbConnect();
//     const subcategories = await Subcategory.find({}).populate('category');
//     return new Response(JSON.stringify(subcategories), { status: 200 });
//   //   return NextResponse.json(posts);
//   }

export async function GET(request: NextRequest) {
    await dbConnect();
    const searchParams = request.nextUrl.searchParams;
    /**
    request.nextUrl.searchParams is an instance of URLSearchParams, not null. It is never null, even if there are no query parameters in the URL. Instead, it is an empty URLSearchParams object. This means that if (!searchParams) will evaluate to false, and the code inside the if block won't run.
    */

    if (!searchParams || searchParams.toString() === '') {
      const subcategories = await Subcategory.find({}).populate({path: 'category', model: Category});
      return new Response(JSON.stringify(subcategories), { status: 200 });
    } else {
      const query = searchParams.get('query')
      // query is "hello" for /api/search?query=hello
      const subcategoriesByCategoryID = await Subcategory.find({_id: query}).populate('category');
      return NextResponse.json(subcategoriesByCategoryID, {status: 200})
    }
}

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
  
    return NextResponse.json({ message: 'Subcategory Deleted Successfully!' }, { status: 200 });
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
