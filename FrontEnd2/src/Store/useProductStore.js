import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:3000";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  currentProduct: null,

  //form state
  formData: {
    name: "",
    image: "",
    price: "",
  },

  setFormData: (formData) => set({ formData }),
  resetFormData: () => set({ formData: { name: "", image: "", price: "" } }),

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });
    try {
      const { formData } = get();
      await axios.post(`${API_URL}/api/products`, formData);
      await get().fetchProducts(); // Fetch products after adding a new one
      get().resetFormData(); // Reset form data after successful addition
      toast.success("Product added successfully.");
      set({ error: null });
      //close the modal
      document.getElementById("add_product_modal").close();
    } catch (error) {
      set({ error: "Something went wrong while adding the product." });
      console.log("Error adding product:", error);
      toast.error("Failed to add product.");
    } finally {
      set({ loading: false });
    }
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_URL}/api/products`);
      set({ products: response.data.data, error: null });
    } catch (err) {
      if (err.status === 429) {
        set({ error: "Rate limit exceeded." });
        set({ products: [] });
      } else {
        set({ error: "Something went wrong." });
        set({ products: [] });
      }
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${API_URL}/api/products/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));
      set({ error: null });
      toast.success("Product deleted successfully.");
    } catch (error) {
      set({ error: "Something went wrong while deleting the product." });
      console.log("Error deleting product:", error);
      toast.error("Failed to delete product.");
    } finally {
      set({ loading: false });
    }
  },
  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_URL}/api/products/${id}`);
      set({
        currentProduct: response.data.data,
        error: null,
        formData: response.data.data,
      });
    } catch (error) {
        set({ error: "Something went wrong while fetching the product.", currentProduct: null });
        console.log("Error fetching product:", error);
        toast.error("Failed to fetch product.");
    } finally {
      set({ loading: false });
    }
  },
  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData }=get();
      const response=await axios.put(`${API_URL}/api/products/${id}`, formData);
      set({currentProduct: response.data.data});
      await get().fetchProducts(); // Fetch products after updating
      get().resetFormData(); // Reset form data after successful update
      toast.success("Product updated successfully.");
    } catch (error) {
      console.log("Error updating product:", error);
      toast.error("Failed to update product.");
    } finally {
      set({ loading: false });
    }
  },
}));
