import express from "express";
import mongoose from "mongoose";
import Product from "./product.model.js";
//create a backend app
const app=express();

//to make app understand json
app.use(express.json());

//database connect
const dbConnect = async()=>{
    try{
        const url ="mongodb+srv://bigmart:1234@sushil.rf9fj.mongodb.net/big-mart?retryWrites=true&w=majority&appName=sushil";
        await mongoose.connect(url);
        console.log("DB connection sucessfull..");


    }catch(error){
        console.log("DB connection failed..");
        console.log(error.message);
    }
};
dbConnect();
app.post("/product/add",async(req,res)=>{
    const product = req.body;
    await Product.create(product);

    //req body
    //{name:"bread",brand:Nanglo",price:120,freeshipping:false}
    return res.status(201).send({message:"adding..."});
});

app.get("/product/list",async(req,res)=>{
    const products = await Product.find();
    return res.status(200).send({message:"success", productList:products});

//route/api
});

app.delete("/product/delete/:id",async(req,res)=>{
    //exact product id from req,params
    const productId = req.params.id;

    //should be a valaid mango id
    const isValidId = mongoose.isValidObjectId(productId);

    //if not valid object id throw error
    if(!isValidId){
        return res.status(400).send({message:"Invalid product id"});
    }

    //find product
    const product = await Product.findOne({_id:productId});

    //if not product, throw error
    if(!product){
        return res.status(404).send({message:"Product not found"});
    }

    //delete product
    await product.deleteOne({_id:productId});

    //send response
    return res.status(200).send({message:"Product deleted"});


});


//network port
const PORT=8000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});