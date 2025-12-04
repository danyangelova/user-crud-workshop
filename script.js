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
const userForm = document.getElementById("user-form");
const formCancelBtn = document.getElementById("form-cancel-btn");
const usersTableBody = document.getElementById("users-table-body");

const infoModalLayer = document.getElementById("info-modal-layer");
const infoPic = document.getElementById("info-pic");
const infoName = document.getElementById("info-name");
const infoAge = document.getElementById("info-age");
const infoCity = document.getElementById("info-city");
const infoEmail = document.getElementById("info-email");
const infoCloseBtn = document.getElementById("info-close-btn");

const firstNameInput = document.getElementById("firstName");
const ageInput = document.getElementById("age");
const cityInput = document.getElementById("city");
const emailInput = document.getElementById("email");
const pictureInput = document.getElementById("picture");

//Add/Edit mode toggle elements
const modalTitle = document.getElementById("modal-title");
const modalSaveBtn = document.getElementById("modal-save-btn");

// null -> Add mode    /   user id -> edit mode
let editModeUserId = null;



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
        <i class="fa-solid fa-pen-to-square edit-icon" data-user-id=${user.id}></i>
        <i class="fa-solid fa-trash delete-icon" data-user-id="${user.id}"></i>
      </td>
        `

        usersTableBody.appendChild(row);
    })
}

window.addEventListener("DOMContentLoaded", renderUsers);
//--------------------------------------------------------------------------------



// -----Modal Form Management functions------------------------------------------
function openModal() {
    modalLayer.classList.remove("hidden");
}
function closeModal() {
    modalLayer.classList.add("hidden");
    userForm.reset();

    editModeUserId = null;
    modalTitle.textContent = "Add user";
    modalSaveBtn.textContent = "Add user";
}

addUserBtn.addEventListener("click", openModal);
formCancelBtn.addEventListener("click", closeModal);
//--------------------------------------------------------------------------------



// -----Create/Edit User on Form Submission----------------------------------------
userForm.addEventListener("submit", function (event) {
    event.preventDefault();

    //read the values
    const firstNameValue = firstNameInput.value.trim();
    const ageValue = Number(ageInput.value);
    const cityValue = cityInput.value.trim();
    const emailValue = emailInput.value.trim();
    const pictureValue = pictureInput.value.trim();

    //Add mode
    if (editModeUserId === null) {
        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            firstName: firstNameValue,
            age: ageValue,
            city: cityValue,
            email: emailValue,
            picture: pictureValue
        }
        users.push(newUser);
    } else {
        //Edit mode
        const index = users.findIndex(user => user.id === editModeUserId);
        if (index !== - 1) {
            users[index] = {
                id: editModeUserId,
                firstName: firstNameValue,
                age: ageValue,
                city: cityValue,
                email: emailValue,
                picture: pictureValue
            }
        }
    }
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
    const actionIcon = event.target.closest(".view-icon, .edit-icon, .delete-icon");
    if (!actionIcon) return;

    const userID = Number(actionIcon.dataset.userId);

    //User VIEW click
    if (actionIcon.classList.contains("view-icon")) {
        const userFromUsers = users.find(user => user.id === userID); // === !!

        openInfoModal(userFromUsers);
    }
    //User EDIT click
    if (actionIcon.classList.contains("edit-icon")) {
        const userFromUsers = users.find(user => user.id === userID);
        if (!userFromUsers) return;

        //edit mode
        editModeUserId = userID;
        modalTitle.textContent = "Edit user";
        modalSaveBtn.textContent = "Save changes";

        //fill the form
        firstNameInput.value = userFromUsers.firstName;
        ageInput.value = userFromUsers.age;
        cityInput.value = userFromUsers.city;
        emailInput.value = userFromUsers.email;
        pictureInput.value = userFromUsers.picture;

        openModal();
    }
    //User DELETE click
    if (actionIcon.classList.contains("delete-icon")) {
        deleteUser(userID);
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