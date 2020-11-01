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
    bannerPost.style.backgroundImage = `url(${post.imageUrl})`;
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
  // 1. Get id from url params
  const params = new URLSearchParams(window.location.search);
  const postId = params.get('id');

  // 2. Get student list from storage
  // const studentList = JSON.parse(localStorage.getItem("student_list")) || [];

  // 3. Find student based on id
  // const student = studentId ? studentList.find((x) => x.id === +studentId) : {};

  const post = await postApi.get(postId);

  // 4. Render
  renderPost(post);

  // 5. Bind edit link
  const editLinkElement = document.querySelector('#editLink');
  if (editLinkElement) {
    editLinkElement.href = `/add-edit-student.html?id=${studentId}`;
  }
};

main();
