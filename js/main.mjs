'use strict';
import AppConstants from './appConstants.js';
import postApi from './api/postApi.js';


// ----- LEARNING ----

const getPostList = () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  return fetch('https://js-post-api.herokuapp.com/api/posts', options)
    .then(response => {
      // console.log(response);

      if (response.status >= 200 && response.status < 300) {
        // response.json().then(data => console.log(data));
        return response.json();
      }
    });
};

// getPostList().then(data => console.log(data));

// async function abc() {}

const getPostListAsync = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  const response = await fetch('https://js-post-api.herokuapp.com/api/posts', options)
  if (response.status >= 200 && response.status < 300) {
    // response.json().then(data => console.log(data));
    const data = await response.json();
    return data;
  }
};

const getPostDetail = async (postId) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  const url = `${AppConstants.API_URL}/posts/${postId}`;
  const response = await fetch(url, options);
  if (response.status >= 200 && response.status < 300) {
    // response.json().then(data => console.log(data));
    const data = await response.json();
    return data;
  }
};

const updatePost = async (post) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post),
  };

  const url = `${AppConstants.API_URL}/posts/${post.id}`;
  const response = await fetch(url, options);
  if (response.status >= 200 && response.status < 300) {
    // response.json().then(data => console.log(data));
    const data = await response.json();
    return data;
  }
};

// getPostListAsync().then(data => console.log)

// -----------------------
// MAIN LOGIC
// -----------------------
const init = async () => {
  // Write your logic here ....
  // const data = await getPostListAsync();
  // console.log(data);

  // const post = await getPostDetail('1356b24a-8b63-41dc-9bbe-1bfd5f4a219a');
  // console.log(post);

  // post.author = 'Po Nguyen';
  // const updatedPost = await updatePost(post);
  // console.log('Updated post: ', updatedPost);


  const postList = await postApi.getAll();
  console.log(postList);

  const post = await postApi.getDetail('1356b24a-8b63-41dc-9bbe-1bfd5f4a219a');
  console.log(post);
};

init();
