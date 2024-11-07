
export default async function ExpenseList() {

    const data = await fetch('http://127.0.0.1:3000/api/items/');
    const expenses = await data.json();

    return (
        <div>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense.id}>
                        <p>{expense.item_name}: ${expense.amount}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
