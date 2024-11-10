import express from 'express'
import { postProducts,getProducts,deleteProduct, updateProduct } from '../controller/product.controller.js';

const router = express.Router();


 // get the  the all products
  
 router.get("/",getProducts );


// adding the products
router.post("/",postProducts );
  
//  update the products
router.put("/:id",updateProduct );  

  // deleteing the all products
  
  router.delete("/:id", deleteProduct);
  
 
export default router;