import utils from './utils.js';
import postApi from './api/postApi.js';

const randomNumber = () => {
  // random range: 100 - 2000
  const temp = Math.trunc(Math.random() * (2000 - 100));
  return 100 + temp;
};

const randomBannerImage = () => {
  const randomId = randomNumber();
  const bannerUrl = `https://picsum.photos/id/${randomId}/1368/400`;
  utils.setBackgroundImageByElementId('postHeroImage', bannerUrl);
};

const getPostFormValues = () => {
  return {
    title: utils.getValueByElementId('postTitle'),
    author: utils.getValueByElementId('postAuthor'),
    description: utils.getValueByElementId('postDescription'),
    imageUrl: utils.getBackgroundImageByElementId('postHeroImage'),
  };
}

const validatePostForm = (formValues) => {
  let isValid = true;

  // check title
  if (formValues.title.trim() === '') {
    isValid = false;
    utils.addClassByElementId('postTitle', ['is-invalid']);
  }

  // check author
  if (formValues.author.trim() === '') {
    isValid = false;
    utils.addClassByElementId('postAuthor', ['is-invalid']);
  }

  return isValid;
};

const resetValidationErrors = () => {
  utils.removeClassByElementId('postTitle', ['is-invalid']);
  utils.removeClassByElementId('postAuthor', ['is-invalid']);
};

const handlePostFormSubmit = async (e) => {
  e.preventDefault();

  // prevent caching errors from the previous step
  resetValidationErrors();

  // Get form values
  const formValues = getPostFormValues();
  console.log(formValues);

  // Validate form values
  // Required: title + author
  const isValid = validatePostForm(formValues);
  if (!isValid) return;

  try {
    // Call API to create a new post
    const post = await postApi.add(formValues);

    // Inform user: post created
    alert('Add new post successfully');

    // Redirect edit mode
    const editPostUrl = `add-edit-post.html?postId=${post.id}`;
    window.location = editPostUrl;
  } catch (error) {
    alert(`Failed to add new post: ${error}`);
  }
}

// MAIN LOGIC
const init = () => {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get('postId');
  const mode = postId ? 'edit' : 'add';

  if (mode === 'add') {
    randomBannerImage();
  } else {
    // edit mode
    // fetch post
    // fill data
  }

  // Bind events: form submit + change banner img
  const postForm = document.querySelector('#postForm');
  if (postForm) {
    postForm.addEventListener('submit', handlePostFormSubmit);
  }

  const changePostBannerButton = document.querySelector('#postChangeImage');
  if (changePostBannerButton) {
    changePostBannerButton.addEventListener('click', randomBannerImage);
  }
};
init();
