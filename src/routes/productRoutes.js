import express from 'express';
import Product from '../services/mongodb/models/Product';
import Category from '../services/mongodb/models/Category';
import { body, validationResult } from 'express-validator';

const router = express.Router()


/* 
type: GET
path: /api/v1/product/all
params: none
isProtected: false (public route)
*/

router.get('/all', async (req, res) => {
    try {
        const products = await Product.find({})
        return res.status(200).json({ products, message: "successfully fetched products" })
    } catch (error) {
        //console.log(error.message)
        return res.status(500).json({ products: [], message: "error fetching products" })
    }
})




/* 
type: GET
path: /api/v1/product/all
params: none
query: categoryID
isProtected: false (public route)
*/

router.get('/all', async (req, res) => {
    try {
        const { categoryId } = req.query
        const products = await Product.find({ category: categoryId })
        return res.status(200).json({ products, message: "successfully fetched products" })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ products: [], message: "error fetching products" })
    }
})




/* 
type: POST
path: /api/v1/product/add
params: none
isProtected: true (admin)
*/

router.post('/add',

    body('name').isLength({ min: 1 }),
    body('price').isNumeric(),
    body('listPrice').isNumeric(),
    body('description').isLength({ min: 5 }),
    body('color').isLength({ min: 1 }),
    body('compatibleWith').isLength({ min: 1 }),
    body('category').isLength({ min: 4 }),
    body('imageURL').isURL(),
    body('stock').isNumeric()
    , async (req, res) => {

        const { errors } = validationResult(req)

        if (errors.length > 0) return res.status(403).json({ errors, message: "Bad Request" })


        try {

            //Check if category exists in DB
            const category = await Category.findById(req.body.category)
            if (!category) return res.status(500).json({
                product: null,
                message: "Invalid Category"
            })

            const product = new Product(req.body);
            await product.save()
            res.status(200).json({ product, message: "saved product in DB" })

        } catch (error) {
            return res.status(500).json({
                product: null,
                message: "unable to save product in DB"
            })
        }
    })



/* 
type: PUT
path: /api/v1/product/update/:id
params: id
isProtected: true (admin)
*/

router.put('/update/:id', async (req, res) => {

    const { id } = req.params

    try {

        //Check if category exists in body while updating
        if (req.body.category) {
            const category = await Category.findById(req.body.category)
            if (!category) return res.status(500).json({
                product: null,
                message: "Invalid Category"
            })
        }

        const product = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true })

        res.status(200).json({ product, message: "updated product in DB" })

    } catch (error) {
        return res.status(500).json({
            product: null,
            message: "unable to update product in DB"
        })
    }
})




/* 
type: DELETE
path: /api/v1/product/delete/:id
params: id
isProtected: true (admin)
*/

router.delete('/delete/:id', async (req, res) => {

    const { id } = req.params

    try {
        const product = await Product.findByIdAndRemove(id)

        res.status(200).json({ product, message: "deleted product in DB" })

    } catch (error) {
        return res.status(500).json({
            product: null,
            message: "unable to delete product in DB"
        })
    }
})



export default router;