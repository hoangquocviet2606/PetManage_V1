"use strict";
// Toggle class active when click on navbar
const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
sidebarTitleEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});
//Check click
function click() {
  console.log("clicked");
}
// Selecting elements
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tbody = document.querySelector("tbody");
//Creat Array
const petArr = [];
//Add event
submitBtn.addEventListener("click", submit);
// Get data
function submit() {
  const data = {};
  data.id = idInput.value;
  data.name = nameInput.value;
  data.age = ageInput.value;
  data.type = typeInput.value;
  data.weight = weightInput.value;
  data.length = lengthInput.value;
  data.color = colorInput.value;
  data.breed = breedInput.value;
  data.vaccinated = vaccinatedInput.checked;
  data.dewormed = dewormedInput.checked;
  data.sterilized = sterilizedInput.checked;
  data.vaccinatedClass = vaccinatedInput.checked == true ? "bi-check" : "bi-x";
  data.dewormedClass = dewormedInput.checked == true ? "bi-check" : "bi-x";
  data.sterilizedClass = sterilizedInput.checked == true ? "bi-check" : "bi-x";
  // get Date Time
  let myYear = new Date().getFullYear();
  let myMonth = new Date().getMonth() + 1;
  let preMonth = myMonth < 10 ? "0" : "";
  let myDate = new Date().getDate();
  let preDate = myDate < 10 ? "0" : "";
  data.date = `${preDate}${myDate}/${preMonth}${myMonth}/${myYear}`;
  //Validate
  const validate = validateData(data);
  function validateData(data) {
    let ketqua = true;
    if (
      data.id == "" ||
      data.name == "" ||
      data.age == "" ||
      data.weight == "" ||
      data.length == ""
    ) {
      alert("Please input data");
      return false;
    }
    for (let i = 0; i < petArr.length; i++) {
      if (data.id == petArr[i].id) {
        alert("ID already exist ");
        return false;
      }
    }
    if (data.type == "Select Type") {
      alert("Please select Type!");
      return false;
    }
    if (data.breed == "Select Breed") {
      alert("Please select Breed!");
      return false;
    }
    if (data.age > 15 || data.age < 1) {
      alert("Age must be between 1 and 15!");
      return false;
    }
    if (data.weight > 15 || data.weight < 1) {
      alert("Weight must be between 1 and 15!");
      return false;
    }
    if (data.length > 100 || data.length < 1) {
      alert("Length must be between 1 and 100!");
      return false;
    }
    return ketqua;
  }
  if (validate) {
    petArr.push(data);
    clearInput();
    renderTableData();
  }
}
//Clear Input
const clearInput = () => {
  document.forms[0].reset();
};
//Render
function renderTableData() {
  var str = ``;
  for (let i = 0; i < petArr.length; i++) {
    str += `
      <tr>
      <td scope="col">${petArr[i].id}</td>
      <td scope="col">${petArr[i].name}</td>
      <td scope="col">${petArr[i].age}</td>
      <td scope="col">${petArr[i].type}</td>
      <td scope="col">${petArr[i].weight}</td>
      <td scope="col">${petArr[i].length}</td>
      <td scope="col">${petArr[i].breed}</td>
      <td scope="col"> <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i></td>
      <td scope="col"><i class="bi ${petArr[i].vaccinatedClass}-circle-fill"></i></td>
      <td scope="col"><i class="bi ${petArr[i].dewormedClass}-circle-fill"></i></td>
      <td scope="col"><i class="bi ${petArr[i].sterilizedClass}-circle-fill"></i></td>
      <td scope="col">?</td>
      <td scope="col">${petArr[i].date}</td>
      <td>
        <button type="button" class="btn btn-danger" onclick="deletePet('${petArr[i].id}')">Delete</button>
      </td>
    </tr>
      `;
  }
  tbody.innerHTML = str;
}
//Deleta Event
const deletePet = (petId) => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        petArr.splice(i, 1);
        renderTableData();
      }
    }
  }
};
//Show Healthy Pet
const btnHealthy = document.getElementById("healthy-btn");
btnHealthy.addEventListener("click", function () {
  const healthyPetArr = petArr.filter(
    (pet) =>
      pet.vaccinated == true && pet.dewormed == true && pet.sterilized == true
  );
  function renderHealthyPet() {
    var str = ``;
    for (let i = 0; i < healthyPetArr.length; i++) {
      str += `
        <tr>
        <td scope="col">${healthyPetArr[i].id}</td>
        <td scope="col">${healthyPetArr[i].name}</td>
        <td scope="col">${healthyPetArr[i].age}</td>
        <td scope="col">${healthyPetArr[i].type}</td>
        <td scope="col">${healthyPetArr[i].weight}</td>
        <td scope="col">${healthyPetArr[i].length}</td>
        <td scope="col">${healthyPetArr[i].breed}</td>
        <td scope="col"> <i class="bi bi-square-fill" style="color: ${healthyPetArr[i].color}"></i></td>
        <td scope="col"><i class="bi ${healthyPetArr[i].vaccinatedClass}-circle-fill"></i></td>
        <td scope="col"><i class="bi ${healthyPetArr[i].dewormedClass}-circle-fill"></i></td>
        <td scope="col"><i class="bi ${healthyPetArr[i].sterilizedClass}-circle-fill"></i></td>
        <td scope="col">?</td>
        <td scope="col">${healthyPetArr[i].date}</td>
        <td>
          <button type="button" class="btn btn-danger" onclick="deletePet('${healthyPetArr[i].id}')">Delete</button>
        </td>
      </tr>
        `;
    }
    tbody.innerHTML = str;
  }
  if (btnHealthy.innerText === "Show Healthy Pet") {
    btnHealthy.innerText = "Show All Pet";
    renderHealthyPet();
  } else {
    btnHealthy.innerText = "Show Healthy Pet";
    renderTableData();
  }
});
