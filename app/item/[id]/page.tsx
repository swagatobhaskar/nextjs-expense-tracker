// export default async function Page() {
//     return <p>This is the page to edit an item, only accessible through hard navigation.</p>
// }

/**
 * The generateStaticParams function can be used in combination with dynamic route segments to
 * statically generate routes at build time instead of on-demand at request time.
 * 
 */

export async function generateStaticParams() {
    const items = await fetch('/api/items').then((res) => res.json())
   
    return items.map((item) => ({
      id: item.id, //or, _id
    }))
  }
