//import ExpenseList from "@/ui/ExpenseList";
import { ObjectId } from "mongoose";
import {format} from "date-fns";

interface Expense {
    _id: ObjectId;         // Assuming _id is a string (it could be ObjectId if you're using MongoDB)
    item_name: string;   // The name of the item (assumed to be a string)
    amount: number;      // The amount (assumed to be a number)
    expense_date: string;
}
export default async function Home() {  // this is non async in many official examples
  
  const data = await fetch('http://127.0.0.1:3000/api/items/');
  const expenses: Expense[] = await data.json();

  const toLocalDate = (dateStr) => {
    const dateFromDB = new Date(dateStr);
    return format(dateFromDB, 'yyyy-MM-dd HH:mm:ss', {timeZone: 'UTC'})
  }
  
  return (
      <main className="m-auto text-center text-wrap">
        <table className="mx-auto mt-20 w-2/3 table-fixed border-collapse border border-amber-600 bg-amber-300">
            <thead className="text-lg">
                <tr>
                    <th className="border border-amber-400">ID</th>
                    <th className="border border-amber-400">Amount</th>
                    <th className="border border-amber-400">Name</th>
                    <th className="border border-amber-400">Date</th>
                </tr>
            </thead>
            <tbody className="font-light">
                {expenses.map((item) => (
                    <tr key={item._id.toString()}>
                        <td>{item._id.toString()}</td>
                        <td>{item.item_name}</td>
                        <td>{item.amount}</td>
                        <td>{toLocalDate(item.expense_date)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </main>
  );
}
