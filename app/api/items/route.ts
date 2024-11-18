import dbConnect from '@/lib/db';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

const expenseItemSchema = new mongoose.Schema({
    item_name: { type: String, required: true },
    amount: { type: Number, required: true },
    description: {type: String, required: false},
    expense_date: { type: Date, required: true, default: Date.now },
    category: {type: String, required: false},
    subcategory: {type: String, required: false},
  }, { timestamps: true });

const ExpenseItem = mongoose.models.ExpenseItem || mongoose.model('ExpenseItem', expenseItemSchema);

export async function GET() {
  await dbConnect();
  const expense_item = await ExpenseItem.find({});
  return new Response(JSON.stringify(expense_item), { status: 200 });
//   return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const { item_name, amount, expense_date, description, category, subcategory } = await request.json();
  await dbConnect();
  const expense_item = new ExpenseItem({ item_name, amount, expense_date, description, category, subcategory });
  await expense_item.save();
  return new Response(JSON.stringify(expense_item), { status: 201 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await dbConnect();
  const expense_item_to_delete = await ExpenseItem.findByIdAndDelete(id);

  if (!expense_item_to_delete) {
    return NextResponse.json({ message: 'Item not found' }, { status: 404 });
  }

  return NextResponse.json(expense_item_to_delete);
}

export async function PUT(request: Request) {
    const expense_item_data = await request.json();
    await dbConnect();
    const updated_expense_item = ExpenseItem.findByIdAndUpdate(
        expense_item_data.id, expense_item_data, {new: true}
    );

    if (!updated_expense_item) {
        return NextResponse.json({message: "item not found"}, {status: 404});
    }

    return NextResponse.json(updated_expense_item);
}
