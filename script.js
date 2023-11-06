let myLibrary = [];
let bookObject = {};
let bookToAdd;

const libraryContainer = document.querySelector("#library-container");

const newBookButton = createButton(
  "NEW BOOK",
  "new-book-button",
  "click",
  openBookForm,
  document.querySelector("main")
);

const bookDialog = document.querySelector("#bookDialog");
const bookForm = document.querySelector("form");

const btnAddBook = document.querySelector("#addBookButton");
btnAddBook.addEventListener("click", (e) => addBook(e));

function createBook(title, author, numberOfPages, wasRead) {
  let readState = wasRead === "true" ? true : false;

  const pages = numberOfPages + " pages";
  const readInfo = () => (readState ? "read already" : "not read yet");

  const info = () => `${title} by ${author}, ${pages}, ${readInfo()}`;
  const switchReadState = () => (readState = !readState);
  const getReadButtonContent = () => (readState ? "Not Read" : "Read");

  return { info, switchReadState, getReadButtonContent };
}

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
  console.log(bookToAdd.getReadButtonContent());
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
    const bookCard = createBookCard(bookIndex).element;
    const targetBook = myLibrary[bookIndex];
    const bookReadStatus = targetBook.getReadButtonContent();

    createButton("DELETE", null, "click", (e) => deleteBookCard(e), bookCard);
    const toggleReadStatusButton = createButton(
      bookReadStatus,
      null,
      "click",
      () =>
        changeBookCardReadState(targetBook, toggleReadStatusButton, bookCard),
      bookCard
    );
  }
}

function deleteBookCard(e) {
  const bookIndex = e.target.parentNode.id;
  const targetBookCard = document.getElementById(`${bookIndex}`);
  myLibrary.splice(`${bookIndex}`, 1);
  console.log(myLibrary);
  targetBookCard.remove();
}

function changeBookCardReadState(targetBook, readStateButton, bookCard) {
  targetBook.switchReadState();
  console.log(targetBook.getReadButtonContent());
  readStateButton.setContent(targetBook.getReadButtonContent());
  bookCard.firstChild.textContent = targetBook.info();
}

function openBookForm() {
  bookForm.reset();
  bookDialog.showModal();
}

function createButton(
  initialContent,
  id,
  buttonEvent,
  functionExpression,
  parentNode
) {
  const element = document.createElement("button");
  element.textContent = initialContent;
  if (id !== null) {
    element.setAttribute("id", `${id}`);
  }
  element.addEventListener(buttonEvent, functionExpression);
  parentNode.appendChild(element);

  const setContent = (newContent) => {
    element.textContent = newContent;
  };

  return { element, setContent };
}

function createBookCard(bookIndex) {
  const element = document.createElement("div");
  element.classList.add("book-card");
  element.setAttribute("id", `${bookIndex}`);
  element.textContent = `${myLibrary[bookIndex].info()}`;
  libraryContainer.appendChild(element);

  return { element };
}
