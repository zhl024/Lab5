// script.js

const img = new Image(); // used to load image from <input> and draw to canvas

// Fires whenever the img object loads a new image (such as with img.src =)
img.addEventListener('load', () => {
  // TODO

  // Some helpful tips:
  // - Fill the Canvas with black first to add borders on non-square images, then draw on top
  // - Clear the form when a new image is selected
  // - If you draw the image to canvas here, it will update as soon as a new image is selected
});

// Event listener, changes the picture dynamically as soon as a user selects an image
// TODO

// Event listener, Adds meme text to the top and bottom of image on form submission
// TODO

// Event listener, resets the form back to default and clears the canvas upon button press
// TODO

// Event listener, changes the slider icon based on volume level, simultaneously changes the
// output volume of the vocalizer to match
// TODO

// Event listener, takes the current text and vocalizes it when button is clicked
// TODO

/**
 * Draws the user inputted text to the top and bottom of the canvas image
 * @param {canvas context} context - The canvas context which to draw the text on
 * @param {string} textTop - The top line(s) of text to add to the canvas
 * @param {string} textBottom - The bottom line(s) of text to add to the canvas
 */
function addTextToCanvas(context, textTop, textBottom) {
  // TODO
}

/** 
 * Clears everything drawn on the given canvas context
 * @param {canvas context} context - The canvas context which to clear
*/
function clearCanvas(context) {
  // TODO
}

/**
 * Toggles enabling / disabled the submit & clear buttons
 */
function toggleFormButtons() {
  // TODO
}

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
  // Get the aspect ratio, used so the picture always fits inside the canvas
  let aspectRatio = imageWidth / imageHeight;

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
