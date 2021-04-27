// script.js

// Importing DOM configs from config.js
import {
  imageInput,
  userImage,
  generateMeme,
  submitBtn,
  clearBtn,
  readBtn,
  volIcon,
  volSlider
} from './config.js'

const speechUtterance = new SpeechSynthesisUtterance(); // The synthesizer that will produce voice to text
const img = new Image(); // used to load image from <input> and draw to canvas
let submitted = false; // Used to keep track of whether or not a meme has been generated

// Reset the form and page on page refresh
window.addEventListener('DOMContentLoaded', () => {
  clearBtn.click();
  if (submitBtn.getAttribute('disabled')) {
    submitBtn.removeAttribute('disabled');
    clearBtn.setAttribute('disabled', true);
    readBtn.setAttribute('disabled', true);
  }
  volSlider.value = 100;
  speechUtterance.volume = 1;
});

// Fires whenever the object loads a new image (such as with img.src =)
img.addEventListener('load', () => {
  let aspectRatio, context, height, startX, startY, width;
  context = userImage.getContext('2d'); // get the canvas context so you can draw to it

  // Fill the Canvas with black to add borders on non-square images
  clearCanvas(context);
  submitBtn.removeAttribute('disabled');
  clearBtn.setAttribute('disabled', true);
  readBtn.setAttribute('disabled', true);
  context.fillStyle = 'black';
  context.fillRect(0, 0, userImage.width, userImage.height);

  // Get the aspect ratio, used so the picture always fits inside the canvas
  aspectRatio = img.width / img.height;

  // If the apsect ratio is less than 1 it's a verical image
  if (aspectRatio < 1) {
    // Height is the max possible given the canvas
    height = userImage.height;
    // Width is then proportional given the height and aspect ratio
    width = userImage.height * aspectRatio;
    // Start the Y at the top since it's max height, but center the width
    startY = 0;
    startX = (userImage.width - width) / 2;
    // This is for horizontal images now
  } else {
    // Width is the maximum width possible given the canvas
    width = userImage.width;
    // Height is then proportional given the width and aspect ratio
    height = userImage.width / aspectRatio;
    // Start the X at the very left since it's max width, but center the height
    startX = 0;
    startY = (userImage.height - height) / 2;
  }
  // Finally draw the image to the canvas (coords are for the top left corner of the image)
  context.drawImage(img, startX, startY, width, height);
});

// Change the picture dynamically as soon as an image is selected
imageInput.addEventListener('change', () => {
  // Split the filepath so as to just get the image name
  let filename = imageInput.value.split('\\')[imageInput.value.split('\\').length - 1];
  // Split the filename to remove any file extensions for a cleaner alt attribute
  userImage.setAttribute('alt', filename.split('.')[0]);
  // Load in the selected image and draw it to the canvas
  img.src = URL.createObjectURL(imageInput.files[0]);
});

// Adds meme text to the top and bottom of image on form submission
// Students are to complete this section
generateMeme.addEventListener('submit', e => {
  if (submitted) {
    return;
  }

  // Prevent the form from trying to submit the default get request and refreshing the page
  e.preventDefault();
  // Grab the data from the form
  let data = Object.fromEntries(new FormData(generateMeme));
  // Draw the text from the form onto the canvas
  addTextToCanvas(userImage.getContext('2d'), data.textTop, data.textBottom);
  // Toggle submitted to prevent double writing, disable generate button
  submitted = true;
  toggleFormButtons();
});

// Resets the form back to default and clears the canvas
clearBtn.addEventListener('click', () => {
  submitted = false;
  toggleFormButtons();
  clearCanvas(userImage.getContext('2d'));
});

// Changes the slider icon based on volume level
volSlider.addEventListener('input', () => {
  speechUtterance.volume = volSlider.value / 100;
  if (volSlider.value == 0) {
    volIcon.src = 'icons/volume-level-0.svg';
    volIcon.alt = 'Volume Muted';
  } else if (volSlider.value > 0 && volSlider.value <= 33) {
    volIcon.src = 'icons/volume-level-1.svg';
    volIcon.alt = 'Volume Level 1 of 3';
  } else if (volSlider.value > 33 && volSlider.value <= 67) {
    volIcon.src = 'icons/volume-level-2.svg';
    volIcon.alt = 'Volume Level 2 of 3';
  } else {
    volIcon.src = 'icons/volume-level-3.svg';
    volIcon.alt = 'Volume Level 3 of 3';
  }
});

// Takes the current text and vocalizes it
readBtn.addEventListener('click', () => {
  speechSynthesis.speak(speechUtterance);
});

/**
 * Draws the user inputted text to the top and bottom of the canvas image
 * @param {canvas context} context - The canvas context which to draw the text on
 * @param {string} textTop - The top line(s) of text to add to the canvas
 * @param {string} textBottom - The bottom line(s) of text to add to the canvas
 */
function addTextToCanvas(context, textTop, textBottom) {
  // Convert to upper case like the original memes
  textTop = textTop.toUpperCase();
  textBottom = textBottom.toUpperCase();

  // Style the text
  context.font = '40px Sans-serif';
  context.fillStyle = 'white'; // The main white text color
  context.strokeStyle = 'black'; // The black stroke for the text
  context.textAlign = 'center'; // Text emanates from center of photo
  context.lineJoin = 'round'; // Prevents spikes on the text stroke
  context.lineWidth = 5; // How thick to make the stroke

  // Top Text
  context.textBaseline = 'top';
  context.strokeText(textTop, userImage.width / 2, 10);
  context.fillText(textTop, userImage.width / 2, 10);

  // Bottom Text
  context.textBaseline = 'bottom';
  context.strokeText(textBottom, userImage.width / 2, userImage.height - 10);
  context.fillText(textBottom, userImage.width / 2, userImage.height - 10);

  // Add the text to the speech utterance
  speechUtterance.text = `${textTop} ${textBottom}`;
}

/** 
 * Clears everything drawn on the given canvas context
 * @param {canvas context} context - The canvas context which to clear
*/
function clearCanvas(context) {
  context.clearRect(0, 0, userImage.width, userImage.height);
}

/**
 * Toggles enabling / disabled the submit & clear buttons
 */
function toggleFormButtons() {
  if (!submitBtn.getAttribute('disabled')) {
    submitBtn.setAttribute('disabled', true);
    clearBtn.removeAttribute('disabled');
    readBtn.removeAttribute('disabled');
  } else {
    submitBtn.removeAttribute('disabled');
    clearBtn.setAttribute('disabled', true);
    readBtn.setAttribute('disabled', true);
  }
}
