let myLibrary = [];

function createBook(title, author, numberOfPages, wasRead) {
  const pages = numberOfPages + "pages";

  wasRead = wasRead === "true" ? true : false;

  const readInfo = () => (wasRead ? "read already" : "not read yet");

  const info = () => `${title} by ${author}, ${pages}, ${readInfo()}`;
  const switchReadStatus = () => (wasRead = !wasRead);

  return { info, switchReadStatus };
}

let bookObject = {};
let bookToAdd;

function addBook(e) {
  const bookIterator = transformFormValuesToIterator(e);
  transformIteratorToObject(bookIterator);
  createBookFromObject(bookObject);
  addBookToLibrary(bookToAdd);
  showBooksInLibrary(myLibrary);
  bookDialog.close();
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
  bookToAdd = createBook(
    bookObject.title,
    bookObject.author,
    bookObject.numberOfPages,
    bookObject.wasRead
  );
  console.log(bookToAdd.wasRead);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  console.log(myLibrary);
}

function showBooksInLibrary(myLibrary) {
  if (myLibrary !== undefined) {
    clearLibraryDisplay();
    iterateAndDisplayBooks();
  }
}

function clearLibraryDisplay() {
  while (libraryContainer.firstChild !== null) {
    libraryContainer.removeChild(libraryContainer.lastChild);
  }
}

function iterateAndDisplayBooks() {
  for (let bookIndex = 0; bookIndex < myLibrary.length; bookIndex++) {
    setupBookCard(bookIndex);
    const bookCard = selectBookCard(bookIndex);
    setupBookDeleteButton(bookCard);
    setupSwitchReadButton(bookIndex, bookCard);
  }
}

function setupBookCard(bookIndex) {
  const bookCard = document.createElement("div");
  bookCard.setAttribute("id", `${bookIndex}`);
  bookCard.textContent = `${myLibrary[bookIndex].info()}`;
  libraryContainer.appendChild(bookCard);
}
function selectBookCard(bookIndex) {
  return document.getElementById(`${bookIndex}`);
}

function setupBookDeleteButton(bookCard) {
  const deleteBookButton = document.createElement("button");
  deleteBookButton.addEventListener("click", (e) => deleteBookCard(e));
  deleteBookButton.textContent = "DELETE";
  bookCard.appendChild(deleteBookButton);
}

function deleteBookCard(e) {
  const bookIndex = e.target.parentNode.id;
  const targetBookCard = document.getElementById(`${bookIndex}`);
  myLibrary.splice(`${bookIndex}`, 1);
  console.log(myLibrary);
  targetBookCard.remove();
}

function setupSwitchReadButton(bookIndex, bookCard) {
  const switchReadButton = document.createElement("button");
  switchReadButton.textContent = myLibrary[bookIndex].wasRead
    ? "Not Read"
    : "Read";
  console.log(myLibrary[bookIndex].wasRead);
  switchReadButton.addEventListener("click", (e) =>
    changeBookCardReadState(e, switchReadButton)
  );
  bookCard.appendChild(switchReadButton);
}

function changeBookCardReadState(e, switchReadButton) {
  const bookIndex = e.target.parentNode.id;
  const targetBook = myLibrary[bookIndex];
  const bookCard = selectBookCard(bookIndex);

  targetBook.switchReadStatus();
  switchReadButton.textContent = targetBook.wasRead ? "Not Read" : "Read";
  bookCard.firstChild.textContent = targetBook.info();
}

function openBookForm() {
  bookForm.reset();
  bookDialog.showModal();
}

const libraryContainer = document.querySelector("#library-container");

const btnNewBook = document.createElement("button");
btnNewBook.textContent = "NEW BOOK";
btnNewBook.addEventListener("click", openBookForm);
document.body.appendChild(btnNewBook);

const bookDialog = document.querySelector("#bookDialog");
const bookForm = document.querySelector("form");

const btnAddBook = document.querySelector("#addBookButton");
btnAddBook.addEventListener("click", (e) => addBook(e));

// showBooksInLibrary(myLibrary);
