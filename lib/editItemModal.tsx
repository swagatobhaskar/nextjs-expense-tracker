"use client"

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react"

export default function EditItemModal({item}) {

    const [ formData, setFormData ] = useState({
        "item_name": item.item_name,
        "amount": item.amount,
        "expense_date": item.expense_date,
        "category": item.category,
        "subcategory": item.subcategory
    });

    const searchParams = useSearchParams()
    const dialogRef = useRef<null | HTMLDialogElement >(null)
    const showDialog = searchParams.get('showEditDialog')

    useEffect( () => {
        if (showDialog === 'true') {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
    }, [showDialog])

    const closeDialog = () => {
        dialogRef.current?.close()
    }

    const clickSave = () => {
        closeDialog()
    }

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const dialog: JSX.Element | null = showDialog === 'true' ? (
        <dialog ref={dialogRef} className="fixed top-50 left-50 -translate-x-50 -translate-y-50
        z-10 rounded-xl backdrop:bg-gray-800/50 w-1/4">
            <div className="w-[500px] max-w-full bg-gray-200 flex flex-col">
                <div className="flex flex-row justify-between mb-4 pt-2 px-5 bg-yellow-400">
                    <h1 className="text-2xl">Edit This Item</h1>
                    <button
                        onClick={closeDialog}
                        className="mb-2 py-1 px-2 cursor-pointer rounded border-none w-8 h-8 font-bold bg-red-600 text-white"
                    >X</button>
                </div>
            </div>
            <div >
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

                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            onClick={clickSave}
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
            {/* <div className="flex flex-row justify-end mt-2">
                <button
                    onClick={clickSave}
                    className="bg-green-500 py-1 px-2 rounded border-none"
                >
                    Save
                </button>
            </div> */}
        </dialog>
    ) : null

    return dialog
}
