"use strict";
//Add Animation

const sidebarEl = document.getElementById("sidebar");
sidebarEl.addEventListener("click", function () {
  this.classList.toggle("active");
});

// Get data function
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// Save data function
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
// Declare Array
const petArr = getFromStorage("petArr") || [];
const breedArr = getFromStorage("breedArr")|| [];
