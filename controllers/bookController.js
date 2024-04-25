const { validationResult } = require("express-validator");
const Book = require("../models/Book");
const { body } = require("express-validator");

// Validate and sanitize input data for creating a book
exports.validateCreateBook = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("author").trim().notEmpty().withMessage("Author is required"),
  body("publicationYear")
    .isInt({ min: 1000, max: 9999 })
    .withMessage("Publication year must be a valid year"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validate and sanitize input data for updating a book
exports.validateUpdateBook = [
  body("title").optional().trim().notEmpty().withMessage("Title is required"),
  body("author").optional().trim().notEmpty().withMessage("Author is required"),
  body("publicationYear")
    .optional()
    .isInt({ min: 1000, max: 9999 })
    .withMessage("Publication year must be a valid year"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Controller function to create a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, publicationYear } = req.body;
    const book = new Book({ title, author, publicationYear });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to retrieve all books
exports.getBooks = async (req, res) => {
  try {
    const { author, publicationYear } = req.query;
    let query = {};

    if (author) {
      query.author = author;
    }

    if (publicationYear) {
      query.publicationYear = publicationYear;
    }

    const books = await Book.find(query);
    const responseData = { data: books };

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to retrieve a book by its ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update a book by its ID
exports.updateBook = async (req, res) => {
  try {
    const { title, author, publicationYear } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, publicationYear },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to delete a book by its ID
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
