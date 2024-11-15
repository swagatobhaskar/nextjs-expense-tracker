'use client'

import { useState } from "react";

export default function NewItem() {
    
    const [formData, setFormData] = useState();

    return (
        <form action={'#'} className="">
            <div className="flex flex-row justify-between">
                <div className="inline flex flex-row justify-between">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" required placeholder="Expense Item Name" />
                </div>
                <div className="inline flex flex-row">
                    <label htmlFor="amount">Amount</label>
                    <input type="number" name="amount" required placeholder="Item Amount" />
                </div>
            </div>
            
            {/* Use Dropdown for the below categories */}
            <div className="inline flex flex-row mt-2">
                <label htmlFor="category">Category</label>
                <input type="text" name="category" required placeholder="Expense Item Category" />
            </div>
            {/* Use Dropdown for the below Subcategories */}
            <div className="inline flex flex-row mt-2">
                <label htmlFor="subcategory">Subcategory</label>
                <input type="text" name="subcategory" required placeholder="Expense Item Subcategory" />
            </div>
            {/* Use Date picker for the below Date field */}
            <div className="inline flex flex-row mt-2">
                <label htmlFor="Date">Date</label>
                <input type="text" name="date" required placeholder="Expense Date" />
            </div>
            <button 
                className="bg-gray-600 hover:bg-black font-semibold hover:font-bold text-white cursor-pointer py-2 w-1/4"
                type="submit" name="submit">Add</button>
        </form>
    );
}