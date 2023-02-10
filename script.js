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

//Add event submit button
submitBtn.addEventListener("click", submit);
function submit() {
  const pet = {};
  // Get data
  pet.id = idInput.value;
  pet.name = nameInput.value;
  pet.age = ageInput.value;
  pet.type = typeInput.value;
  pet.weight = weightInput.value;
  pet.length = lengthInput.value;
  pet.color = colorInput.value;
  pet.breed = breedInput.value;
  pet.vaccinated = vaccinatedInput.checked;
  pet.dewormed = dewormedInput.checked;
  pet.sterilized = sterilizedInput.checked;

  // get Date Time
  let myYear = new Date().getFullYear();
  let myMonth = new Date().getMonth() + 1;
  let preMonth = myMonth < 10 ? "0" : "";
  let myDate = new Date().getDate();
  let preDate = myDate < 10 ? "0" : "";
  pet.date = `${preDate}${myDate}/${preMonth}${myMonth}/${myYear}`;
  //Validate
  const validate = validateData(pet);
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
    //  validate ID không trùng
    for (let i = 0; i < petArr.length; i++) {
      if (data.id == petArr[i].id) {
        alert("ID already exist ");
        return false;
      }
    }
    // validate trường Type
    if (data.type == "Select Type") {
      alert("Please select Type!");
      return false;
    }
    // validate trường Breed
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
    petArr.push(pet);
    clearInput();
    saveToStorage("petArr", petArr);
    renderTableData(petArr);
  }
}
//Clear Input
const clearInput = () => {
  document.forms[0].reset();
};
//Render Data Function
renderTableData(petArr);
function renderTableData(petArr) {
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
        <button type="button" class="btn btn-danger" onclick="deletePet('${
          petArr[i].id
        }')">Delete</button>
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
        saveToStorage("petArr", petArr);
        renderTableData(petArr);
      }
    }
  }
};
//Show Healthy Pet Function
const btnHealthy = document.getElementById("healthy-btn");
//Declare healthy Pet
const healthyPetArr = petArr.filter(
  (pet) =>
    pet.vaccinated == true && pet.dewormed == true && pet.sterilized == true
);
//Add event
btnHealthy.addEventListener("click", function () {
  if (btnHealthy.innerText === "Show Healthy Pet") {
    btnHealthy.innerText = "Show All Pet";
    renderTableData(healthyPetArr);
  } else {
    btnHealthy.innerText = "Show Healthy Pet";

    renderTableData(petArr);
  }
});
