import { create } from "zustand";
import axios from "axios";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return {
        success: false,
        message: "please fill all the fields.",
      };
    }
    const data = await axios.post(
      "http://localhost:3000/api/products",
      newProduct
    );
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully." };
  },

  fetchProducts: async () => {
    const data = await axios.get("http://localhost:3000/api/products");
    set({ products: data.data.data });
  },
  deleteProduct: async (pid) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/api/products/${pid}`
      );
      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return {
        success: true,
        message: data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to delete product",
      };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    try {
      // Make the PUT request to update the product
      const response = await axios.put(
        `http://localhost:3000/api/products/${pid}`,
        updatedProduct
      );
  
      const data = response.data; // access the response data
  
      // Check if the update was successful
      if (!data.success) {
        return { success: false, message: data.message || "Update failed." };
      }
  
      // Update the state with the modified product data
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));
  
      return { success: true, message: data.message || "Product updated successfully." };
    } catch (error) {
      // Handle any errors and return a friendly error message
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update product",
      };
    }
  }
  
}));
