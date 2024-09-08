var siteNameInput = document.getElementById("Input1");
var siteUrlInput = document.getElementById("Input2");

var updateIndex;
var bookMarkArray = [];

if (localStorage.getItem("Data") != null) {
  bookMarkArray = JSON.parse(localStorage.getItem("Data"));
  displayBookMark();
}

function saveBookMark() {
  if (validateInputs()) {
    if (document.getElementById("vip").innerHTML == "Submit") {
      var bookMarkObject = {
        name: siteNameInput.value,
        link: siteUrlInput.value,
      };

      bookMarkArray.push(bookMarkObject);
      console.log(bookMarkArray);
    } else if (document.getElementById("vip").innerHTML == "Update") {
      bookMarkArray[updateIndex].name = siteNameInput.value;
      bookMarkArray[updateIndex].link = siteUrlInput.value;
      document.getElementById("vip").innerHTML = "Submit";
    }

    clearInputs();
    displayBookMark();

    localStorage.setItem("Data", JSON.stringify(bookMarkArray));
  }
}

function clearInputs() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}

function displayBookMark() {
  var allBookMarks = "";

  for (var i = 0; i < bookMarkArray.length; i++) {
    allBookMarks += `
        <tr>
        <td id="columnWidth1">${i + 1}</td>
        <td id='columnWidth'>${bookMarkArray[i].name}</td>
        <td id='columnWidth'><button onclick="VisitLink(${i})" class="btn btn1 text-white"><i class="fa-regular fa-eye"></i>Visit</button></td>
        <td id='columnWidth'><button onclick="deleteBookMark(${i})" class="btn btn2 text-white"><i class="fa-solid fa-trash-can"></i>Delete</button></td>
        <td id='columnWidth'><button onclick="updateBookMark(${i})" class="btn btn2 text-white"><i class="fa-solid fa-trash-can"></i>Update</button></td>
        </tr>
        `;
  }

  document.getElementById("tableBody").innerHTML = allBookMarks;
}

function VisitLink(idx) {
  window.open(`https://${bookMarkArray[idx].link}`);
}

function deleteBookMark(idx) {
  bookMarkArray.splice(idx, 1);
  displayBookMark();
  localStorage.setItem("Data", JSON.stringify(bookMarkArray));
}

function validateInputs() {
  var siteNameRegex = /^[\w]{1,}$/;
  var siteUrlRegex =
    /^www.[\w]{1,256}.(com|co|net|io|blog|shop|ai|me|biz|org)$/;

  if (siteNameRegex.test(siteNameInput.value) == false) {
    return alert("Site name is required");
  } else if (siteUrlRegex.test(siteUrlInput.value) == false) {
    return alert("Site Url should be like this: www.email@example.com");
  }

  return true;
}

function updateBookMark(idx) {
  siteNameInput.value = bookMarkArray[idx].name;
  siteUrlInput.value = bookMarkArray[idx].link;
  document.getElementById("vip").innerHTML = "Update";
  updateIndex = idx;
}
