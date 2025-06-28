import React from "react";
import { useProductStore } from "../Store/useProductStore.js";
import { PlusCircleIcon } from "lucide-react";

function AppProductModal() {
  const { addProduct, formData, setFormData, loading } = useProductStore();
  return (
    <dialog id="add_product_modal" className="modal">
      <div className="modal-box border-spacing-10 border-base-content/10 bg-base-200 backdrop-blur-lg shadow-2xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-xl mb-8">Add New Product</h3>

        <form className="space-y-6" onSubmit={addProduct}>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <span className="label-text text-base font-medium">Name</span>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  className="w-[20px] h-[20px] fill-transparent"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                  />
                </svg>

                <input
                  type="text"
                  className="grow"
                  placeholder="Enter Product Name"
                  //this line ensure that the value displayed in input till now(already typed value) is the value of the state
                  value={formData.name}
                  //newly typed value is then added to state using below line
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="grid gap-2">
              <span className="label-text text-base font-medium">Price</span>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  className="w-[20px] h-[20px] fill-transparent"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
                  />
                </svg>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="grow"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="grid gap-2">
              <span className="label-text text-base font-medium">
                Image URL
              </span>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  className="w-[20px] h-[20px] fill-transparent"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                  />
                </svg>

                <input
                  type="text"
                  className="grow"
                  placeholder="https://example.com/image.jpg"
                  //this line ensure that the value displayed in input till now(already typed value) is the value of the state
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </label>
            </div>
          </div>
          {/* MODAL ACTIONS */}
          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={() => document.getElementById('add_product_modal').close()}>Cancel</button>
            <button
              type="submit"
              className="btn btn-primary min-w-[120px]"
              disabled={!formData.name || !formData.price || !formData.image || loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <PlusCircleIcon className="size-5 mr-2" />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      {/* BackDrop */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default AppProductModal;
