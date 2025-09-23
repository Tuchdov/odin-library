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

    
    myLibrary.forEach((book, index) => {
         // 1. Create the main container for the book card
        let bookDiv = document.createElement('div');
        bookDiv.setAttribute('data-book-id', book.id);
        bookDiv.classList.add('book-card', 'fade-in');
        bookDiv.style.animationDelay = `${index * 0.1}s`;

        // 2. Create and append the book title (h3)
        const title = document.createElement('h3');
        title.textContent = book.title || 'Untitled Book';
        bookDiv.appendChild(title);

        // 3. Create and append the author paragraph (p)
        const author = document.createElement('p');
        author.classList.add('author');
        author.textContent = book.author ? `by ${book.author}` : 'Unknown Author';
        bookDiv.appendChild(author);

    // Step 4: Create book meta container
        let bookMetaDiv = document.createElement('div');
        bookMetaDiv.classList.add('book-meta');

     // Step 5: Create read status span
    let readStatusSpan = document.createElement('span');
    readStatusSpan.classList.add('read-status');
    readStatusSpan.classList.add(book.isRead ? 'read' : 'unread');
    readStatusSpan.textContent = book.isRead ? 'Read' : 'To Read';

    // Step 6: Append read status to meta container, then meta to main div
        bookMetaDiv.appendChild(readStatusSpan);
        bookDiv.appendChild(bookMetaDiv);
    
    // Step 7: Create book actions container
        let bookActionsDiv = document.createElement('div');
        bookActionsDiv.classList.add('book-actions');

      // Step 8: Create toggle read button
        let btnRead = document.createElement('button');
        btnRead.classList.add('toggle-read-btn');
        btnRead.setAttribute('type', 'button');

     // Step 9: Create and append icon for toggle read button
        let toggleIcon = document.createElement('i');
        toggleIcon.classList.add('fas');
        toggleIcon.classList.add(book.isRead ? 'fa-eye-slash' : 'fa-check');
        btnRead.appendChild(toggleIcon);
    
        // Step 10: Add text content to toggle button
        let toggleText = document.createTextNode(book.isRead ? ' Mark as Unread' : ' Mark as Read');
        btnRead.appendChild(toggleText);

        // Step 11: Create delete button
        let btnDelete = document.createElement('button');
        btnDelete.classList.add('delete-button');
        btnDelete.setAttribute('type', 'button');

    // Step 12: Create and append icon for delete button
        let deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash-alt');
        btnDelete.appendChild(deleteIcon);

    // Step 13: Append buttons to actions container
        bookActionsDiv.appendChild(btnRead);
        bookActionsDiv.appendChild(btnDelete);

   //     Step 14: Append actions container to main div
    bookDiv.appendChild(bookActionsDiv);
       
        //  bookDiv.appendChild(btnDelete);
        // bookDiv.appendChild(btnRead);
        bookContainer.appendChild(bookDiv);

        // let btnRead = document.createElement('button');
        // btnRead.classList.add('toggle-read-btn');
        // bookDiv.appendChild(btnRead);

  

    });
}

function addBookToLibrary(title,author,isRead) {
  // take params, create a book, then store it in the array
  let newBook = new Book(title,author,isRead);
  myLibrary.push(newBook);
  displayBooks();
  updateStats();
};

// addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);

// add form and button finctionality

let btnAddBook = document.querySelector('#new-book-btn');
let dialog = document.querySelector('#dialog');
let btnCancelForm = document.querySelector('#cancel-button');

btnAddBook.addEventListener('click', ()=>{
    dialog.showModal();
})

btnCancelForm.addEventListener('click', () => {
    dialog.close();
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
    
    // Find the closest book-card ancestor to the clicked element
    const card = e.target.closest('.book-card');

    // If the click was not inside a card, do nothing
    if (!card) return;

    // Get the ID from the card we found
    const bookId = card.getAttribute('data-book-id');

    // Check if the delete button (or something inside it) was clicked
    if (e.target.closest('.delete-button')) {
        let userConfirmed = confirm('This will permanently delete the book from the library. Are you sure?');
        if (userConfirmed) {
            myLibrary = myLibrary.filter((book) => book.id !== bookId);
            displayBooks(); // Re-render the library
            updateStats();  // Update the stats after deleting
        }
    } 
    // Check if the toggle read button (or something inside it) was clicked
    else if (e.target.closest('.toggle-read-btn')) {
        const relevantBook = myLibrary.find((book) => book.id === bookId);
        if (relevantBook) {
            relevantBook.toggleReadStatus();
            displayBooks(); // Re-render the library
            updateStats();  // Update the stats after toggling
        }
    }
});

 // Initialize the display
displayBooks();
