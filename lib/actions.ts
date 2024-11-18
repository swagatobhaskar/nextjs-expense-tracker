'use server'

// import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation"

export async function NewItemSubmitAction(formData) {
    await fetch('http://127.0.0.1:3000/api/items/', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    redirect('/');
}