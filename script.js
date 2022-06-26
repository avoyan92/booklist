const title = document.getElementById("title");
const author = document.getElementById("author");
const isbn = document.getElementById("isbn");
const addBtn = document.getElementById("add");
const bookLists = document.querySelector(".book-lists");
const modalWindow = document.getElementById("modal");

addBtn.addEventListener("click", createBook);
let changes = JSON.parse(localStorage.getItem("changes")) || [];

console.log(changes);
updateUi();

function updateUi() {
  bookLists.innerHTML = "";

  changes.forEach((li, index) => {
    bookLists.innerHTML += `
        <li class="item" draggable="true">
            <span>${index + 1}</span>
            <span class="content">${li.title}</span>
            <span class="content1">${li.author}</span>
            <span class="content2">${li.isbn}</span>
            <div>
                <button class="redactbtn">Redact</button>
                <button class="removebtn">X</button>
            </div>
        </li>
        `;
  });
  const removeBtns = Array.from(document.querySelectorAll(".removebtn"));
  removeBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => removeItem(index));
  });

  function removeItem(index) {    
    changes = changes.filter((item, i) => i !== index)
    localStorage.setItem("changes", JSON.stringify(changes))
    updateUi()
  }

  const redactBtns = Array.from(document.querySelectorAll(".redactbtn"));

  redactBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => openModal(index));
  });
}

function openModal(index) {
  modalWindow.classList.remove("close");
  const modalTitle = document.getElementById("window-title");
  const modalAuthor = document.getElementById("window-author");
  const modalIsbn = document.getElementById("window-isbn");
  const saveBtn = document.getElementById("save");

  modalTitle.value = changes[index].title;
  modalAuthor.value = changes[index].author;
  modalIsbn.value = changes[index].isbn;

  saveBtn.addEventListener("click", () => {
    changes[index] = {
      title: modalTitle.value,
      author: modalAuthor.value,
      isbn: modalIsbn.value,
    };
    updateUi();
    modalWindow.classList.add("close");
  });
}

function createBook() {
  if (title.value.length < 4 || author.value.length < 4 || isbn.value.length < 4) {
    alert("you must to right more");
  } else {
    changes.push({
      title: title.value,
      author: author.value,
      isbn: isbn.value,
    });
  }

  localStorage.setItem("changes", JSON.stringify(changes));

  updateUi();

  title.value = "";
  author.value = "";
  isbn.value = "";
}
