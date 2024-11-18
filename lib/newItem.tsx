'use client'

import { NewItemSubmitAction } from "./actions";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function NewItem() {
    
    const [formData, setFormData] = useState({
        "item_name": "", "amount": "", "category": "", "subcategory":"", "expense_date":""
    });
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [subcategoryOptions, setSubcategoryOptions] = useState([]);

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

    const handleInputChange = async (e, fieldName) => {
        console.log("Handling: ", e, fieldName);

        if (fieldName) {
            // Handling React-DatePicker
            setFormData((prevData) => ({
                ...prevData,
                [fieldName]: e instanceof Date? e.toISOString() : e,
            }))

        } else {
            // Handling standard inputs
            const { name, value } = e.target;
            
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));

            // Fetch subcategories when category changes
            if (name == 'category') {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    subcategory: "", // clear subcategory when category changes
                }));
                await fetchSubcategoryByCategory(value);
            }
        }
    };

    const handleNewItemSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        NewItemSubmitAction(formData);
        
        // <Not Required, this time.>
        // const submissionData = {
        //     ...formData,
        //     amount: formData.amount ? parseFloat(formData.amount) : null, //convert amount to number
        // }

        // try {
        //     const resp = await fetch('/api/items', {
        //     method: 'POST',
        //     body: JSON.stringify(formData),
        //     headers: {
        //         'Content-Type': 'application/json',
        //         }
        //     })

        //     if (!resp.ok) throw new Error(await resp.json());
        // } catch (err) {
        //     console.log(err);
        // }

    }

    return (
        <form onSubmit={handleNewItemSubmit} className="">            
            {/* Name Input */}
            <div className="flex flex-row justify-between">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="item_name"
                    required
                    onChange={handleInputChange}
                    placeholder="Expense Item Name"
                />
            </div>
                
            {/*Amount Input*/}
            <div className="flex flex-row mt-2">
                <label htmlFor="amount">Amount</label>
                <input
                    type="number"
                    name="amount"
                    required
                    onChange={handleInputChange}
                    placeholder="Item Amount"
                />
            </div>
            
            {/* Use Dropdown for the below categories */}
            <div className="flex flex-row mt-2">
                <label htmlFor="category">Category</label>
                <select
                    value={formData.category}
                    onChange={handleInputChange}
                    name="category"
                >
                    <option value="">Category</option>
                    {categoryOptions.map((item) => (
                        <option value={item._id.toString()} key={item._id.toString()}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Use Dropdown for the below Subcategories */}
            <div className="inline flex flex-row mt-2">
                <label htmlFor="subcategory">Subcategory</label>
                <select
                    onChange={handleInputChange}
                    value={formData.subcategory}
                    name="subcategory"
                >
                    <option value="">Subcategory</option>
                    {subcategoryOptions.map((item) => (
                        <option value={item._id.toString()} key={item._id.toString()}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Use Date picker for the below Date field */}
            <div className="flex flex-row mt-2">
                <label htmlFor="Date">Date</label>
                {/* https://reactdatepicker.com/ */}
                <DatePicker
                    closeOnScroll={true}
                    showIcon
                    // selected={expenseDate}
                    selected={formData.expense_date ? new Date(formData.expense_date) : null} // Convert string to Date
                    onChange={(date) => handleInputChange(date, 'expense_date')} // Update date in formData
                    isClearable
                    placeholderText="Expense Date"
                    dateFormat="dd/MM/yyyy"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    yearItemNumber={9}
                    name="expense_date"
                />
            </div>
            <button 
                className="bg-gray-600 hover:bg-black font-semibold hover:font-bold text-white cursor-pointer py-2 w-1/4"
                type="submit" name="submit">Add</button>
        </form>
    );
}