const myLibrary = [book1, book2];

function Book(title, author, numberOfPages, wasRead) {
  (this.title = title),
    (this.author = author),
    (this.numberOfPages = numberOfPages),
    (this.wasRead = wasRead),
    (this.info = function () {
      return `${title} by ${author}, ${numberOfPages} pages, ` + wasRead
        ? "not read yet"
        : "read already";
    });
}

function addBookToLibrary() {}

function showBooks(books) {}

const btn = document.querySelector("#btn");
btn.addEventListener("click", addBookToLibrary);
