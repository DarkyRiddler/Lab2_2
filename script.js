(function () {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')

  example.addEventListener("click", function () {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        console.log(array)
        answer.innerHTML = JSON.stringify(array);
      })
  })

  cw1.addEventListener("click", function () {

    answer.innerHTML = '<div class="loading">Loading...</div>';

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        const titles = array.map(item => item.title);
        console.log(array);
        let htmlContent = '<ul class="posts-list">';
        titles.forEach(title => {
          htmlContent += `<li>${title}</li>`;
        });
        htmlContent += '</ul>';
        
        answer.innerHTML = htmlContent;
      })

    
  })

  cw2.addEventListener("click", function () {
    answer.innerHTML = '<div class="loading">Loading...</div>';
    fetch('https://jsonplaceholder.typicode.com/posts/4')
      .then(response => response.json())
      .then(item => {
        console.log(item);
        let postContent = '<div class="single-post">';
        postContent += '<h2>'+item.id+'. '+item.title+'</h2>';
        postContent += '<p>'+item.body+'</p>';
        postContent += '<p>User ID: '+item.userId+'</p>';
        postContent += '</div>';

        answer.innerHTML = postContent;
      })
      
  })

  const formHtml = `
     <div class="post-form">
      <h3>Dodaj nowy post</h3>
      <form id="addPostForm">
        <div class="form-group">
          <label for="title">Tytuł:</label>
          <input type="text" id="title" name="title" required>
        </div>
        <div class="form-group">
          <label for="body">Treść:</label>
          <textarea id="body" name="body" rows="6" required></textarea>
        </div>
        <div class="form-group">
          <label for="userId">User ID:</label>
          <input type="number" id="userId" name="userId" value="1" required>
        </div>
        <button type="submit">Dodaj post</button>
      </form>
      <div id="formResult"></div>
    </div>
  `;

  cw3.addEventListener("click", function () {
    answer.innerHTML = formHtml;
    const formularz = document.getElementById('addPostForm');
    if (formularz) {
      formularz.addEventListener('submit', handleFormSubmit);
    }
  })

  function handleFormSubmit(e) {
    e.preventDefault();
    const formResult = document.getElementById('formResult');
    formResult.innerHTML = '<div class="loading">Wysyłanie...</div>';

    const formData = {
      title: document.getElementById('title').value,
      body: document.getElementById('body').value,
      userId: parseInt(document.getElementById('userId').value)
    };
    console.log('Dane formularza:', formData);
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Odpowiedź z serwera:', data);
      formResult.innerHTML = `
        <div class="success">
          <p><strong>Dodano nowy post o ID =</strong> ${data.id}</p>
          <p><strong>Tytuł:</strong> ${data.title}</p>
          <p><strong>Treść:</strong> ${data.body}</p>
          <p><strong>User ID:</strong> ${data.userId}</p>
        </div>
      `;
      document.getElementById('addPostForm').reset();
    })
    .catch(error => {
      formResult.innerHTML = `
        <div class="error">
          <p>Wystąpił błąd: ${error.message}</p>
        </div>
      `;
    });
  }

})();
