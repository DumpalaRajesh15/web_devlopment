
const express = require("express");
const app = express();

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Book Management API! Use /books to view all books.");
});

let books = [
  { id: 1, title: "Wings of Fire", author: "A.P.J. Abdul Kalam" },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho" }
];

let nextId = 3;

// GET: View all books
app.get("/books", (req, res) => {
  res.json(books);
});

// GET: View a book by ID
app.get("/books/:id", (req, res) => {
  const book = books.find(b => b.id === Number(req.params.id));

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
});

// POST: Add a new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;

  if (typeof title !== "string" || !title.trim() ||
      typeof author !== "string" || !author.trim()) {
    return res.status(400).json({
      message: "Title and author are required"
    });
  }

  const book = {
    id: nextId++,
    title: title.trim(),
    author: author.trim()
  };

  books.push(book);
  res.status(201).json(book);
});

// PUT: Update a book
app.put("/books/:id", (req, res) => {
  const book = books.find(b => b.id === Number(req.params.id));

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const { title, author } = req.body;

  if (typeof title !== "string" || !title.trim() ||
      typeof author !== "string" || !author.trim()) {
    return res.status(400).json({
      message: "Title and author are required"
    });
  }

  book.title = title.trim();
  book.author = author.trim();

  res.json({
    message: "Book updated successfully",
    book
  });
});

// DELETE: Delete a book
app.delete("/books/:id", (req, res) => {
  const index = books.findIndex(b => b.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deletedBook = books.splice(index, 1)[0];

  res.json({
    message: "Book deleted successfully",
    book: deletedBook
  });
});

// Start server
app.listen(3000, () => {
  console.log("Book API running at http://localhost:3000");
});
