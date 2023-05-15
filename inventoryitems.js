const mongoose = require('mongoose')

const inventorySchema = mongoose.Schema(
    {
        serialnumber: {
            type: String,
            required: [true, "Please enter a serial number"]
        },
        type: {
            type: String,
            required: [true, "Please enter a type"]
        },
        model: {
            type: String,
            required: true,
        },
        manufacturer: {
            type: String,
            required: false,
        },
        condition: {
            type: String,
            required: [true, "Please enter a condition"]
        },
        cost: {
            type: String,
            required: [true, "Please enter a cost"]
        },
        notes: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)


const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;