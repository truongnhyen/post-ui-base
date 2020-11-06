import postApi from './api/postApi.js';
import AppConstants from './appConstants.js';
import utils from './utils.js';

const renderPostsList = (postsList) => {
  const postsListContainer = document.querySelector('#postsList');

  postsList.forEach((post) => {
    // Get post template
    const postTemplate = document.querySelector('#postItemTemplate');
    if (!postTemplate) return;

    // Clone post item
    const postItemFromTemplate = postTemplate.content.querySelector('li');
    const newPostItem = postItemFromTemplate.cloneNode(true);
    console.log(newPostItem);

    // Fill data
    // Set Title
    const titlePost = newPostItem.querySelector('#postItemTitle');
    if (titlePost) {
      titlePost.textContent = utils.truncateTextlength(post.title, 30);
    }

    // Set Description
    const descriptionPost = newPostItem.querySelector('#postItemDescription');
    if (descriptionPost) {
      descriptionPost.textContent = utils.truncateTextlength(
        post.description,
        100
      );
    }

    // Set image
    const imagePost = newPostItem.querySelector('#postItemImage');
    if (imagePost) {
      const thumbSrc = post.imageUrl.split('/').slice(0, -2);
      thumbSrc.push('348', '200'); //use smaller size for image 

      imagePost.src = `${thumbSrc.join('/') || AppConstants.DEFAULT_IMAGE_URL}`;
    }

    // Set author
    const authorPost = newPostItem.querySelector('#postItemAuthor');
    if (authorPost) {
      authorPost.textContent = post.author;
    }

    // Set created time
    const timePost = newPostItem.querySelector('#postItemTimeSpan');
    if (timePost) {
      const timeString = utils.formatDate(post.createdAt);
      timePost.textContent = ` - ${timeString}`;
    }

    // Add click event for post item link to post detail
    const postItem = newPostItem.querySelector('.post-item');
    if (postItem) {
      postItem.addEventListener('click', () => {
        window.location = `/post-detail.html?id=${post.id}`;
      });
    }

    // Add click event for edit button
    const editPost = newPostItem.querySelector('#postItemEdit');
    if (editPost) {
      editPost.addEventListener('click', (e) => {
        // Stop bubbling
        e.stopPropagation();

        window.location = `/add-edit-post.html?id=${post.id}`;
      });
    }

    // Add click event for remove button
    const removePost = newPostItem.querySelector('#postItemRemove');
    if (removePost) {
      removePost.addEventListener('click', async (e) => {
        // Stop bubbling
        e.stopPropagation();

        // Ask user whether they want to delete a post
        const message = `Are you sure to remove post ${post.title}?`;
        if (window.confirm(message)) {
          try {
            await postApi.remove(post.id);

            // remove post 
            newPostItem.remove();
            
            //Refresh page to get new list
            window.location = '';
          } catch (error) {
            console.log('Failed to remove post:', error);
          }
        }
      });
    }

    // Append post item to post container
    postsListContainer.appendChild(newPostItem);
  });
};

const getPageList = (pagination) => {
  const { _limit, _totalRows, _page } = pagination;
  const totalPages = Math.ceil(_totalRows / _limit);
  let prevPage = -1;

  // Return -1 if invalid page detected
  if (_page < 1 || _page > totalPages) return [0, -1, -1, -1, 0];

  // Calculate prev page
  if (_page === 1) prevPage = 1;
  else if (_page === totalPages) prevPage = _page - 2 > 0 ? _page - 2 : 1;
  else prevPage = _page - 1;

  const currPage = prevPage + 1 > totalPages ? -1 : prevPage + 1;
  const nextPage = prevPage + 2 > totalPages ? -1 : prevPage + 2;

  return [
    _page === 1 || _page === 1 ? 0 : _page - 1,
    prevPage,
    currPage,
    nextPage,
    _page === totalPages || totalPages === _page ? 0 : _page + 1,
  ];
};

const renderPostsPagination = (pagination) => {
  const postPagination = document.querySelector('#postsPagination');
  if (postPagination) {
    const pageList = getPageList(pagination);
    const { _page, _limit } = pagination;
    // Search list of 5 page items
    const pageItems = postPagination.querySelectorAll('.page-item');

    // Just to make sure pageItems has exactly 5 items
    if (pageItems.length === 5) {
      pageItems.forEach((item, idx) => {
        switch (pageList[idx]) {
          case -1:
            item.setAttribute('hidden', '');
            break;
          case 0:
            item.classList.add('disabled');
            break;
          default: {
            // Find page link
            const pageLink = item.querySelector('.page-link');
            if (pageLink) {
              // Update href of page link
              pageLink.href = `?_page=${pageList[idx]}&_limit=${_limit}`;

              // Update text content of page link for item: 1, 2, 3 (zero base)
              if (idx > 0 && idx < 4) {
                pageLink.textContent = pageList[idx];
              }
            }

            // Set current active page item, only for 1, 2, 3 (zero base)
            if (idx > 0 && idx < 4 && pageList[idx] === _page) {
              item.classList.add('active');
            }
          }
        }
      });

      // Show pagination
      postPagination.removeAttribute('hidden');
    }
  }
};

// MAIN
(async function () {
  try {
    const urlParam = new URLSearchParams(window.location.search);
    const page = urlParam.get('_page');
    const limit = urlParam.get('_limit');
    const params = {
      _page: page || AppConstants.DEFAULT_PAGE,
      _limit: limit || AppConstants.DEFAULT_LIMIT,
      _sort: 'updatedAt',
      _order: 'desc',
    };
    const response = await postApi.getAll(params);
    const postsList = response.data;

    if (response) {
      // hide loading
      const spinnerElement = document.querySelector('#spinner');
      if (spinnerElement) {
        spinnerElement.classList.add('d-none');
      }

      const pagination = response.pagination;
      renderPostsList(postsList);
      renderPostsPagination(pagination);
      anime({
        targets: '.posts-list li',
        duration: 800,
				elasticity: 600,
				delay: function(t,i) {
					return i*100;
				},
				opacity: {
					value: [0,1],
					duration: 600,
					easing: 'linear'
				},
				scaleX: {
					value: [0.4,1]
				},
				scaleY: {
					value: [0.6,1],
					duration: 1000
				}
      });
    }
  } catch (error) {
    console.log('Failed to fetch post list', error);
  }
})();
