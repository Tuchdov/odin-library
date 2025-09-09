let myLibrary = [];

function Book(title,author,pages,isRead) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id  = this.id = Date.now().toString() + Math.random().toString(36).slice(2);
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

};

function addBookToLibrary(title,author,pages,isRead) {
  // take params, create a book, then store it in the array
  let newBook = new Book(title,author,pages,isRead);
  myLibrary.push(newBook);
  displayBooks();
};

// addBookToLibrary('The Hobbit' ,'J.R.R. Tolkien', 295, false );
// console.log(myLibrary);

const bookContainer = document.querySelector('.book-container');


// This function displays all books in our array on the page
const displayBooks = () => {
    // 1. Clear the container first
    bookContainer.innerHTML ='';
    // 2. Loop over the library and create a card for each book
    myLibrary.forEach((book) => {
        let bookDiv = document.createElement('div');
        bookDiv.setAttribute('data-book-id', book.id);
        bookDiv.classList.add( 'book-card');

        let title = document.createElement('p');
        title.textContent = `Title: ${book.title}`;

        let author = document.createElement('p');
        author.textContent = `by ${book.author}`

        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookContainer.appendChild(bookDiv);
       
    });
}

// addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);

// 