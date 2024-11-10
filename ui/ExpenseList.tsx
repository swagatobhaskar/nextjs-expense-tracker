// import { ObjectId } from "mongoose";

// interface Expense {
//     _id: ObjectId;         // Assuming _id is a string (it could be ObjectId if you're using MongoDB)
//     item_name: string;   // The name of the item (assumed to be a string)
//     amount: number;      // The amount (assumed to be a number)
//     expense_date: string;
// }

// const expenses = [
//     {"id": 1, "item_name": "abcd", "amount": 1234, "date": 2023-11-23},
//     {"id": 2, "item_name": "efgh", "amount": 238, "date": 2024-12-23},
//     {"id": 3, "item_name": "ijkl", "amount": 5538, "date": 2024-02-02},
// ]

export default async function ExpenseList({expenseData}) {
    console.log("Window--> ", typeof(window))
    // const data = await fetch('http://127.0.0.1:3000/api/items/');
    // const expenses: Expense[] = await data.json();  // Explicitly typing the response as an array of Expense objects

    return (
        <table className="table-fixed border-collapse border border-amber-600 bg-amber-300">
            <thead>
                <tr>
                    <th className="border border-amber-400">ID</th>
                    <th className="border border-amber-400">Amount</th>
                    <th className="border border-amber-400">Name</th>
                    <th className="border border-amber-400">Date</th>
                </tr>
            </thead>
            <tbody>
                {expenseData.map((item) => (
                    <tr key={item._id.toString()}>
                        <td>{item._id.toString()}</td>
                        <td>{item.item_name}</td>
                        <td>{item.amount}</td>
                        <td>{item.expense_date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
