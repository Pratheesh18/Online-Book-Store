const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    title : {type:String,required:true},
    author : {type:String,required:true},
    genre: { type: String },
    description : {type:String,required:true},
    isbn : {type:String,required:true},
    price : {type:Number,required:true},
    imageUrl : {type:String,required:true},
},{timestamps:true});


module.exports = mongoose.model('Book',booksSchema);