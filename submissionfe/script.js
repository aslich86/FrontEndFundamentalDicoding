const unfinishedList = document.getElementById('unfinished-list');
const finishedList = document.getElementById('finished-list');

let books = JSON.parse(localStorage.getItem('books')) || [];

function renderBooks() {
    unfinishedList.innerHTML = '';
    finishedList.innerHTML = '';

    books.forEach(book => {
        const li = document.createElement('li');
        li.innerHTML = `${book.title} - ${book.author} (${book.year})`;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Hapus';
        deleteButton.addEventListener('click', () => deleteBook(book.id));
        li.appendChild(deleteButton);

        if (book.isComplete) {
            const undoButton = document.createElement('button');
            undoButton.innerText = 'Undo';
            undoButton.addEventListener('click', () => moveBook(book.id, false));
            li.appendChild(undoButton);
            finishedList.appendChild(li);
        } else {
            const completeButton = document.createElement('button');
            completeButton.innerText = 'Selesai';
            completeButton.addEventListener('click', () => moveBook(book.id, true));
            li.appendChild(completeButton);
            const completeCheckbox = document.createElement('input');
            completeCheckbox.type = 'checkbox';
            completeCheckbox.checked = false;
            completeCheckbox.addEventListener('change', (event) => {
                if (event.target.checked) {
                    moveBook(book.id, true);
                } else {
                    moveBook(book.id, false);
                }
            });
            li.appendChild(completeCheckbox);
            unfinishedList.appendChild(li);
        }
    });
}

function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const isComplete = document.getElementById('is-complete').checked;

    if (title && author && year) {
        const book = {
            id: +new Date(),
            title,
            author,
            year: parseInt(year),
            isComplete
        };
        books.push(book);
        renderBooks();
        saveToLocalStorage();
    }
}

function moveBook(id, isComplete) {
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
        books[index].isComplete = isComplete;
        renderBooks();
        saveToLocalStorage();
    }
}

function deleteBook(id) {
    books = books.filter(book => book.id !== id);
    renderBooks();
    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(books));
}

renderBooks();
