"use client"

import { useState } from "react"

export default function EditItemModal() {

    const [ showModal, setShowModal ] = useState(false);
    const [ formData, setFormData ] = useState({
        "item_name": "", "amount": "", "expense_date": "", "category": "", "subcategory": ""        
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    return (
        <div>
            <button name="edit" title="Edit" onClick={() => setShowModal(!showModal)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="m16.77 8l1.94-2a1 1 0 0 0 0-1.41l-3.34-3.3a1 1 0 0 0-1.41 0L12 3.23zM1 14.25V19h4.75l9.96-9.96l-4.75-4.75z"
                /></svg>
            </button>
            {showModal && (
                // <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                //     <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
                //         <p>Hello</p>
                //     </div>
                // </div>
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50"
                    onClick={handleCloseModal} // Close the modal when clicking outside
                >
                    <div
                        className="p-8 border w-96 shadow-lg rounded-md bg-white"
                        onClick={(e) => e.stopPropagation()} // Prevent the modal from closing when clicking inside the modal
                    >
                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Edit Item</h2>
                        <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={handleCloseModal}
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            >
                            <path
                                fill-rule="evenodd"
                                d="M10 8.586L15.707 3.879a1 1 0 0 1 1.414 1.414L11.414 10l5.707 5.707a1 1 0 0 1-1.414 1.414L10 11.414l-5.707 5.707a1 1 0 0 1-1.414-1.414L8.586 10 2.879 4.293a1 1 0 0 1 1.414-1.414L10 8.586z"
                                clip-rule="evenodd"
                            />
                            </svg>
                        </button>
                        </div>

                        {/* Modal Form */}
                        <form>
                        <div className="mb-4">
                            <label htmlFor="item_name" className="block text-sm font-medium text-gray-700">
                            Item Name
                            </label>
                            <input
                            type="text"
                            id="item_name"
                            name="item_name"
                            value={formData.item_name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                            Amount
                            </label>
                            <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="expense_date" className="block text-sm font-medium text-gray-700">
                            Expense Date
                            </label>
                            <input
                            type="date"
                            id="expense_date"
                            name="expense_date"
                            value={formData.expense_date}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category
                            </label>
                            <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">
                            Subcategory
                            </label>
                            <input
                            type="text"
                            id="subcategory"
                            name="subcategory"
                            value={formData.subcategory}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end mt-4">
                            <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            onClick={(e) => {
                                e.preventDefault(); // Prevent the default form submission behavior
                                console.log(formData); // You can handle form submission here
                                handleCloseModal(); // Close the modal after submitting
                            }}
                            >
                            Save Changes
                            </button>
                        </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}