let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

function renderPosts() {
  const postsDiv = document.getElementById('posts');
  postsDiv.innerHTML = '';

  posts.forEach((post, index) => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    postDiv.innerHTML = `
      <div class="controls">
        <button onclick="editPost(${index})">✏️ Edit</button>
        <button onclick="deletePost(${index})">🗑️ Delete</button>
      </div>
      <h3>${post.title}</h3>
      <p class="date">${post.date}</p>
      <p>${post.content}</p>
    `;

    postsDiv.appendChild(postDiv);
  });
}

function savePost() {
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  const index = document.getElementById('editingIndex').value;

  if (!title || !content) {
    alert('Please fill in both fields!');
    return;
  }

  const newPost = {
    title,
    content,
    date: new Date().toLocaleDateString()
  };

  if (index === '') {
    posts.unshift(newPost);
  } else {
    posts[index] = newPost;
    document.getElementById('form-title').textContent = '📝 New Post';
  }

  localStorage.setItem('blogPosts', JSON.stringify(posts));
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
  document.getElementById('editingIndex').value = '';
  renderPosts();
}

function editPost(index) {
  const post = posts[index];
  document.getElementById('title').value = post.title;
  document.getElementById('content').value = post.content;
  document.getElementById('editingIndex').value = index;
  document.getElementById('form-title').textContent = '✏️ Edit Post';
}

function deletePost(index) {
  if (confirm('Delete this post?')) {
    posts.splice(index, 1);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    renderPosts();
  }
}

renderPosts();
