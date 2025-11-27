const users = [
    {
        id: 1,
        firstName: "Daniela",
        age: 29,
        city: "Plovdiv",
        email: "dani@example.com",
        picture: "https://img.wattpad.com/63895d84f3f11796f8d0828bee7a022e16070c63/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f6d4736533368523970666c6358773d3d2d313131303938363035312e313639386430303664376131636138383739353134373937343438342e6a7067"
    }
]

// -----DOM elements-----
const addUserBtn = document.getElementById("add-user-btn");
const modalLayer = document.getElementById("modal-layer");
const addUserForm = document.getElementById("add-user-form");
const cancelBtn = document.getElementById("cancel-btn");

const usersTableBody = document.getElementById("users-table-body");
const infoModalLayer = document.getElementById("info-modal-layer");
const infoPic = document.getElementById("info-pic");
const infoName = document.getElementById("info-name");
const infoAge = document.getElementById("info-age");
const infoCity = document.getElementById("info-city");
const infoEmail = document.getElementById("info-email");
const infoCloseBtn = document.getElementById("info-close-btn");



// -----Render Users Table-----------------------------------------------------
function renderUsers() {
    usersTableBody.innerHTML = "";

    users.forEach((user, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
      <td>${index + 1}</td>
      <td>
        <img src="${user.picture}" width="40" height="40" >
      </td>
      <td>${user.firstName}</td>
      <td>${user.age}</td>
      <td>${user.city}</td>
      <td>${user.email}</td>
      <td>
        <i class="fa-solid fa-circle-info view-icon" data-user-id="${user.id}"></i>
        <i class="fa-solid fa-pen-to-square edit-icon"></i>
        <i class="fa-solid fa-trash delete-icon" data-user-id="${user.id}"></i>
      </td>
        `

        usersTableBody.appendChild(row);
    })
}

window.addEventListener("DOMContentLoaded", renderUsers);
//--------------------------------------------------------------------------------



// -----"Add New User" Modal Management functions---------------------------------
function openModal() {
    modalLayer.classList.remove("hidden");
}
function closeModal() {
    modalLayer.classList.add("hidden");
    addUserForm.reset();
}

addUserBtn.addEventListener("click", openModal);
cancelBtn.addEventListener("click", closeModal);
//--------------------------------------------------------------------------------



// -----Create New User on Form Submission----------------------------------------
addUserForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstNameValue = document.getElementById("firstName").value.trim();
    const ageValue = Number(document.getElementById("age").value);
    const cityValue = document.getElementById("city").value.trim();
    const emailValue = document.getElementById("email").value.trim();
    const pictureValue = document.getElementById("picture").value.trim();

    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        firstName: firstNameValue,
        age: ageValue,
        city: cityValue,
        email: emailValue,
        picture: pictureValue
    }

    users.push(newUser);
    renderUsers();
    closeModal();
})
//--------------------------------------------------------------------------------



// -----"Info" Modal Management functions-----------------------------------------
function openInfoModal(user) {
    infoPic.src = user.picture;
    infoName.textContent = user.firstName;
    infoAge.textContent = user.age;
    infoCity.textContent = user.city;
    infoEmail.textContent = user.email;

    infoModalLayer.classList.remove("hidden");
}
function closeInfoModal() {
    infoModalLayer.classList.add("hidden");
}

infoCloseBtn.addEventListener("click", closeInfoModal);
//--------------------------------------------------------------------------------



// -----User Actions (View / Edit / Delete)---------------------------------------

usersTableBody.addEventListener("click", function (event) {
    // console.log(event);

    //User VIEW
    if (event.target.classList.contains("view-icon")) {
        const userId = Number(event.target.dataset.userId);
        const userFromUsers = users.find(user => user.id === userId); // === !!

        openInfoModal(userFromUsers);
    }
    //User DELETE
    if (event.target.classList.contains("delete-icon")) {
        const userId = Number(event.target.dataset.userId);

        deleteUser(userId);
    }
})

function deleteUser(id) {
    if (!confirm("Are you sure you want to delete this user?")) return;

    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
    }

    renderUsers();
}
//--------------------------------------------------------------------------------