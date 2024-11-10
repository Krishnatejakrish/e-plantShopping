import Product from "../models/Product.model.js";
import mongoose from "mongoose";


/* get all the products */

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
    console.log(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
};


/* add the product */

export const postProducts = async (req, res) => {
  // const {name,price}=req.body;
  const product = req.body;
  if (
    !product.name ||
    !product.price ||
    !product.image ||
    !product.description
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all the fields" });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
    console.log(newProduct);
  } catch (error) {
    console.log("error in create product", error.message);
    res.status(500).json({
      success: false,
      message: "Error creating product",
    });
  }
};


/* update thhe product */

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const productData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log("error in update product", error.message);
    res.status(500).json({
      success: false,
      message: "Error updating product",
    });
  }
};

/* delete the products */

export const deleteProduct = async (req, res) => {
  const { id } = req.params;


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }

  try {
    await Product.findByIdAndDelete(id);
    console.log(` product deleted with this id  : ${id}`);
    res.status(200).json({
      success: true,
      message: "product deleted successfully",
      // deletedProduct,
    });
  } catch (error) {
    console.log("error in delete product", error.message);
    res.status(500).json({
      success: false,
      message: "Error deleting product",
    });
  }
};
