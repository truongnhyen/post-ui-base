'use strict';
import AppConstants from './appConstants.js';
import postApi from './api/postApi.js';

// -----------------------
// MAIN LOGIC
// -----------------------
const init = async () => {
  try {
    // Render loading

    const postList = await postApi.getAll();
    console.log(postList);
  } catch (error) {
    console.log(error);
  }
};

init();
