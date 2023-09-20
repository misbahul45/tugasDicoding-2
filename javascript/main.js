class BookLibrary {
    constructor() {
        this.formBook = document.querySelector(".form-book");
        this.readBooks = document.querySelector(".read-books");
        this.endBooks = document.querySelector(".ends-books");
        this.inputSearchBook=document.querySelector(".search-input")
        this.arrayBooks = [];
    }
    ruleDisplayBook(book){
        if (book.isFinished === true) {
            this.endBooks.innerHTML += `<div id="${book.id}" class="book-raks">
            <div class="file-title">
                <h1>${book.bookTitle}</h1>
            </div>
            <p>Genre : <span>${book.bookGenre}</span></p>
            <p>Penulis : <span>${book.bookAuthor}</span></p>
            <p>Tahun : <span>${book.year}</span></p>
            <div class="book-check">
                <div class="check-input">
                    <p class="checklist">Finished Reading</p>
                    <input type="checkbox" name="isfinished" checked id=${book.id}>
                </div>
                <div class="edit">
                    <p>Edit Content</p>
                    <i class="fa fa-edit" id=${book.id}></i>
                </div>
                <div class="del">
                    <i class="fa fa-trash" id=${book.id}></i>
                    <p class="delete">Delete Book</p>
                </div>
            </div>
        </div>`;
        }else{
            this.readBooks.innerHTML +=`<div class="book-raks">
                <div class="file-title">
                    <h1>${book.bookTitle}</h1>
                </div>
                <p>Genre : <span>${book.bookGenre}</span></p>
                <p>Penulis : <span>${book.bookAuthor}</span></p>
                <p>Tahun : <span>${book.year}</span></p>
                <div class="book-check">
                    <div class="check-input">
                        <p class="checklist">Finished Reading</p>
                        <input type="checkbox" name="isfinished"  id=${book.id} >
                    </div>
                    <div class="edit">
                        <p>Edit Content</p>
                        <i class="fas fa-edit" id=${book.id}></i>
                    </div>
                    <div class="del">
                        <i class="fa fa-trash" id=${book.id}></i>
                        <p class="delete">Delete Book</p>
                    </div>
                </div>
            </div>`
        }
    }
    ruleFormEdit(item) {
        const number = /[0-9]/;
        const alphabet = /[a-zA-Z]/;
        this.arrayBooks=JSON.parse(localStorage.getItem("arrayBooks"));
        const formEdit=document.querySelector(".form-edit");
        formEdit.style.transform="translateY(0)"
        setTimeout(() => {
            formEdit.style.transform = "1";
        },500)
        formEdit.bookTitle.value = item.bookTitle;
        formEdit.bookAuthor.value = item.bookAuthor;
        formEdit.bookGenre.value = item.bookGenre;
        formEdit.published.value = item.year;
        formEdit.check.checked = item.isFinished;

        formEdit.addEventListener("click",(e)=>{
            if(e.target.classList.contains("fa-times")){
                formEdit.style.transform="translateY(-800px)"
                setTimeout(() => {
                    formEdit.style.transform = "0";
                },500)
            }
        })
        formEdit.addEventListener("submit",(e)=>{
            e.preventDefault();
            if(e.target.bookTitle.value === "" || e.target.bookAuthor.value === "" || e.target.published.value === "" || e.target.bookGenre.value === ""){
                alert("Please Fill the Form");
            }else if(number.test(e.target.bookGenre.value)){
                e.target.bookGenre.value = "";
                alert("The book genre must be text")
            }else if(alphabet.test(e.target.published.value)){
                e.target.published.value = "";
                alert("The book year must be number");
            }else{
            const indexBook=this.arrayBooks.findIndex((book)=>book.id===item.id)  
            this.arrayBooks[indexBook].bookTitle=e.target.bookTitle.value;
            this.arrayBooks[indexBook].bookAuthor=e.target.bookAuthor.value;
            this.arrayBooks[indexBook].bookGenre=e.target.bookGenre.value;
            this.arrayBooks[indexBook].year=e.target.published.value;
            this.arrayBooks[indexBook].isFinished=e.target.check.checked;
            localStorage.setItem("arrayBooks", JSON.stringify(this.arrayBooks));
            this.addBooksLibarary()
            formEdit.style.transform="translateY(-800px)"
            setTimeout(() => {
                formEdit.style.transform = "0";
            },500)
            this.handleDisabeledCheck()
            }
        })
    }
    
    handleDisabeledCheck(){
        const allCheckboxEndBook=this.endBooks.querySelectorAll("input[type='checkbox']");
        allCheckboxEndBook.forEach((checkbox)=>{
             checkbox.disabled=true
        })
    }
    handleEdit(){
            this.readBooks.addEventListener("click", (e) => {
                if (e.target.classList.contains("fa-edit")) {
                    const bookId = e.target.id;
                    const targetBook=this.arrayBooks.find((book) => book.id === bookId)
                    this.ruleFormEdit(targetBook)
                }
            });
            this.endBooks.addEventListener("click", (e) => {
                if (e.target.classList.contains("fa-edit")) {
                    const bookId = e.target.id;
                    const targetBook=this.arrayBooks.find((book) => book.id === bookId)
                    this.ruleFormEdit(targetBook)
                }
            })
    }
    
    handleFinished() {
         const newArrayBooks = JSON.parse(localStorage.getItem("arrayBooks"));
         this.readBooks.addEventListener("click", (e) => {
            if (e.target.type === "checkbox") {
                const bookId = e.target.id;
                const bookIndex=newArrayBooks.findIndex((book)=>book.id===bookId);
                if(bookIndex!==-1){
                    newArrayBooks[bookIndex].isFinished=true;
                    localStorage.setItem("arrayBooks", JSON.stringify(newArrayBooks));
                    this.arrayBooks = newArrayBooks;
                }
                this.addBooksLibarary()
                this.handleDisabeledCheck()
            }
        });
        this.handleDisabeledCheck()
    }
    handleDelete(){
        this.arrayBooks = JSON.parse(localStorage.getItem("arrayBooks"));
        this.readBooks.addEventListener("click", (e) => {
            if (e.target.classList.contains("fa-trash")) {
                const bookId = e.target.id;
                this.arrayBooks=this.arrayBooks.filter((book)=>book.id!==bookId);
                localStorage.setItem("arrayBooks", JSON.stringify(this.arrayBooks));
                this.addBooksLibarary()
            }
        });
        this.endBooks.addEventListener("click", (e) => {
            if (e.target.classList.contains("fa-trash")) {
                const bookId = e.target.id;
                this.arrayBooks=this.arrayBooks.filter((book)=>book.id!==bookId);
                localStorage.setItem("arrayBooks", JSON.stringify(this.arrayBooks));
                this.addBooksLibarary()    
            }
        })
    }

    handleSearch(){
        this.arrayBooks = JSON.parse(localStorage.getItem("arrayBooks"));
        this.inputSearchBook.addEventListener("keyup", (e) => {
            const searchBook=e.target.value.toLowerCase()
            this.readBooks.innerHTML="";
            this.endBooks.innerHTML="";
            this.arrayBooks.map((book)=>{
                if(book.bookTitle.toLowerCase().includes(searchBook)){
                     this.ruleDisplayBook(book)
                }
            })
            this.handleDisabeledCheck()
        })
    }
    addBooksLibarary() {
        this.readBooks.innerHTML = "";
        this.endBooks.innerHTML = "";
        const newArrayBooks = JSON.parse(localStorage.getItem("arrayBooks"));
        newArrayBooks.map((book) => {
            this.ruleDisplayBook(book);
        })
    }

    saveBooks() {
        const number = /[0-9]/;
        const alphabet=/[a-zA-Z]/
        this.formBook.addEventListener("submit", (e) => {
            e.preventDefault();
            if(e.target.bookTitle.value === "" || e.target.bookAuthor.value === "" || e.target.published.value === "" || e.target.bookGenre.value === "") {
                alert("Please Fill the Form");
            }else if(number.test(e.target.bookGenre.value)){
                alert("The book genre must be text")
                e.target.bookGenre.value = "";
            }else if(alphabet.test(e.target.published.value)){
                alert("The book year must be number");
                e.target.published.value = "";
            }else{
            this.arrayBooks.push({
                id: `${Date.now()}`,
                bookTitle: e.target.bookTitle.value,
                bookAuthor: e.target.bookAuthor.value,
                bookGenre: e.target.bookGenre.value,
                year: Number(e.target.published.value),
                isFinished: e.target.check.checked,
            })
            e.target.bookTitle.value = "";
            e.target.bookGenre.value = "";
            e.target.bookAuthor.value = "";
            e.target.published.value = "";
            e.target.check.checked = false;
            localStorage.setItem("arrayBooks", JSON.stringify(this.arrayBooks))
            this.addBooksLibarary()
            this.handleFinished()
            this.handleSearch()
            this.handleDelete()
            this.handleEdit();
        }
        })
    }
}

const library = new BookLibrary();
library.saveBooks();

window.onload=function(){
    library.addBooksLibarary()
    library.handleFinished()
    library.handleSearch()
    library.handleDelete()
    library.handleEdit()
}