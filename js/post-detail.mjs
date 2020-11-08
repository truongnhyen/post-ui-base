import postApi from './api/postApi.js';
import AppConstants from './appConstants.js';
import utils from './utils.js';

const renderPost = (post) => {
  // Set title tag
  document.title = post.title;

  // Set Title
  utils.setTextByElementId('postDetailTitle', post.title);

  // Set author
  utils.setTextByElementId('postDetailAuthor', post.author);

  // Set created time
  const timeString = utils.formatDate(post.createdAt);
  utils.setTextByElementId('postDetailTimeSpan', ` - ${timeString}`);

  // Set Description
  utils.setTextByElementId('postDetailDescription', post.description);

  // Set image
  utils.setBackgroundImageByElementId('postHeroImage', post.imageUrl);
};

// MAIN
(async function () {
  //Get post id from url params
  const params = new URLSearchParams(window.location.search);
  const postId = params.get('id');

  if (postId) {
    //Fetch post via id
    const post = await postApi.get(postId);

    // Render post detail
    renderPost(post);

    // show edit link
    const editLinkElement = document.querySelector('#goToEditPageLink');
    if (editLinkElement) {
      editLinkElement.href = `/add-edit-post.html?id=${postId}`;
      editLinkElement.innerHTML = `<i class="fas fa-edit"></i> Edit post`;
    }
  }
})();
