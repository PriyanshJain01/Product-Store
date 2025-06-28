import pg from 'pg';
import dotenv from "dotenv";

dotenv.config();
//if my status is success, then i will return the data otherwise no data and thus message
// pg handles placeholders with $1, $2, $3 etc. in the query string
// js handles placeholders with ${1}, ${2}, ${3} etc. in the query string
//pg is preferred for placeholders to avoid confusion with js placeholders
const db = new pg.Client({
    user: process.env.user,
    host: process.env.host,
    password: process.env.password,
    database: process.env.database,
    port: process.env.db_port
});

db.connect();

//CRUD operations for products(Create, read, update and delete)
export const getProducts = async (req, res) => {
    try {
        const result=await db.query(
            'Select * from products order by created_at desc'
        )
        console.log("Products fetched successfully :", result.rows);
        res.status(200).json({success: true, data: result.rows});
    } catch (error){
        console.log("Error fetching all the products: ", error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}
export const createProduct = async (req, res) => {
    const {name, image, price} = req.body
    
    if(!name || !image || !price){
        return res.status(400).json({success: false, message: "All fields are required"});
    }
    try{
        const newProduct=await db.query(
            'Insert into Products (name, image, price) values( $1,$2,$3) returning *',[name, image, price]
        )

        console.log("New Product Added : ", newProduct.rows[0]);
        res.status(201).json({success: true, data: newProduct.rows[0]});
    } catch (error) {
        console.log("Error creating product: ", error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
}
export const getProduct = async (req,res) => {
    const {id} = req.params;
    try{
        const product=await db.query(
            'Select * from products where id=$1',[id]
        )
        if(product.rows.length == 0){
            return res.status(404).json({success: false, message: "Product not found"});
        }
        console.log("Product fetched successfully: ", product.rows[0]);
        res.status(200).json({success: true, data: product.rows[0]});
    } catch(error){
        console.log("Error getting product: ", error);
        res.status(500).json({success: false, message: "Internal Server Errpr"});
    }
}
export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const {name, image, price} = req.body;
    try{
        const updateProduct=await db.query(
            'Update products set name=$2, image=$3, price=$4 where id=$1 returning *',[id, name, image, price]
        )
        if(updateProduct.rows.length == 0){
            return res.status(404).json({success: false, message: "Product not found"});
        }
        console.log("Product updated successfully: ", updateProduct.rows[0]);
        res.status(200).json({success: true, data: updateProduct.rows[0]});
    } catch(error){
        console.log("Error updating product: ", error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}
export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try{
        const deleteProduct=await db.query(
            `Delete from products where id=$1 returning *`,[id]
        )
        if(deleteProduct.rows.length == 0){
            return res.status(404).json({success: false, message: "Product not found"});
        }
        console.log("Product deleted successfully: ", deleteProduct.rows[0]);
        res.status(200).json({success: true, data: deleteProduct.rows[0]});
    }catch(error){
        console.log("Error deleting product: ", error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}