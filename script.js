// script.js

const img = new Image(); // used to load image from <input> and draw to canvas
const canvas = document.getElementById("user-image");
const ctx = canvas.getContext("2d");
const submit = document.querySelector("[type='submit']");
const clear = document.querySelector("[type='reset']");
const read = document.querySelector("[type='button']");
const volume = document.getElementById('voice-selection');
volume.disabled = false;
// Fires whenever the img object loads a new image (such as with img.src =)
img.addEventListener('load', () => {
  // TODO

  // Some helpful tips:
  // - Fill the whole Canvas with black first to add borders on non-square images, then draw on top
  // - Clear the form when a new image is selected
  // - If you draw the image to canvas here, it will update as soon as a new image is selected


  ctx.clearRect(0, 0, canvas.width, canvas.height);

  submit.disabled = false;
  clear.disabled = true;
  read.disabled = true;


  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  let dimension = getDimmensions(canvas.width, canvas.height, img.width, img.height);
  ctx.drawImage(img, dimension.startX, dimension.startY, dimension.width, dimension.height);
});

const imgInput = document.getElementById('image-input');
imgInput.addEventListener('change', () => {
  const file = imgInput.files[0];
  img.src = URL.createObjectURL(file);
  img.onload = function () {
    URL.revokeObjectURL(img.src);
  };
  img.alt = imgInput.files[0];
})

const form = document.getElementById('generate-meme');
const topText = document.getElementById('text-top');
const bottomText = document.getElementById('text-bottom');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  ctx.fillStyle = "white";
  ctx.font = '50px serif';
  ctx.textAlign = 'center';

  ctx.textBaseline = "top";
  ctx.fillText(topText.value, canvas.width / 2, 10);

  ctx.textBaseline = "bottom";
  ctx.fillText(bottomText.value, canvas.width / 2, 390);

  submit.disabled = true;
  clear.disabled = false;
  read.disabled = false;
})

clear.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  submit.disabled = false;
  clear.disabled = true;
  read.disabled = true;
})


var synth = window.speechSynthesis;
var voiceSelect = document.getElementById('voice-selection');
var voices = [];
function populateVoiceList() {
  voices = synth.getVoices();

  for (let i = 0; i < voices.length; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

    if (voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
}
populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

read.addEventListener('click', () => {
  var topRead = new SpeechSynthesisUtterance(topText.value);
  var bottomRead = new SpeechSynthesisUtterance(bottomText.value);
  var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      topRead.voice = voices[i];
      bottomRead.voice = voices[i];
    }
  }
  topRead.volume = volumeInput.value /100 ;
  bottomRead.volume = volumeInput.value /100;
  synth.speak(topRead);
  synth.speak(bottomRead);
  topText.blur();
  bottomText.blur();
})

const volumeGroup = document.getElementById('volume-group');
const icon = document.querySelector("[src='icons/volume-level-3.svg']");
const volumeInput = document.querySelector("[type='range']");
volumeGroup.addEventListener('input', () => {

  if (volumeInput.value <= 100 & volumeInput.value >= 67) {
    icon.src = "icons/volume-level-3.svg";
  }
  else if (volumeInput.value >= 34 && volumeInput.value <= 66) {
    icon.src = "icons/volume-level-2.svg";
  }
  else if (volumeInput.value >= 1 && volumeInput.value <= 33) {
    icon.src = "icons/volume-level-1.svg";
  }
  else if (volumeInput.value == 0) {
    icon.src = "icons/volume-level-0.svg";
  }
})

/**
 * Takes in the dimensions of the canvas and the new image, then calculates the new
 * dimensions of the image so that it fits perfectly into the Canvas and maintains aspect ratio
 * @param {number} canvasWidth Width of the canvas element to insert image into
 * @param {number} canvasHeight Height of the canvas element to insert image into
 * @param {number} imageWidth Width of the new user submitted image
 * @param {number} imageHeight Height of the new user submitted image
 * @returns {Object} An object containing four properties: The newly calculated width and height,
 * and also the starting X and starting Y coordinate to be used when you draw the new image to the
 * Canvas. These coordinates align with the top left of the image.
 */
function getDimmensions(canvasWidth, canvasHeight, imageWidth, imageHeight) {
  let aspectRatio, height, width, startX, startY;

  // Get the aspect ratio, used so the picture always fits inside the canvas
  aspectRatio = imageWidth / imageHeight;

  // If the apsect ratio is less than 1 it's a verical image
  if (aspectRatio < 1) {
    // Height is the max possible given the canvas
    height = canvasHeight;
    // Width is then proportional given the height and aspect ratio
    width = canvasHeight * aspectRatio;
    // Start the Y at the top since it's max height, but center the width
    startY = 0;
    startX = (canvasWidth - width) / 2;
    // This is for horizontal images now
  } else {
    // Width is the maximum width possible given the canvas
    width = canvasWidth;
    // Height is then proportional given the width and aspect ratio
    height = canvasWidth / aspectRatio;
    // Start the X at the very left since it's max width, but center the height
    startX = 0;
    startY = (canvasHeight - height) / 2;
  }

  return { 'width': width, 'height': height, 'startX': startX, 'startY': startY }
}
