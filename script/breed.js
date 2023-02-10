"use strict";
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

renderTableBreed(breedArr);
//Add Button Submit
submitBtn.addEventListener("click", function () {
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  //validate Form Breed
  const isValid = validate(data);
  if (isValid) {
    breedArr.push(data);
    saveToStorage("breedArr", breedArr);
    renderTableBreed(breedArr);
    deleteForm();
  }
});

function validate(data) {
  let isValidate = true;
  if (breedInput.value.trim().length === 0) {
    alert("Please input");
    isValidate = false;
  }
  if (data.type === "Select Type") {
    alert("Please select type");
    isValidate = false;
  }
  return isValidate;
}
//Delete Form
function deleteForm() {
  breedInput.value = "";
  typeInput.value = "Select Type";
}
// Render Breed
function renderTableBreed() {
  tableBodyEl.innerHTML = "";
  breedArr.forEach(function (breedItem, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td scope ="col">${index + 1}</td>
    <td scope ="col">${breedItem.breed}</td>
    <td scope ="col">${breedItem.type}</td>
    <td >
    <button type = "button"  onclick = "deleteBreed('${
      breedItem.breed
    }')" class="btn btn-danger">Delete</button>
    </td>     
    `;
    tableBodyEl.appendChild(row);
  });
}
//Delete Breed
function deleteBreed(breed) {
  if (confirm("Are you sure?")) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breed === breedArr[i].breed) {
        breedArr.splice(i, 1);
        saveToStorage("breedArr", breedArr);
        renderTableBreed(breedArr);
      }
    }
  }
}
