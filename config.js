// config.js

// Storing all of the DOM selectors in a configuration file
// to keep it neat and separate from the rest of the code, easy to manipulate
export const imageInput = document.getElementById('image-input'); // the <input> type file element
export const userImage = document.getElementById('user-image'); // the <canvas> element
export const generateMeme = document.getElementById('generate-meme'); // the <form> element
export const submitBtn = document.querySelector('button[type="submit"]'); // the submit <button>
export const clearBtn = document.querySelector('button[type="reset"]'); // the clear <button>
export const readBtn = document.querySelector('button[type="button"]'); // the read text <button>
export const volIcon = document.querySelector('#volume-group > img'); // the volume icon
export const volSlider = document.querySelector('input[type="range"]'); // the volume slider
