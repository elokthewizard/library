const myLibrary = [];
const content = document.querySelector(".content");
const table = document.querySelector('table');

function Book(Title, Author, Pages, Status) {
  this.Title = Title
  this.Author = Author
  this.Pages = Pages
  this.Status = Status
};

// update page display
function updateDisplay() {
  
  // make sure table is clear
  table.textContent = ""

  // create header / info
  const tableHeader = myLibrary[0]
  for (info in tableHeader) {
      const th = document.createElement('th');
      th.textContent = info
      table.appendChild(th)
  };
  
  // make a row for each book
  let bookNum = 1;
  myLibrary.forEach(book => {
    const tr = document.createElement('tr');

    const button = document.createElement('button');
    
    // add each value to a cell and give each row a button
    for(const metaData in book) {
      const td = document.createElement('td');
      td.textContent = book[metaData];
      tr.appendChild(td);
    };

    
    // add rows and buttons to the table, table to page
    const buttonCell = document.createElement('td');
    tr.appendChild(buttonCell);
    buttonCell.appendChild(button).setAttribute('id', 'deleteButton');
    table.appendChild(tr).setAttribute("data-id", bookNum);
    bookNum++;
    let tableCap = document.querySelector('table').createCaption();
    tableCap.innerText = "My Library!";
    content.appendChild(table);  
    });
  
  //attach delete message to all buttons
  const deleteButtons = document.querySelectorAll('#deleteButton');
  
  deleteButtons.forEach(deleteButton => {
    deleteButton.innerText = 'X';
    deleteButton.addEventListener('click', (e) => {
      const row = e.target.closest('tr');
      myLibrary.splice((row.getAttribute('data-id')) -1, 1);
      console.log("deleting " + row.getAttribute('data-id'));
      updateDisplay();
    });
  });
};

function addToLibrary(book) {
    myLibrary.push(book);
    updateDisplay();
};

// sample books
const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, "unread");
const endersGame = new Book("Ender's Game", "Orson Scott Card", 324, "unread")
const catInTheHat = new Book("The Cat in the Hat", "Dr. Suess", 20, "read")

addToLibrary(theHobbit);
addToLibrary(endersGame);
addToLibrary(catInTheHat);
addToLibrary(new Book("Harry Potter", "J.K. Simmons", 12, "read"));

// dialog handling
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const submitButton = document.querySelector("#new-book");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

submitButton.addEventListener("click", (e) => {
  dialog.close();
});

// select form and pull data:
const newBookForm = document.querySelector('form');

newBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (newBookForm.value !== '') {
    addToLibrary(new Book(
      title = newBookForm.title.value,
      author = newBookForm.author.value,
      pages = newBookForm.pages.value,
      read = newBookForm.read.value))
      newBookForm.reset()
    }
});

// change read status:
content.addEventListener('click', (e) => {
  if (e.target === 'th') {
    return false;
  } else if(e.target.textContent === "read") {
      e.target.textContent = "unread";
      
  } else if (e.target.textContent === "unread") {
      e.target.textContent = "read";
  };
});


