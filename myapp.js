const express = require('express')
const mongoose = require('mongoose')
const Inventory = require('./inventoryitems')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/inventories', async(req, res) => {
    try {
        const inventories = await Inventory.find({});
        res.status(200).json(inventories);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/inventories/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const inventory = await Inventory.findById(id);
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
app.post('/inventories', async(req, res) => {
    try {
        const inventory = await Inventory.create(req.body)
        res.status(200).json(inventory);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
app.put('/inventories/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const inventory = await Inventory.findByIdAndUpdate(id, req.body);
        if(!inventory){
            return res.status(404).json({message: `cannot find any inventory with ID ${id}`})
        }
        const updatedInventory = await Inventory.findById(id);
        res.status(200).json(updatedInventory);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/inventories/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const inventory = await Inventory.findByIdAndDelete(id);
        if(!inventory){
            return res.status(404).json({message: `cannot find any inventory with ID ${id}`})
        }
        res.status(200).json(inventory);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose.
connect('mongodb://admin:password@localhost:32000/?authMechanism=DEFAULT')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})