let myLibrary = [
  // {
  //   title: "Hello Kitty",
  //   author: "KITTENS",
  //   numberofPages: 5,
  //   wasRead: true,
  // },
  // {
  //   title: "Graves, The Lonely Knight",
  //   author: "Humma",
  //   numberofPages: 10,
  //   wasRead: false,
  // },
];

function Book(title, author, numberOfPages, wasRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.wasRead = wasRead;
  this.info = function () {
    return (
      `${title} by ${author}, ${numberOfPages} pages, ` +
      (wasRead ? "read already" : "not read yet")
    );
  };
}

// let bookData;
let bookObject = {};
let bookToAdd;

function addBook(e) {
  const bookIterator = transformFormValuesToIterator(e);
  transformIteratorToObject(bookIterator);
  createBookFromObject(bookObject);
  addBookToLibrary(bookToAdd);
  showBooksInLibrary(myLibrary);
  closeForm();
}

function transformFormValuesToIterator(e) {
  e.preventDefault();
  const bookDataIterator = new FormData(bookForm);
  for (let entry of bookDataIterator.entries()) {
    console.log(entry);
  }
  return bookDataIterator;
}

function transformIteratorToObject(bookIterator) {
  for (const bookAttributePair of bookIterator.entries()) {
    const attributeName = bookAttributePair[0];
    const attributeValue = bookAttributePair[1];
    bookObject[`${attributeName}`] = attributeValue;
  }
  console.log(bookObject);
}

function createBookFromObject(bookObject) {
  bookToAdd = new Book(
    bookObject.title,
    bookObject.author,
    bookObject.numberOfPages,
    bookObject.wasRead
  );
  console.log(bookToAdd);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  console.log(myLibrary);
}

function showBooksInLibrary(myLibrary) {
  if (myLibrary !== undefined) {
    clearLibraryDisplay();
    iterateAndAppendBooks(myLibrary);
  }
}

function clearLibraryDisplay() {
  while (library.firstChild !== null) {
    library.removeChild(library.lastChild);
  }
}

function iterateAndAppendBooks(myLib) {
  for (let bookIndex = 0; bookIndex < myLib.length; bookIndex++) {
    const bookCard = document.createElement("div");
    bookCard.setAttribute("id", `${bookIndex}`);
    bookCard.textContent = `${myLib[bookIndex].info()}`;
    library.appendChild(bookCard);

    const deleteBookButton = document.createElement("button");
    deleteBookButton.addEventListener("click", (e) => {
      const bookIndex = e.target.parentNode.id;
      const targetBookCard = document.getElementById(`${bookIndex}`);
      myLibrary.splice(`${bookIndex}`, 1);
      console.log(myLibrary);
      targetBookCard.remove();
    });
    deleteBookButton.textContent = "DELETE";
    bookCard.appendChild(deleteBookButton);
  }
}

function addBookDeleteButton() {}

function closeForm() {
  bookDialog.close();
}

function openBookForm() {
  resetForm();
  bookDialog.showModal();
}

function resetForm() {
  bookForm.reset();
}

const library = document.querySelector("#library");

const btnNewBook = document.createElement("button");
btnNewBook.textContent = "NEW BOOK";
btnNewBook.addEventListener("click", openBookForm);
document.body.appendChild(btnNewBook);

const bookDialog = document.querySelector("#bookDialog");
const bookForm = document.querySelector("form");

const btnAddBook = document.querySelector("#addBookButton");
btnAddBook.addEventListener("click", (e) => addBook(e));

showBooksInLibrary(myLibrary);
// bookForm.addEventListener("submit", (e) => addBook(e));
