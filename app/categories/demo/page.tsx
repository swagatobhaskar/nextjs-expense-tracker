'use client'

import { useState } from "react";
import Modal from "@/ui/demoModal";

export default function DropdownDemo() {

    const [expand, setExpand] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const listItems = [
        {'id': 1, 'name': 'item 1'},
        {'id': 2, 'name': 'item 2'},
        {'id': 3, 'name': 'item 3'},
        {'id': 4, 'name': 'item 4'}
    ];

    const handleExpand = () => {
        setExpand(!expand);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <div className="mx-auto w-2/4">
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

            <div className={!hidden ? "block" : "hidden"}>
                <p className="hover:cursor-pointer" onClick={() => setHidden(!hidden)}>Hidden</p>
            </div>

            <button
                type="button"
                className="cursor:pointer hover:bg-blue-600 bg-blue-500 
                    text-white p-3 border-2 rounded-md border-blue-700 w-auto mx-20 mt-10"
                onClick={()=>setShowModal(true)}
                >
                Show Modal
            </button>
            <Modal handleClose={handleClose} showModal={showModal} />
        </div>
    );
}
