
// // }
var bookmarkName = document.querySelector("#bookmarkName");
var bookmarkURL = document.querySelector("#bookmarkURL");
var bookMarklist;

var submitBtn = document.getElementById("submitBtn");

localStorage.getItem("bookMarklist") == null ? bookMarklist = [] : bookMarklist = JSON.parse(localStorage.getItem("bookMarklist"));
displayBookMark();
// ****************************************************************************************************************************

function localStorageUpdate() {
    localStorage.setItem("bookMarklist", JSON.stringify(bookMarklist));
}


// ****************************************************************************************************************************
submitBtn.addEventListener('click', addBookMark);
function addBookMark() {
    var bookmark = {
        name: bookmarkName.value,
        URL: bookmarkURL.value
    };
    

    if (!validName(bookmarkName.value) || !validURL(bookmarkURL.value)) {
        if (!validName(bookmarkName.value)) {
            bookmarkName.classList.add('is-invalid');
        } else {
            bookmarkName.classList.remove('is-invalid');
        }
    
        if (!validURL(bookmarkURL.value)) {
            bookmarkURL.classList.add('is-invalid');
        } else {
            bookmarkURL.classList.remove('is-invalid');
        }
        lightBoxContainer.classList.replace("d-none", "d-flex");

        return; 
    } else {
        bookmarkName.classList.remove('is-invalid');
        bookmarkURL.classList.remove('is-invalid');
       
    }
    bookMarklist.push(bookmark);
    localStorageUpdate();
    displayBookMark();
    clearInput(); 
}
// ****************************************************************************************************************************
function displayBookMark() {
    var addTable = ``;
    for (var i = 0; i < bookMarklist.length; i++) {
        addTable += `
        <tr>
          <td>${i + 1}</td>
          <td>${bookMarklist[i].name}</td>
          <td><button onclick="visitBookMark(${i})" class="btn btn-warning">Visit</button></td>
          <td><button onclick="deleteBookMark(${i})" class="btn btn-danger">Delete</button></td>
        </tr> `;
    }
    document.getElementById("tableBody").innerHTML = addTable;
}
// ****************************************************************************************************************************
function deleteBookMark(index) {
    bookMarklist.splice(index, 1);
    localStorageUpdate();
    displayBookMark();
}
// ****************************************************************************************************************************

function visitBookMark(index) {
    const url = bookMarklist[index].URL;
    
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        window.open('http://' + url, '_blank');
    } else {
        window.open(url, '_blank');
    }
}

// ****************************************************************************************************************************

function validURL(str) {
    var pattern = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/ ;

    return !!pattern.test(str);
}
// ****************************************************************************************************************************

function validName(str) {
    var pattern = /^\w{3,}(\s+\w+)*$/;

    return !!pattern.test(str);

}

console.log(validName())
function clearInput() {
    bookmarkName.value = '';
    bookmarkURL.value = '';
}
var lightBoxContainer = document.querySelector("#lightBoxContainer");
var lightBox = document.querySelector("#lightBox");
var closeLightBox = document.querySelector("#closeLightBox");



closeLightBox.addEventListener("click", closeLightBoxn);


function closeLightBoxn() {
    lightBoxContainer.classList.replace("d-flex", "d-none");

}
lightBoxContainer.addEventListener("click", function (event) {
    if (event.target != lightBox){
         
         closeLightBoxn() 
         
    }

});

document.addEventListener("keydown", function (event) {
    if (event.key == "Escape") {
        closeLightBoxn();
    }
  });