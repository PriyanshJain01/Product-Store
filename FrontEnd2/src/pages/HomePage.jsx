import React from "react";
import { useProductStore } from "../Store/useProductStore";
import { useEffect } from "react";
import { PlusCircleIcon, RefreshCcwIcon } from "lucide-react"; // Import icons
import ProductCard from "../components/ProductCard";
import { PackageIcon } from "lucide-react"; // Importing the Package icon for empty state
import AddProductModal from "../components/AddProductModal"; // Importing the modal component
import Slider from "../components/Slider";
import { useUserStore } from "../Store/useUserStore";

function HomePage() {
  const { products, loading, error, fetchProducts } = useProductStore();
  const {Admin}=useUserStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Slider />
      <div className="flex justify-between items-center mb-8">
        {Admin && (
          <button
          className="btn btn-primary"
          onClick={() =>
            document.getElementById("add_product_modal").showModal()
          }
        >
          <PlusCircleIcon className="size-5 mr-2" />
          Add Product
        </button>
        )}
        <button className="btn btn-ghost btn-circle" onClick={fetchProducts}>
          <RefreshCcwIcon className="size-5" />
        </button>
      </div>

      <AddProductModal />

      {error && <div className="alert alert-error mb-8">{error}</div>}

      {products.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <PackageIcon className="size-12" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold ">No products found</h3>
            <p className="text-gray-500 max-w-sm">
              Get started by adding your first product to the inventory
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <div></div>
    </main>
  );
}

export default HomePage;
