import { useState } from "react";

export default function Category({category, handleDeleteCategory}) {

    const [ expand, setExpand ] = useState(false);
    const [ subcategories, setSubcategories ] = useState([]);

    const handleExpand = async (e) => {
        e.preventDefault();
        console.log("EXPAND clicked.");
        try {
            const subcategories = await fetch(`/api/categories?query=${category._id}`)
            const response = await subcategories.json();
            // console.log("This sub cats: ", response);
            setSubcategories(response.subcategories);
            setExpand(prevState => !prevState);
        } catch (err) {
            console.log(err);
        }
    }

    const handleCollapse = (e) => {
        e.preventDefault();
        setExpand(prevState => !prevState);
        setSubcategories([]);
        console.log("Collapse clicked.");
    }

    return (
        <div className="" >
            <div className="flex flex-row justify-between">
                <p className="">{category.name}</p>
                <button name="delete" title="Delete"
                    onClick={(e) => handleDeleteCategory(e, category._id) }
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 304 384"><path fill="currentColor" d="M21 341V85h256v256q0 18-12.5 30.5T235 384H64q-18 0-30.5-12.5T21 341zM299 21v43H0V21h75L96 0h107l21 21h75z"/></svg>
                </button>
            </div>
            {/* Expand buttons */}
            <div className="right-2">
                { !expand ? (
                    <button id="subcategory-expand" onClick={ (e)=>handleExpand(e) } className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g id="feArrowDown0" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g id="feArrowDown1" fill="currentColor">
                            <path id="feArrowDown2" d="m6 7l6 6l6-6l2 2l-8 8l-8-8z"/></g></g></svg>
                    </button>
                ) : (
                    <button type="submit" id="subcategory-collapse" onClick={ (e)=>handleCollapse(e) } className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <g id="feArrowUp0" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g id="feArrowUp1" fill="currentColor"><path id="feArrowUp2" d="m4 15l8-8l8 8l-2 2l-6-6l-6 6z"/></g></g></svg>
                    </button>
                )}
            </div>
            {/* Subcategory showing section */}
            <div className="block">
                { subcategories.length !== 0 && (
                    <div className="bg-white bottom-[2px] border-gray-700">
                        {subcategories.map((item) => (
                            <ul key={item._id.toString()}>
                                <li className="text-sm">{item.name}</li>
                            </ul>
                        ))}
                    </div>
                ) }
            </div>
        </div>
    );
}