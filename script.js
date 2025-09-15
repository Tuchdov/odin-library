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

        let btnDelete = document.createElement('button');
        btnDelete.classList.add('delete-button');
        btnDelete.textContent = 'Delete';
        bookDiv.appendChild(btnDelete);
    });
}

function addBookToLibrary(title,author,pages,isRead) {
  // take params, create a book, then store it in the array
  let newBook = new Book(title,author,pages,isRead);
  myLibrary.push(newBook);
  displayBooks();
};

// addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);

// add form and button finctionality

let btnAddBook = document.querySelector('#new-book-btn');
let dialog = document.querySelector('#dialog');

btnAddBook.addEventListener('click', ()=>{
    dialog.showModal();
})

let formBook = document.querySelector('#new-book-form');
let title = document.querySelector('#title');
let author = document.querySelector('#author');
let isRead = document.querySelector('#isRead');
let pages = document.querySelector('#pages');
formBook.addEventListener('submit', (event) => {
    // stop page from reloading
    event.preventDefault();

    // get the form data
    let titleValue =  title.value ;
    let authorValue = author.value;
    let isReadValue = isRead.checked;
    let pagesValue = pages.value;

    // add new book to library
    addBookToLibrary(titleValue,authorValue,pagesValue,isReadValue);
    // reset the form and close the dialog
    formBook.reset();
    dialog.close();
});

// I need to create a thing that when you click it. this will delete a book from the library
// Inside the book there will be a buttom that deletes the book when clicked.
// plan: create a button in the book that has an event listener that on click removes the book with the relevant item id from the query.
btnDelete.addEventListener('click',(e)=>{
    const parent = e.target.parentElement;
    const idToDelete = parent.getAttribute('data-book-id');
    myLibrary = myLibrary.filter( (book) => book.id !== idToDelete);
    // delete the bookdiv with this attribute
    displayBooks();
} );

// This listener goes on the main container for all the books
bookContainer.addEventListener('click', (e) => {
    // We'll put our logic in here
        
    if (e.target.classList.contains('delete-button')){
        const parent = e.target.parentElement;
        const idToDelete = parent.getAttribute('data-book-id');
        myLibrary = myLibrary.filter((book) => book.id !== idToDelete);
        // delete the bookdiv with this attribute
        displayBooks();

    };
});
