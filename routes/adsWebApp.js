import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/adsWebApp.js";
import { isAuthenticated, isAuthorized } from "../middlewares/userAuth.js";

const adsRouter = Router();

adsRouter.post('/products', 
    isAuthenticated, 
    isAuthorized(['superadmin', 'admin']),

//how are we handling product image uploads?
    createProduct);

adsRouter.get('/products',getProducts);

adsRouter.get('/products/:id', isAuthenticated ,getProductById);

// adsRouter.put(
//     '/products/:id',
//     isAuthenticated,
//     // productImageUpload.array('pictures', 3),
//     // replaceProduct
// );

adsRouter.patch('/products/:id',isAuthenticated,updateProduct);

adsRouter.delete('/products/:id',isAuthenticated,deleteProduct);

export default adsRouter;