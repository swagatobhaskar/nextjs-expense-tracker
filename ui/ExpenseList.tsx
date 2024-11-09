
// const expenses = [
//     {"id": 1, "item_name": "abcd", "amount": 1234, "date": 2023-11-23},
//     {"id": 2, "item_name": "efgh", "amount": 238, "date": 2024-12-23},
//     {"id": 3, "item_name": "ijkl", "amount": 5538, "date": 2024-02-02},
// ]

export default function ExpenseList({data}) {

    // const data = await fetch('http://127.0.0.1:3000/api/items/');
    // const expenses: Expense[] = await data.json();  // Explicitly typing the response as an array of Expense objects

    return (
        <div className="mx-auto w-11/12">
            {data.map((expense) => (
                <div key={expense._id.toString()} className="flex flex-row p-4 font-inter bg-amber-500">
                    <div className="">{expense._id.toString()}</div>
                    <div className="">{expense.amount}</div>
                    <div className="">{expense.item_name}</div>
                    <div className="">{expense.expense_date}</div>
                </div>
            ))}
        </div>
    );
};
