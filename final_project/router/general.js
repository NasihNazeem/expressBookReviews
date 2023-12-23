const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

function searchAuthor(author) {
  const foundBooks = [];
  for (const id in books) {
    const book = books[id];

    if (book.author.toLowerCase() === author.toLowerCase()) {
      foundBooks.push(book);
    }
  }

  return foundBooks;
}

// Task 10

function getListOfBooks() {
  return new Promise((resolve, reject) => {
    resolve(books);
  });
}

function searchTitle(title) {
  const foundTitle = [];

  for (const id in books) {
    const book = books[id];

    if (book.title.toLowerCase() === title.toLowerCase()) {
      foundTitle.push(book);
    }
  }

  return foundTitle;
}

public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password });
      return res.status(200).json({
        message: "User successfully registered. You are free to login.",
      });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// TASK 1
// // Get the book list available in the shop
// public_users.get("/", function (req, res) {
//   //Write your code here
//   res.send(JSON.stringify(books, null, 4));

//   return res.status(300).json({ message: "Returned all books" });
// });

// TASK 10
public_users.get("/", function (req, res) {
  //Write your code here
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(books), 500);
  });

  promise.then((result) => {
    return res.status(200).json({ books: result });
  });
});

// TASK 2
// Get book details based on ISBN
// public_users.get("/isbn/:isbn", function (req, res) {
//   //Write your code here
//   const isbn = req.params.isbn;
//   res.send(books[isbn]);
//   return res.status(300).json({ message: "Returned book" });
// });

// TASK 11
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const getBook = new Promise((resolve, reject) => {
    setTimeout(() => {
      const book = books[isbn];
      if (book) {
        resolve(book);
      } else {
        reject({ message: "Cannot find book" });
      }
    }, 500);
  });

  getBook
    .then((book) => {
      return res.status(200).json(book);
    })
    .catch((error) => {
      return res.status(404).json(error);
    });
});

// TASK 3
// Get book details based on author
// public_users.get("/author/:author", function (req, res) {
//   //Write your code here
//   const author = req.params.author;
//   const foundBooks = searchAuthor(author);
//   res.send(foundBooks);
//   return res.status(300).json({ message: "Yet to be implemented" });
// });

// TASK 12
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  const author = req.params.author;
  const getBooksByAuthor = new Promise((resolve, reject) => {
    setTimeout(() => {
      const foundBooks = searchAuthor(author);
      if (foundBooks.length === 0) {
        reject({ message: "No books found under author" });
      } else {
        resolve(foundBooks);
      }
    }, 500);
  });

  getBooksByAuthor
    .then((books) => {
      return res.status(200).json(books);
    })
    .catch((error) => {
      return res.status(404).json(error);
    });
});

// TASK 4
// Get all books based on title
// public_users.get("/title/:title", function (req, res) {
//   //Write your code here
//   const title = req.params.title;
//   const foundTitle = searchTitle(title);
//   res.send(foundTitle);
//   return res.status(300).json({ message: "Yet to be implemented" });
// });

// TASK 13
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  const title = req.params.title;

  const getBooksByTitle = new Promise((resolve, reject) => {
    setTimeout(() => {
      const foundTitle = searchTitle(title);
      if (foundTitle.length === 0) {
        reject({ message: "No books found under title" });
      } else {
        resolve(foundTitle);
      }
    }, 500);
  });

  getBooksByTitle
    .then((books) => {
      return res.status(200).json(books);
    })
    .catch((error) => {
      return res.status(404).json(error);
    });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
  return res.status(300).json({ message: "Yet to be implemented" });
});

public_users.get("/", function (req, res) {
  getBookList().then(
    (bk) => res.send(JSON.stringify(bk, null, 4)),
    (error) => res.send("N o")
  );
});

module.exports.general = public_users;
