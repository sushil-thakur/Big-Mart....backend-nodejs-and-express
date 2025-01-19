
import mongoose from "mongoose";
//we are going to create a tabel
//tabel has field:
//1.name=>string
//2.price =>number
//3.brand =>string
//4.freeShipping =>boolean

//schema => rule
const productSchema = mongoose.Schema({
    name:String,
    price:Number,
    brand:String,
    freeShipping:Boolean,
});

//create tabel/model/collection/entity
const Product = mongoose.model("Product",productSchema);
export default Product;
    
