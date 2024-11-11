'use client'

import { useState, useEffect } from "react";

// export const dynamic = 'force-dynamic';

export default function Category() {
    
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

    const handleDeleteCategory = async (e, categoryId) => {
        e.preventDefault();
        
        try{
            const response = await fetch('/api/categories', {
                    method: 'DELETE',
                    body: JSON.stringify({"_id": categoryId}),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )

            if (response.ok) {
                // Remove the item from the local state after successful delete
                setCategories(categories.filter(item => item._id !== categoryId));
            } else {
                console.error('Failed to delete item');
            }
        } catch (error) {
          console.error('Error deleting item:', error);
        }
    }

    const handleAddNewCategory = async (e) => {
        e.preventDefault();
        setIsVisible(false);

        try {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"name": newCategory})
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData || 'Something went wrong!');
            }

            const data = await response.json();

            setCategories((prevData) => [...prevData, { "name": data.name, "_id": data._id.toString() }]);
        } catch(err) {
            console.error(err);
        }
    }
    
    return (
        <div className="mx-auto mt-10 min-w-40 w-1/3">
            {(categories.length !== 0) ? (
            <div>
                {categories.map((category) => (
                    <ul key={category._id.toString()} className="list-none">
                        <li className="my-3 p-3 bg-gray-700 text-white text-xl rounded flex flex-row justify-between">
                            <p className="">{category.name}</p>
                            <button type="submit" name="delete" title="Delete"
                                onClick={(e) => handleDeleteCategory(e, category._id) }
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 304 384"><path fill="currentColor" d="M21 341V85h256v256q0 18-12.5 30.5T235 384H64q-18 0-30.5-12.5T21 341zM299 21v43H0V21h75L96 0h107l21 21h75z"/></svg>
                            </button>
                        </li>
                    </ul>
                ))}
            </div>
            ) : (
                <p>Loading categories...</p>
            )}
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
                        method="POST"
                        className="absolute top-20 shadow-md shadow-gray-300
                            h-32 w-full flex flex-row justify-center py-10 px-2"
                        >
                        <input
                            className="font-inter text-lg box-border outline outline-1 shadow-md outline-gray-400 rounded-sm pl-1 w-2/3"
                            type="text"
                            name="new-category"
                            placeholder="new expense category"
                            id="new-category"
                            onChange={(e) => setNewCategory(e.target.value)}
                            required
                        />
                        <button
                            className="py-2 px-5 ml-2 rounded-sm bg-gray-600 hover:bg-gray-700 cursor-pointer text-white"
                            type="submit"
                            >
                            Add
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
