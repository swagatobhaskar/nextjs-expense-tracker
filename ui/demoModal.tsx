
export default function Modal({handleClose, showModal}) {

    // const show = showModal ? 'block' : 'hidden';

    return (
        // <div className={showModal ? "block fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-60" : "hidden"}>
        <div className={`fixed inset-0 bg-gray-500 bg-opacity-60
            ${showModal ? "flex" : "hidden"} items-center justify-center z-50`}>
            {/* <section className="fixed bg-white w-4/5 h-auto top-1/2 left-1/2"> */}
            <section
                className="bg-white w-4/5 md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
                <h3 className="text-xl font-bold">Inside Modal.</h3>
                <p className="my-4">Yeaaa!</p>
                <button
                    type="button"
                    className="cursor:pointer hover:bg-amber-200 p-3 border-2 rounded-md border-green-700 w-auto mt-4"
                    onClick={handleClose}
                >
                    Close Modal
                </button>
            </section>
        </div>
    );
}