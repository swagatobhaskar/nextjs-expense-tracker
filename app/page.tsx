//import ExpenseList from "@/ui/ExpenseList";
import { ObjectId } from "mongoose";
import {format} from "date-fns";
import NewItem from "@/lib/newItem";
// import { ItemDeleteAction, ItemEditAction } from "@/lib/actions";

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
                    <th className="border border-amber-400">Name</th>
                    <th className="border border-amber-400">Amount</th>
                    <th className="border border-amber-400">Date</th>
                    <th className="border border-amber-400">Modify</th>
                </tr>
            </thead>
            <tbody className="font-light">
                {expenses.map((item) => (
                    <tr key={item._id.toString()}>
                        <td>{item._id.toString()}</td>
                        <td>{item.item_name}</td>
                        <td>{item.amount}</td>
                        <td>{toLocalDate(item.expense_date)}</td>
                        <td className="flex flex-row justify-evenly">
                            <button name="edit" title="Edit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="m16.77 8l1.94-2a1 1 0 0 0 0-1.41l-3.34-3.3a1 1 0 0 0-1.41 0L12 3.23zM1 14.25V19h4.75l9.96-9.96l-4.75-4.75z"
                                /></svg>
                            </button>
                            <button name="delete" title="Delete">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 304 384"><path fill="currentColor" d="M21 341V85h256v256q0 18-12.5 30.5T235 384H64q-18 0-30.5-12.5T21 341zM299 21v43H0V21h75L96 0h107l21 21h75z"
                                /></svg>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className="w-2/4 mx-auto mt-20 border-[1px] rounded-sm border-gray-400 p-4">
            <NewItem />
        </div>
      </main>
  );
}
