const getDialog = () => document.getElementById("dialog");
const getImgsWrapper = () => document.getElementById("ImG");
const getDialogTitle = () => document.getElementById("dialog_title");
const getDialogImage = () => document.getElementById("dialog_image");
const getDialogCounter = () => document.getElementById("dialog_counter");
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

function init() {
  renderHeaderTitle();
  renderImages();
}

function renderHeaderTitle() {
  const main = document.querySelector("main");
  if (!main) return;
  if (document.querySelector(".header_title")) return;

  main.innerHTML = `<h1 class="header_title">My CodeGram</h1>` + main.innerHTML;
}

function renderImages() {
  const myImgs = getImgsWrapper();
  if (!myImgs) return;
  myImgs.innerHTML = "";
  for (let i = 0; i < imageArray.length; i++) {
    myImgs.innerHTML += `
            <div class="img-card" role="button" tabindex="0" aria-label="${imageTitleArray[i]} öffnen" onclick="openDialog(${i})" onkeydown="handleGalleryKey(event, ${i})">
                <img src="${imageArray[i]}" alt="${imageTitleArray[i]}">
            </div>
        `;
  }
}

function openDialog(index) {
  const myDialog = getDialog();
  if (!myDialog) return;

  currentIndex = index;
  renderDialogContent();
  myDialog.showModal();
}

function closeDialog(event) {
  const myDialog = getDialog();
  if (!myDialog) return;
  myDialog.close();
  event.stopPropagation();
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
  const dialogTitle = getDialogTitle();
  const dialogImage = getDialogImage();
  const dialogCounter = getDialogCounter();
  if (!dialogTitle || !dialogImage || !dialogCounter) return;

  dialogTitle.textContent = imageTitleArray[currentIndex];
  dialogImage.src = imageArray[currentIndex];
  dialogImage.alt = imageTitleArray[currentIndex];
  dialogCounter.textContent = `${currentIndex + 1}/${imageArray.length}`;
}

function handleGalleryKey(event, index) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openDialog(index);
  }
}
