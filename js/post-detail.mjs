import postApi from './api/postApi.js';
import utils from './utils.js';

const renderPost = (post) => {
  const postDetail = document.querySelector('.post-detail');

  // Set Title
  const titlePost = postDetail.querySelector('#postDetailTitle');
  if (titlePost) {
    titlePost.textContent = post.title;
  }

  // Set Description
  const descriptionPost = postDetail.querySelector('#postDetailDescription');
  if (descriptionPost) {
    descriptionPost.textContent = post.description;
  }

  // Set image
  const bannerPost = document.querySelector('#postHeroImage');
  console.log(post.imageUrl);
  if (bannerPost) {
    bannerPost.style.backgroundImage = `url(${post.imageUrl || AppConstants.DEFAULT_HERO_IMAGE_URL})`;
  }

  // Set author
  const authorPost = postDetail.querySelector('#postDetailAuthor');
  if (authorPost) {
    authorPost.textContent = post.author;
  }

  // Set created time
  const timePost = postDetail.querySelector('#postDetailTimeSpan');
  if (timePost) {
    const timeString = utils.formatDate(post.createdAt);
    timePost.textContent = ` - ${timeString}`;
  }
};

const main = async () => {
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
};

main();
