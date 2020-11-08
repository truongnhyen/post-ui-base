import postApi from './api/postApi.js';
import AppConstants from './appConstants.js';
import utils from './utils.js';

// Global variables
// URLSearchParams()
const params = new URLSearchParams(window.location.search);
const postId = params.get('id');
const isEditMode = !!postId;

const getFormValues = (form) => {
  if (!form) return {};

  const formValues = {};

  // get title
  formValues.title = utils.getValueByElementId('postTitle');

  // get author
  formValues.author = utils.getValueByElementId('postAuthor');

  // get description
  formValues.description = utils.getValueByElementId('postDescription');

  // get hero banner
  formValues.imageUrl = utils.getBackgroundImageByElementId('postHeroImage');

  return formValues;
};

const setFormValues = (post) => {
  // Populate data to post form
  // set title
  utils.setValueByElementId('postTitle', post.title);

  // set author
  utils.setValueByElementId('postAuthor', post.author);

  // set description
  utils.setValueByElementId('postDescription', post.description);

  // set hero banner
  utils.setBackgroundImageByElementId('postHeroImage', post.imageUrl);
};

const handleChangeBannerClick = () => {
  // random number id of picsum from 1 - 1000
  const randomId = 1 + Math.trunc(Math.random() * 1000);

  // image URL
  const imageUrl = `https://picsum.photos/id/${randomId}/${AppConstants.DEFAULT_IMAGE_WIDTH}/${AppConstants.DEFAULT_IMAGE_HEIGHT}`;

  // update hero banner by new image URL
  utils.setBackgroundImageByElementId('postHeroImage', imageUrl);
};

const validateForm = (values) => {
  if (!values) return false;

  let isValid = true;

  // required title
  const isValidTitle = utils.getValueByElementId('postTitle');
  if (!isValidTitle) {
    utils.addClassByElementId('postTitle', ['is-invalid']);
    isValid = false;
  }

  // required author
  const isValidAuthor = utils.getValueByElementId('postAuthor');
  if (!isValidAuthor) {
    utils.addClassByElementId('postAuthor', ['is-invalid']);
    isValid = false;
  }

  return isValid;
};

const handleFormSubmit = async (e) => {
  e.preventDefault();

  const postForm = e.target;
  const formValues = getFormValues(postForm);

  // Validation
  const isValid = validateForm(formValues);
  if (!isValid) return;
  try {
    // ADD/EDIT
    if (isEditMode) {
      formValues.id = postId;

      await postApi.update(formValues);

      alert('Save post successfully!');
    } else {
      const newPost = await postApi.add(formValues);

      alert('Add new post successfully!');

      window.location = `add-edit-post.html?id=${newPost.id}`;
    }
  } catch (error) {
    alert('Failed to save post: ', error);
  }
};

// MAIN
(async function () {
  if (isEditMode) {
    const post = await postApi.get(postId);

    setFormValues(post);

    // show go to detail page link
    const goDetailPageLink = document.querySelector('#goToDetailPageLink');
    if (goDetailPageLink) {
      goDetailPageLink.href = `/post-detail.html?id=${postId}`;
      goDetailPageLink.innerHTML = `<i class="fas fas fa-eye mr-1"></i> Go to detail page`;
    }
  } else {
    handleChangeBannerClick();
  }

  //find and bind change event to change banner post
  const changeBannerButton = document.querySelector('#postChangeImage');
  if (changeBannerButton) {
    changeBannerButton.addEventListener('click', handleChangeBannerClick);
  }

  // Submit form event
  const postForm = document.querySelector('#postForm');
  if (postForm) {
    postForm.addEventListener('submit', handleFormSubmit);
  }
})();
