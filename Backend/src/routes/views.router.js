import { Router  } from "express";
import productsManager from "../productsManager.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const products = await productsManager.getProducts();
        res.render("home", {products});
    } catch (error) {
        console.log(error);
        res.status(500).json({eror: "error interno del servidor"})
        
    }
    
})


export default router;