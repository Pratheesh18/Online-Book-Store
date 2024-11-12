const Book = require('../models/bookModel');


export const addBook = async (req,res) => {
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

export const getBooks = async (req,res) => {
    try{
        const books = await Book.find();
        res.json(books);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

export const getBookById = async (req,res) => {
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        if(!book) return res.status(404).json({error:'Book not availble'});
        res.json(book);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

export const updateBook = async (req,res) => {
    try{
        const {id} = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id,req.body,{new:true});
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



