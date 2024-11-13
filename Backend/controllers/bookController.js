const fs = require('fs');
const path = require('path');
const Book = require('../models/bookModel');


const addBook = async (req,res) => {
    try{
        const {title,author,description,genre,price,isbn} = req.body;
        const imageUrl = `uploads/${req.file.filename}`.replace(/\\/g, '/');
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


const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Received Form Data:", req.body);
    console.log("Received File:", req.file);

    // Fetch the existing book document
    const existingBook = await Book.findById(id);
    if (!existingBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const updateData = { ...req.body };

    // Debugging: Log the request body and file
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    // Handle image update if a new file is uploaded
    if (req.file) {
      // Delete the old image file if it exists
      if (existingBook.imageUrl) {
        const oldImagePath = path.join(__dirname, '..', existingBook.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log("Old image deleted:", oldImagePath);
        }
      }
      // Update imageUrl with the new file path
      updateData.imageUrl = `uploads/${req.file.filename}`.replace(/\\/g, '/');
      console.log("New image URL:", updateData.imageUrl);
    }

    // Perform the update with the cleaned data
    const updatedBook = await Book.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found during update' });
    }

    console.log("Updated Book:", updatedBook);
    res.json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Failed to update book', details: error.message });
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



