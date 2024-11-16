'use client'

import { useState, useEffect } from "react";

export default function NewItem() {
    
    const [formData, setFormData] = useState({
        "name": "", "amount": "", "category": "", "subcategory":"", "date":""
    });
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [subcategoryOptions, setSubcategoryOptions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedSubcategory, setSelectedSubcategory] = useState();
    const [runFetchCategories, setRunFetchCategories] = useState(false);

    const handleCategoryDropdown = (e) => {
        setSelectedCategory(e.target.value);
        console.log(e.target.value);
        try {
            fetchSubcategoryByCategory(e.target.value);
        } catch (err) {
            console.log(err);
        }        
    }

    const fetchSubcategoryByCategory = async (selectedCategory: string) => {
        console.log("selectedCategory:: ", selectedCategory);
        try {
            const resp = await fetch(`/api/categories?query=${selectedCategory}`);
            const subcategories = await resp.json();
            setSubcategoryOptions(subcategories.subcategories);
        } catch (err) {
            console.error(err);
        }
    }

    const handleSubcategoryDropdown = (e) => {
        setSelectedSubcategory(e.target.value);
        console.log("Selected Subcategory== ", selectedSubcategory, e.target.value); 
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const resp = await fetch('/api/categories');
                const categories = await resp.json();
                setCategoryOptions(categories);
            } catch (err) {
            console.error(err);
            }
        };
        fetchCategories()
    }, [])

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
                <select onChange={handleCategoryDropdown} value={selectedCategory}>
                    <option value="">Category</option>
                    {categoryOptions.map((item) => (
                        <option value={item._id.toString()} key={item._id.toString()}>{item.name}</option>
                    ))}
                </select>
            </div>

            {/* Use Dropdown for the below Subcategories */}
            <div className="inline flex flex-row mt-2">
                <label htmlFor="subcategory">Subcategory</label>
                <select onChange={(e) => handleSubcategoryDropdown(e)}>
                    <option value="">Subcategory</option>
                    {subcategoryOptions.map((item) => (
                        <option value={item._id.toString()} key={item._id.toString()}>{item.name}</option>
                    ))}
                </select>
            </div>

            {/* Use Date picker for the below Date field */}
            <div className="inline flex flex-row mt-2">
                <label htmlFor="Date">Date</label>
                <input type="date" name="date"/>
            </div>
            <button 
                className="bg-gray-600 hover:bg-black font-semibold hover:font-bold text-white cursor-pointer py-2 w-1/4"
                type="submit" name="submit">Add</button>
        </form>
    );
}