'use client'

import { useRouter } from "next/navigation";

export default function DeleteItem({id}) {
    const router = useRouter();

    const handleDelete = async (e) => {
        try {
            const resp = await fetch('/api/items/', {
                method: 'DELETE',
                body: JSON.stringify({"id": id}),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            router.push("/");
            if (!resp.ok) throw new Error(await resp.json());
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <button name="delete" title="Delete" onClick={() => handleDelete(id)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 304 384"><path fill="currentColor" d="M21 341V85h256v256q0 18-12.5 30.5T235 384H64q-18 0-30.5-12.5T21 341zM299 21v43H0V21h75L96 0h107l21 21h75z"
            /></svg>
        </button>
    );
}