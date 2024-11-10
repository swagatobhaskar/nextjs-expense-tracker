
export default async function Category() {
    const data = await fetch('http://127.0.0.1:3000/api/categories/');
    const categories = await data.json();
    
    return (
        <div className="mx-auto mt-10 min-w-40 w-1/3 relative">
            {categories.map((category) => (
                <ul key={category._id.toString()} className="list-none">
                    <li className="my-3 p-3 bg-gray-700 text-white text-xl">{category.name}</li>
                </ul>
            ))}
            <button
                /* But, it's client side functionality! */
                className="absolute right-1 mt-2 py-2 px-3 bg-gray-600 hover:bg-gray-700 cursor-pointer text-white"
                >
                Add New
            </button>
        </div>
    );
}
