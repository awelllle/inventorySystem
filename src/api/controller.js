const {validParam, sendErrorResponse, sendSuccessResponse,generateCode, trimCollection} = require('../helpers/utility');
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Purchase = mongoose.model('Purchase');


exports.getTotalSales = (req, res) =>{

    let required = [
        {name: 'min', type: 'string'},
        {name: 'max', type: 'string'}
    ];
    let hasRequired = validParam(req.body, required);
    if (hasRequired.success) {

    req.body = trimCollection(req.body);
    const body = req.body;
    let max =  new Date(body.max);
    let min = new Date(body.min);

    let filterMatch = {};
    filterMatch['created'] =   { '$gte':  new Date(max),  '$lte':  new Date(min) } 
 
    Purchase.aggregate([
    {$match:  filterMatch },
    {$lookup: {from: 'products', foreignField: 'prodId', localField: 'prodId', as: 'product'}},
    {$unwind: '$product'},

    ], (err, result) => {
        if (err) 
        {
            return sendErrorResponse(res, err, 'Something went wrong, please try again');
        }
        return sendSuccessResponse(res, result, 'Sales for the month');   
    }); 
}else{
    return sendErrorResponse(res, {required: hasRequired.message}, 'Missing required fields');
}

}
exports.getTotalSalesByProduct = (req, res) =>{

    let required = [
        {name: 'min', type: 'string'},
        {name: 'max', type: 'string'},
        {name: 'prodId', type: 'string'}
        
    ];
    let hasRequired = validParam(req.body, required);
    if (hasRequired.success) {

    req.body = trimCollection(req.body);
    const body = req.body;
            
    let max =  new Date(body.max);
    let min = new Date(body.min);

    let filterMatch = {};
    filterMatch['created'] =   { '$gte':  new Date(max),  '$lte':  new Date(min) };
    filterMatch['prodId'] =  body.prodId;
 
    Purchase.aggregate([
    {$match:  filterMatch },
    {$lookup: {from: 'products', foreignField: 'prodId', localField: 'prodId', as: 'product'}},
    {$unwind: '$product'},

    ], (err, result) => {
        if (err) 
        {
            return sendErrorResponse(res, err, 'Something went wrong, please try again');
        }
        return sendSuccessResponse(res, result, 'Here you go');   
    }); 
}else{
    return sendErrorResponse(res, {required: hasRequired.message}, 'Missing required fields');
}

}
exports.products = (req, res) => {


    let limit = req.body.limit || 10 ;
    let skip = req.body.skip || 0 ;


    Product.find({ }, function (err, result) {
        if(err)
        {
            console.log(err);
            return sendErrorResponse(res, {}, 'Something went wrong, Please try again');
        }
        return sendSuccessResponse(res, result, 'Here you go')
    }).limit(limit).skip(skip);
}
exports.addProduct = (req, res) =>{
    let required = [
        {name: 'name', type: 'string'},
        {name: 'price', type: 'number'}
    ];
    let hasRequired = validParam(req.body, required);
    if (hasRequired.success) {

            req.body = trimCollection(req.body);
            const body = req.body;

            let nProd              = new Product();
            nProd.name             = body.name;
            nProd.price            = body.price;
            nProd.prodId           = generateCode(6);
            nProd.availability     = true;

            nProd.save((err) => {
                console.log(err);
                if (err) {
                    return sendErrorResponse(res, err, 'Something went wrong');
                }
                return sendSuccessResponse(res, {}, 'Product has been created');
            });
    }else{
        return sendErrorResponse(res, {required: hasRequired.message}, 'Missing required fields');
    }
}
exports.updateProduct = (req, res) =>{
    let required = [
        {name: 'id', type: 'string'},
        {name: 'price', type: 'number'},
        {name: 'availability', type: 'boolean'},
        {name: 'name', type:'string'}
    ];
    let hasRequired = validParam(req.body, required);
    if (hasRequired.success) {

            req.body = trimCollection(req.body);
            const body = req.body;

            id = body.id;
            Product.updateOne(
                {  prodId : body.id }, {
                $set: {
                    price: body.price,
                    name : body.name,
                    availability : body.availability,
                    
                },
            }, (err, updated) => {
            
                if (err) {
                    console.log(err);
                    return sendErrorResponse(res, {}, 'Something went wrong, please try again');
                }
                if (updated && updated.nModified) {
                    return sendSuccessResponse(res, { }, 'Item Updated!');
                }else{
                    return sendSuccessResponse(res, { }, 'Item Already Updated!');
                }
            });

}else{
      
    return sendErrorResponse(res, {required: hasRequired.message}, 'Missing required fields');
}
     
}
exports.deleteProduct = (req, res)=> {
    let required = [
        {name: 'id', type: 'string'}
    ];
    let hasRequired = validParam(req.body, required);
    if (hasRequired.success) {

        id = req.body.id;  
        Product.deleteOne( { prodId : id}, { }, (err, updated) => {
                return sendSuccessResponse(res, {}, 'Item Deleted');
        }); 

    }else{
            return sendErrorResponse(res, {required: hasRequired.message}, 'Missing required fields');
    }
}
exports.logPurchase = (req, res)=>{
    let required = [
        {name: 'prodId', type: 'string'},
        {name: 'qty', type: 'string'}
    ];
    let hasRequired = validParam(req.body, required);
    if (hasRequired.success) {


        req.body = trimCollection(req.body);
        const body = req.body;

        let nPurchase                = new Purchase();
        nPurchase.prodId             = body.prodId;
        nPurchase.qty                = body.qty;

        nPurchase.save((err) => {
            console.log(err);
            if (err) {
                return sendErrorResponse(res, err, 'Something went wrong');
            }
            return sendSuccessResponse(res, {}, 'Purchase has been logged');
        });
    }else{
      
        return sendErrorResponse(res, {required: hasRequired.message}, 'Missing required fields');
    }
 
}




