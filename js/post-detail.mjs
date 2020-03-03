import postApi from './api/postApi.js';
import utils from './utils.js';

const renderPost = (post) => {
  // Set banner image
  // Set title
  // Set author
  // Set date time
  // Set description
};

const renderEditLink = (post) => {
  const editLink = document.querySelector('#goToEditPageLink');
  if (editLink) {
    editLink.href = `add-edit-post.html?postId=${post.id}`;
    editLink.innerHTML = '<i class="fas fa-edit"></i> Edit post';
  }
};

// -----------------------
// MAIN LOGIC
// -----------------------
const init = async () => {
  try {
    // Retrieve postId from query params
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('postId');
    if (!postId) return;

    // Fetch post detail by id
    const post = await postApi.getDetail(postId);

    // render post
    renderPost(post);

    // update edit link
    renderEditLink(post);

  } catch (error) {
    console.log(error);
  }
};

init();
