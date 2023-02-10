"use strict";
const findBtn = document.getElementById("find-btn");
const tbody = document.querySelector("tbody");
const formEl = document.getElementById("container-form");

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
// Render Data
renderTableData(petArr);
findBtn.addEventListener("click", function () {
  let petArrFind = petArr;

  // Find by id
  if (idInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
  }
  // Find by name
  if (nameInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.name.includes(nameInput.value));
  }
  // Find by type
  if (typeInput.value != "Select Type") {
    petArrFind = petArrFind.filter((pet) => pet.type === typeInput.value);
  }
  // Find by breed
  if (breedInput.value != "Select Breed") {
    petArrFind = petArrFind.filter((pet) => pet.breed === breedInput.value);
  }
  // Find by vaccinated
  if (vaccinatedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  }
  // Find by dewormed
  if (dewormedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
  }
  // Find by sterilized
  if (sterilizedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
  }

  renderTableData(petArrFind);
});
function renderTableData(petArr) {
  tbody.innerHTML = "";
  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td scope="row">${pet.id}</td>
        <td>${pet.name}</td>
        <td>${pet.age}</td>
        <td>${pet.type}</td>
        <td>${pet.weight}</td>
        <td>${pet.length}</td>
        <td>${pet.breed}</td>
        <td> <i class="bi bi-square-fill" style="color: ${pet.color}"></i></td>
        <td><i class="bi ${
          pet.vaccinated ? `bi-check-circle-fill` : `bi-x-circle-fill`
        }"></i></td>
        <td><i class="bi ${
          pet.dewormed ? `bi-check-circle-fill` : `bi-x-circle-fill`
        }"></i></td>
        <td><i class="bi ${
          pet.sterilized ? `bi-check-circle-fill` : `bi-x-circle-fill`
        }"></i></td>
      
        <td>${pet.date}</td>
    `;
    tbody.appendChild(row);
  });
}
// Display full breed
renderBreed();

function renderBreed() {
  breedArr.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}
