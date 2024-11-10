"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// const categories = [
//     {"_id":1, "name":"junk"},
//     {"_id":2, "name":"food"},
//     {"_id":3, "name":"education"}];

export default function Category() {
    // const data = await fetch('http://127.0.0.1:3000/api/categories/');
    // const categories = await data.json();
    const router = useRouter();

    const [isVisible, setIsVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState();

    useEffect(()=>{
        const fetchCategoryData = async () => {
            const res = await fetch('http://127.0.0.1:3000/api/categories');
            const data = await res.json();
            setCategories(data);
        };
        fetchCategoryData();
    }, [])

    const toggleVisibility = () => {
        setIsVisible(prevState => !prevState);
    };

    const handleAddNewCategory = async() => {
        console.log("new category", newCategory);
        try {
            const resp = await fetch('http://127.0.0.1:3000/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCategory)
            }).then(
                router.push('/categories'))
            
        } catch(err) {
            console.error(err);
        }
    }
    
    return (
        <div className="mx-auto mt-10 min-w-40 w-1/3">
            <div>
                {categories.map((category) => (
                    <ul key={category._id.toString()} className="list-none">
                        <li className="my-3 p-3 bg-gray-700 text-white text-xl rounded">{category.name}</li>
                    </ul>
                ))}
            </div>
            <div className="relative">
                <button
                    className="absolute right-1 mt-2 py-2 px-3 bg-gray-600 hover:bg-gray-700 cursor-pointer text-white"
                    onClick={toggleVisibility}
                    >
                    {isVisible ? 'Cancel' : 'Add New'}
                </button>
            </div>
            {/* Add new category */}
            {isVisible && (
                <div className="relative">
                    <form
                        onSubmit={handleAddNewCategory}
                        className="absolute top-20 shadow-md shadow-gray-300
                            h-32 w-full flex flex-row justify-center py-10 px-2"
                        >
                        <input
                            className="font-inter text-lg box-border outline outline-1 shadow-md outline-gray-400 rounded-sm pl-1 w-2/3"
                            type="text"
                            name="new-category"
                            placeholder="new expense category"
                            onChange={(e) => setNewCategory(e.target.value)}
                            required
                        />
                        <button
                            className="py-2 px-5 ml-2 rounded-sm bg-gray-600 hover:bg-gray-700 cursor-pointer text-white"
                            type="submit"
                            name="submit"
                            >
                            Add
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
