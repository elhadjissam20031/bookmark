var nameBookmarkInput = document.getElementById("nameBookmark");
var urlBookmarkInput = document.getElementById("urlBookmark");
var submitBookmark = document.getElementById("submitBookmark");
var bookmarkContainer = [];
if (localStorage.getItem("bookmark") != null) {
  bookmarkContainer = JSON.parse(localStorage.getItem("bookmark"));
  displayBookmark(bookmarkContainer);
}

function checkInputs() {
  var regexUrl = /^(https?:\/\/)?(www\.)?[a-zA-Z]{2,}\.com$/;
  var regexName = /^.{3,}$/;
  if (regexName.test(nameBookmarkInput.value) === true) {
    nameBookmarkInput.classList.add("is-valid");
  } else {
    nameBookmarkInput.classList.remove("is-valid");
  }
  if (regexName.test(nameBookmarkInput.value) === false) {
    nameBookmarkInput.classList.add("is-invalid");
  } else {
    nameBookmarkInput.classList.remove("is-invalid");
  }
  if (regexUrl.test(urlBookmarkInput.value) === true) {
    urlBookmarkInput.classList.add("is-valid");
  } else {
    urlBookmarkInput.classList.remove("is-valid");
  }
  if (regexUrl.test(urlBookmarkInput.value) === false) {
    urlBookmarkInput.classList.add("is-invalid");
  } else {
    urlBookmarkInput.classList.remove("is-invalid");
  }
}

function addBookmark() {
  var bookmark = {
    name: nameBookmarkInput.value,
    url: urlBookmarkInput.value,
  };

  if (
    nameBookmarkInput.classList.contains("is-valid") &&
    urlBookmarkInput.classList.contains("is-valid")
  ) {
    bookmarkContainer.push(bookmark);
    localStorage.setItem("bookmark", JSON.stringify(bookmarkContainer));
    displayBookmark(bookmarkContainer);
    clearInput();
  } else {
    swal.fire(
      "Site Name or Url is not valid, Please follow the rules below :",
      `<ul class="list-unstyled"><li><i class="fa-regular fa-circle-right p-2"></i> Site name must contain at least 3 characters
    </li><li><i class="fa-regular fa-circle-right p-2"></i> Site URL must be a valid one</li></ul>`
    );
  }
}
nameBookmarkInput.addEventListener("keyup", checkInputs);
urlBookmarkInput.addEventListener("keyup", checkInputs);

submitBookmark.addEventListener("click", addBookmark());
function displayBookmark(arr) {
  var content = ``;
  for (var i = 0; i < arr.length; i++) {
    content += `<tr>
    <td>${i + 1}</td>
    <td>${arr[i].name}</td>
    <td><a href="http://${
      arr[i].url
    }" type="link" target="_blank" class="btn btn-visit" > <i class="fa-solid fa-eye pe-2"></i> Visit</a></td>
    <td><button class="btn btn-danger" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
  </tr>`;
  }

  document.getElementById("tableBody").innerHTML = content;
}

function clearInput() {
  nameBookmarkInput.value = "";
  urlBookmarkInput.value = "";
}

function deleteBookmark(bookmarkIndex) {
  bookmarkContainer.splice(bookmarkIndex, 1);
  localStorage.setItem("bookmark", JSON.stringify(bookmarkContainer));

  displayBookmark(bookmarkContainer);
}
//alert
