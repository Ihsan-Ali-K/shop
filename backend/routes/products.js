const express = require('express');
const router = express.Router();
const Products = require('../models/Products');
const Categories = require('../models/Categories');


router.get('/fetchproducts', async (req, res)=>{

      try { 
     
      const products = await Products.find();
      const categories = await Categories.find();
      res.json([products, categories]);
      
             
} catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
     
     
})
module.exports = router;