// import Image from "next/image";
import ExpenseList from "@/ui/ExpenseList";
// import { Suspense } from "react";
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
      <div className="mx-auto w-2/3 bg-blue-500 font-extralight font-serif">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, magnam eaque itaque iure pariatur maiores doloribus quo eveniet. Ab, nulla adipisci. In, eligendi reprehenderit velit officiis fugiat delectus reiciendis necessitatibus.</p>
      </div>
      {/* <main className="mx-20">*/}
        {/* <Suspense fallback={<p>Loading...</p>}> */}
          <ExpenseList expenseData={expenses} />
        {/* </Suspense>         */}
      {/* </main> */}
    </div>
  );
}
