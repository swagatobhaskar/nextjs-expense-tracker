// import Image from "next/image";
import ExpenseList from "@/ui/ExpenseList";
import { ObjectId } from "mongoose";

interface Expense {
    _id: ObjectId;         // Assuming _id is a string (it could be ObjectId if you're using MongoDB)
    item_name: string;   // The name of the item (assumed to be a string)
    amount: number;      // The amount (assumed to be a number)
    expense_date: string;
}
export default async function Home() {
  
  const data = await fetch('http://127.0.0.1:3000/api/items/');
  const expenses: Expense[] = await data.json();
  
  return (
    <div className="relative">
      <main className="mx-20">
      <ExpenseList data={expenses} />
      </main>
      <footer className="">
      
      </footer>
    </div>
  );
}
