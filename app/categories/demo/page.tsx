'use client'

import { useState } from "react";

export default function DropdownDemo() {

    const [expand, setExpand] = useState(false);

    const listItems = [
        {'id': 1, 'name': 'item 1'},
        {'id': 2, 'name': 'item 2'},
        {'id': 3, 'name': 'item 3'},
        {'id': 4, 'name': 'item 4'}
    ];

    const handleExpand = () => {
        setExpand(!expand);
    }

    return (
        <div className="">
            <div id="first" className="w-28 m-auto mt-20">
                <button
                    className="cursor:pointer hover:bg-blue-200 p-3 border-2 rounded-md border-blue-700"
                    onClick={()=>handleExpand()}>
                        Click Me!
                </button>
                { expand && (
                    <div className="block space-y-3 mt-5 w-28 h-auto bg-blue-200 border-2 rounded-md">
                        {listItems.map((item) => (
                            <p key={item.id} className="border-b-2 border-blue-500">{item.name}</p>
                        ))}
                    </div>
                )}
            </div>

            <div
                id="second"
                className="cursor:pointer hover:bg-blue-200 p-3 border-2 rounded-md border-blue-700 w-28 m-auto mt-10"
                >
                Click Me!
            </div>
        </div>
    );
}
