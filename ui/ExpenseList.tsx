import { ObjectId } from "mongoose";

interface Expense {
    _id: ObjectId;         // Assuming _id is a string (it could be ObjectId if you're using MongoDB)
    item_name: string;   // The name of the item (assumed to be a string)
    amount: number;      // The amount (assumed to be a number)
    expense_date: string;
}

export default async function ExpenseList() {

    const data = await fetch('http://127.0.0.1:3000/api/items/');
    const expenses: Expense[] = await data.json();  // Explicitly typing the response as an array of Expense objects

    return (
        <div>
            <table className="table-auto border border-collapse font-inter">
                <thead>
                    <tr>
                        <th className="">Id</th>
                        <th className="">Item Name</th>
                        <th className="">Amount</th>
                        <th className="">Expense Date</th>
                    </tr>
                </thead>
            <tbody>
                {expenses.map((expense) => (
                    <tr key={expense._id.toString()}>
                        <td className="">{expense._id.toString()}</td>
                        <td className="">{expense.item_name}</td>
                        <td className="">{expense.amount}</td>
                        <td className="">{expense.expense_date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};
