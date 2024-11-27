import EditItemModal from "@/ui/editItemModal";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    return (
        <div>
            <EditItemModal item={params} />
        </div>
    );
}
