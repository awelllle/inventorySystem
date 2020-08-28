
'use strict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let ProductSchema = new Schema({
    
    name: String,
    price: Number,
    prodId: String,
    availability: String,  
    created: {type: Date, require:true, default: Date.now}
});

module.exports = mongoose.model('Product', ProductSchema);
