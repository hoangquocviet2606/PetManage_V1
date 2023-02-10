"use strict";
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

const formEl = document.getElementById("container-form");

renderTableData();
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
        <td scope="col"> <i class="bi bi-square-fill" style="color: ${
          petArr[i].color
        }"></i></td>
        <td scope="col"><i class="bi ${
          petArr[i].vaccinated ? `bi-check-circle-fill` : `bi-x-circle-fill`
        }"></i></td>
        <td scope="col"><i class="bi ${
          petArr[i].dewormed ? `bi-check-circle-fill` : `bi-x-circle-fill`
        }"></i></td>
        <td scope="col"><i class="bi ${
          petArr[i].sterilized ? `bi-check-circle-fill` : `bi-x-circle-fill`
        }"></i></td>
      
        <td scope="col">${petArr[i].date}</td>
        <td>
          <button type="button" class="btn btn-warning" onclick="editPet('${
            petArr[i].id
          }')">Edit</button>
        </td>
      </tr>
        `;
  }
  tbody.innerHTML = str;
}
// Edit Function
function editPet(id) {
  formEl.classList.remove("hide");
  const pet = petArr.find((petItem) => petItem.id === id);
  console.log(pet);
  idInput.value = id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  vaccinatedInput.value = pet.vaccinated;
  dewormedInput.value = pet.dewormed;
  sterilizedInput.value = pet.sterilized;
  renderBreed();
  breedInput.value = pet.breed;
}
// Display breed when chose type
typeInput.addEventListener("change", renderBreed);
function renderBreed() {
  breedInput.innerHTML = `<option>Select Breed</option>`;
  const breed = breedArr.filter(
    (breedItem) => breedItem.type === typeInput.value
  );
  breed.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}
// Add submit function
submitBtn.addEventListener("click", submit);
function submit() {
  const data = {};
  // Get data
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
    // Validate Không trường nào thiếu dữ liệu
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
    // validate trường Type
    if (data.type == "Select Type") {
      alert("Please select Type!");
      return false;
    }
    // validate trường breed
    if (data.breed == "Select Breed") {
      alert("Please select Breed!");
      return false;
    }
    // validate trường Age
    if (data.age > 15 || data.age < 1) {
      alert("Age must be between 1 and 15!");
      return false;
    }
    // validate trường weight
    if (data.weight > 15 || data.weight < 1) {
      alert("Weight must be between 1 and 15!");
      return false;
    }
    // validate trường length
    if (data.length > 100 || data.length < 1) {
      alert("Length must be between 1 and 100!");
      return false;
    }
    return ketqua;
  }
  if (validate) {
    const index = petArr.findIndex((pet) => pet.id === data.id);
    data.date = petArr[index].date;
    petArr[index] = data;

    saveToStorage("petArr", petArr);
    formEl.classList.add("hide");
    renderTableData();
  }
}
