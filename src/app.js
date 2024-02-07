import express from 'express';
import  ProductManager from './productManager.js'


const app = express();
const productManager = new ProductManager('./data/produtos.json');


app.get("/produtos", async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts();
    
        if (limit) {
          const limitedProducts = products.slice(0, +limit);
          res.json({ products: limitedProducts });
        } else {
          res.json({ products });
        }
      } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produtos' });
      }
});


app.get("/produtos/:id", async (req, res) => {
    const { id } = req.params;
    const products = await productManager.getProducts();
    const foundP = products.find((p) => p.id === +id);

    if (foundP) {
        return res.status(200).json(foundP)
    } else {
        return res.status(404).json({error: "Produto não encontrado!"})
    }
});


export default app;