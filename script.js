const myDialog = document.getElementById("myDialog");
const myImgWrapper = document.getElementById("myImg");
const myDialogTitle = document.getElementById("dialog_title");
const myDialogImage = document.getElementById("dialog_image");
const myDialogCounter = document.getElementById("dialog_counter");
const imageArray = [
  "./assets/img/img_1.jpg",
  "./assets/img/img_2.png",
  "./assets/img/img_3.jpg",
  "./assets/img/img_4.png",
  "./assets/img/img_5.jpg",
  "./assets/img/img_6.jpg",
  "./assets/img/img_7.jpg",
  "./assets/img/img_8.jpg",
  "./assets/img/img_9.jpg",
  "./assets/img/img_10.jpg",
  "./assets/img/img_11.jpg",
  "./assets/img/img_12.jpg",
];
const imageTitleArray = [
  "JS Code 1",
  "JS Code 2",
  "JS Code 3",
  "JS Code 4",
  "JS Code 5",
  "JS Code 6",
  "JS Code 7",
  "JS Code 8",
  "JS Code 9",
  "JS Code 10",
  "JS Code 11",
  "JS Code 12",
];
let currentIndex = 0;

function myinit() {
  renderImages();
}

function renderImages() {
  if (!myImgWrapper) {
    return;
  }
  let html = "";
  for (let i = 0; i < imageArray.length; i++) {
    html += `
      <div class="img-card" onclick="openDialog(${i})">
        <img src="${imageArray[i]}" alt="${imageTitleArray[i]}">
      </div>`;
  }
  myImgWrapper.innerHTML = html;
}

function openDialog(index) {
  if (!myDialog) return;
  currentIndex = index;
  renderDialogContent();
  myDialog.showModal();
  document.body.style.overflowY = "hidden";
}

function closeDialog(event) {
  if (!myDialog) return;
  myDialog.close();
  document.body.style.overflowY = "auto";
}

function prevImage() {
  currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
  renderDialogContent();
}

function nextImage() {
  currentIndex = (currentIndex + 1) % imageArray.length;
  renderDialogContent();
}

function renderDialogContent() {
  if (!myDialogTitle || !myDialogImage || !myDialogCounter) return;
  myDialogTitle.textContent = imageTitleArray[currentIndex];
  myDialogImage.src = imageArray[currentIndex];
  myDialogImage.alt = imageTitleArray[currentIndex];
  myDialogCounter.textContent = `${currentIndex + 1}/${imageArray.length}`;
}

function handleGalleryKey(event, index) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openDialog(index);
  }
}
