let myDialog = document.getElementById("dialog");
let myImgs = document.getElementById("ImG");
let dialogTitle = null;
let dialogImage = null;
let dialogCounter = null;
let btnClose = null;
let btnPrev = null;
let btnNext = null;
let closeFlashTimeout = null;

let imageArray = [
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

let imageTitleArray = [
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

function renderHeaderTitle() {
  const main = document.querySelector("main");
  if (!main) return;
  if (document.querySelector(".header_title")) return;

  main.innerHTML = `<h1 class="header_title">My CodeGram</h1>` + main.innerHTML;
}

function init() {
  renderHeaderTitle();

  myDialog = document.getElementById("dialog");
  myImgs = document.getElementById("ImG");

  dialogTitle = document.getElementById("dialog_title");
  dialogImage = document.getElementById("dialog_image");
  dialogCounter = document.getElementById("dialog_counter");
  btnClose = document.getElementById("bTnClose");
  btnPrev = document.getElementById("img_arrow_left");
  btnNext = document.getElementById("img_arrow_right");

  if (btnClose) btnClose.onclick = closeDialog;
  if (btnPrev) {
    btnPrev.onclick = prevImage;
    btnPrev.onkeydown = handleArrowKeydown;
  }
  if (btnNext) {
    btnNext.onclick = nextImage;
    btnNext.onkeydown = handleArrowKeydown;
  }
  if (myDialog) myDialog.onclick = handleDialogClick;
  if (myDialog) myDialog.onkeydown = handleDialogKeydown;

  renderImages();
}

function renderImages() {
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
  currentIndex = index;
  renderDialogContent();
  myDialog.showModal();
}

function closeDialog() {
  myDialog.close();
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
  if (!dialogTitle || !dialogImage || !dialogCounter) return;

  dialogTitle.textContent = imageTitleArray[currentIndex];
  dialogImage.src = imageArray[currentIndex];
  dialogImage.alt = imageTitleArray[currentIndex];
  dialogCounter.textContent = `${currentIndex + 1}/${imageArray.length}`;
}

function handleDialogClick(event) {
  if (!myDialog) return;

  if (event.target === myDialog) {
    closeDialog();
    return;
  }

  const clickedButton = event.target.closest(
    "#bTnClose, #img_arrow_left, #img_arrow_right",
  );

  if (!clickedButton) {
    flashCloseButton();
  }
}

function flashCloseButton() {
  if (!btnClose) return;

  btnClose.classList.add("is-flashing");

  if (closeFlashTimeout) {
    clearTimeout(closeFlashTimeout);
  }

  closeFlashTimeout = setTimeout(function () {
    btnClose.classList.remove("is-flashing");
  }, 220);
}

function handleGalleryKey(event, index) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openDialog(index);
  }
}

function handleArrowKeydown(event) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    event.target.click();
  }
}

function handleDialogKeydown(event) {
  if (event.key === "Escape") {
    event.preventDefault();
    closeDialog();
  }
}
