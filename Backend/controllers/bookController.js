const Book = require('../models/bookModel');


const addBook = async (req,res) => {
    try{
        const {title,author,description,genre,price,isbn} = req.body;
        const imageUrl = req.file.path;
        const book = new Book({title,author,genre,isbn,description,price,imageUrl});
        await book.save();
        res.status(201).json(book);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

 const getBooks = async (req,res) => {
    try{
        const books = await Book.find();
        res.json(books);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

 const getBookById = async (req,res) => {
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        if(!book) return res.status(404).json({error:'Book not availble'});
        res.json(book);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

const updateBook = async (req,res) => {
    try{
        const {id} = req.params;
        const updatedData = {...req.body};
        if(req.file){
            updatedData.imageUrl = `uploads/${req.file.filename}`;
        }
        const updatedBook = await Book.findByIdAndUpdate(id,updatedData,{new:true});
        res.json(updatedBook);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

 const deleteBook = async (req,res) => {
    try{
        const {id} = req.params;
        await Book.findByIdAndDelete(id);
        res.json({message:'Book deleted'});
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

module.exports = {addBook,getBookById,getBooks,updateBook,deleteBook};



