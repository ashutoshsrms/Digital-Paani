const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const { authenticateToken } = require("../middleware/authMiddleware");

// Define book routes
router.post('/addBook', authenticateToken, bookController.createBook);
router.get("/getBooks", bookController.getBooks);
router.get("/getBookById/:id", bookController.getBookById);
router.put("/updateBook/:id", authenticateToken,bookController.updateBook);
router.delete("/deleteBook/:id",authenticateToken, bookController.deleteBook);

module.exports = router;
