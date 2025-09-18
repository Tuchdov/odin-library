let myLibrary = [];

function Book(title,author,isRead) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id  = this.id = Date.now().toString() + Math.random().toString(36).slice(2);
    this.title = title;
    this.author = author;
    this.isRead = isRead;

};

Book.prototype.toggleReadStatus = function() {
    // toggle from reading status to true to false and vice versa
    this.isRead = !this.isRead
}

// addBookToLibrary('The Hobbit' ,'J.R.R. Tolkien', 295, false );
// console.log(myLibrary);

const bookContainer = document.querySelector('.book-container');

// Update stats function
const updateStats = () => {
    const totalBooks = myLibrary.length;
    const readBooks = myLibrary.filter(book => book.isRead).length;
    const unreadBooks = totalBooks - readBooks;
    
    document.getElementById('total-books').textContent = totalBooks;
    document.getElementById('read-books').textContent = readBooks;
    document.getElementById('unread-books').textContent = unreadBooks;
};


// This function displays all books in our array on the page
const displayBooks = () => {
    // 1. Clear the container first
    bookContainer.innerHTML ='';
    // 2. I empty add this html
                if (myLibrary.length === 0) {
                bookContainer.innerHTML = `
                    <div class="empty-state fade-in" style="grid-column: 1 / -1;">
                        <i class="fas fa-book-open"></i>
                        <h3>Your library is empty</h3>
                        <p>Start building your personal library by adding your first book. Click the "Add New Book" button to get started!</p>
                    </div>
                `;
                updateStats();
                return;
            }
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

        let btnRead = document.createElement('button');
        btnRead.classList.add('toggle-read-btn');
        bookDiv.appendChild(btnRead);

        let btnDelete = document.createElement('button');
        btnDelete.classList.add('delete-button');
        btnDelete.textContent = 'Delete';
        bookDiv.appendChild(btnDelete);
    });
}

function addBookToLibrary(title,author,isRead) {
  // take params, create a book, then store it in the array
  let newBook = new Book(title,author,isRead);
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
formBook.addEventListener('submit', (event) => {
    // stop page from reloading
    event.preventDefault();

    // get the form data
    let titleValue =  title.value ;
    let authorValue = author.value;
    let isReadValue = isRead.checked;


    // add new book to library
    addBookToLibrary(titleValue,authorValue,isReadValue);
    // reset the form and close the dialog
    formBook.reset();
    dialog.close();
});



// This listener goes on the main container for all the books
bookContainer.addEventListener('click', (e) => {
    // We'll put our logic in here
        
    if (e.target.classList.contains('delete-button')){
        let userConfirmed = confirm('This will permanetely delete the book from the library. Are you sure?')
        if (userConfirmed){        
        const parent = e.target.parentElement;
        const idToDelete = parent.getAttribute('data-book-id');
        myLibrary = myLibrary.filter((book) => book.id !== idToDelete);
        // delete the bookdiv with this attribute
        displayBooks();
    }
    else if (e.target.classList.contains('toggle-read-btn')){
        const perent = e.target.parentElement;
        const idToToggle  = perent.getAttribute('data-book-id');
        relevantBook =  myLibrary.find((book) => book.id === idToToggle);
        relevantBook.toggleReadStatus();
        displayBooks();
    }


    };
});
