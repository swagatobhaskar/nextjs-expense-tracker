"use client"

import { useState } from "react";

const categories = [
    {"_id":1, "name":"junk"},
    {"_id":2, "name":"food"},
    {"_id":3, "name":"education"}];

export default function Category() {
    // const data = await fetch('http://127.0.0.1:3000/api/categories/');
    // const categories = await data.json();

    const handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
    }

    // const handleAddNewCategory = async() => {
        
    // }
    
    return (
        <div className="mx-auto mt-10 min-w-40 w-1/3 relative">
            <div>
                {categories.map((category) => (
                    <ul key={category._id.toString()} className="list-none">
                        <li className="my-3 p-3 bg-gray-700 text-white text-xl">{category.name}</li>
                    </ul>
                ))}
            </div>
            <button
                /* But, it's client side functionality! */
                className="absolute right-1 mt-2 py-2 px-3 bg-gray-600 hover:bg-gray-700 cursor-pointer text-white"
                >
                Add New
            </button>
            {/* Add new category */}
            <div className="relative">
                <form
                    // onSubmit={handleAddNewCategory}
                    className="absolute top-20 shadow-md shadow-gray-300
                    h-32 w-full flex flex-row justify-center py-10"
                    >
                    <input
                        className="font-inter text-lg box-border outline outline-1 shadow-md outline-gray-400 rounded-sm pl-1"
                        type="text"
                        name="new-category"
                        placeholder="new expense category"
                        onChange={(e)=>{handleChange(e)}}
                        required
                    />
                    <button
                        className="py-2 px-5 ml-2 rounded-sm bg-gray-600 hover:bg-gray-700 cursor-pointer text-white"
                        type="submit"
                        name="submit"
                        >
                        Add
                    </button>
                    <button
                        className="px-5 ml-2 rounded-sm bg-gray-600 hover:bg-gray-700 cursor-pointer text-white"
                        type="submit"
                        name="submit"
                        >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}
