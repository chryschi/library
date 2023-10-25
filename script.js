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

function openBookForm() {
  const bookForm = document.querySelector("#bookForm");
  bookForm.showModal();
}

function addBookToLibrary(userInput) {
  myLibrary.push(userInput);
}

function showBooksInLibrary(myLibrary) {
  for (let i = 0; i < myLibrary.length; i++) {
    const bookCard = document.createElement("div");
    bookCard.setAttribute("id", `${i}`);
    bookCard.textContent = `${myLibrary[i].info()}`;
    document.body.appendChild(bookCard);
  }
}

const btnNewBook = document.createElement("button");
btnNewBook.textContent = "NEW BOOK";
// btnNewBook.addEventListener("click", openForm);
document.body.appendChild(btnNewBook);
