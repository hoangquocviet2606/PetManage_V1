"use strict";
const btnExport = document.getElementById("export-btn");
const btnImport = document.getElementById("import-btn");
const fileInput = document.getElementById("input-file");

// Add event Export
btnExport.addEventListener("click", function () {
  const isExport = confirm("Are you sure Export");
  if (isExport) {
    saveStaticDataToFile();
  }
});

// Save data
function saveStaticDataToFile() {
  const blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)], {
    type: "application/json",
  });
  //save file
  saveAs(blob, "petData.json");
}
// Add evert Import
btnImport.addEventListener("click", function () {
  if (!fileInput.value) {
    alert("Vui lòng chọn file import");
  } else {
    const isImport = confirm("Bạn chắc chắn import ?");
    if (isImport) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          saveToStorage("petArr", JSON.parse(reader.result));
          alert("Import thành công");
          // const isValidateFile = checkFile(JSON.parse(reader.result));
          // if (isValidateFile) {
          // }
        },
        false
      );
      // Read file
      if (file) {
        reader.readAsText(file);
      }
      fileInput.value = "";
    }
  }
});
