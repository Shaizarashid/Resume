const express = require("express");
const Product = require("../models/product.model.js");
const router = express.Router();
const { deleteProduct, getProducts, getProduct, createProduct, updateProduct } = require('../controllers/product.controller.js');

router.get('/', getProducts);
router.get('/:id', getProduct);

router.post('/', createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;