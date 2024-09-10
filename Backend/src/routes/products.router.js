import { Router } from 'express';

const router = Router();

//Array para almacenar
let products = [];

//Obtener todos los productos
router.get('/', (req, res) => {
    res.json(products);
});

//Crear nuevo producto
router.post('/', (req, res) => {
    const newProducts = req.body;
    products.push(newProducts);
    res.status(201).json(newProducts);
} )

export default router;