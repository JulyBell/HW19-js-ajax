let postsArea = document.getElementById('posts');
let ul = document.createElement('ul');
let button = document.getElementById('addPost');
let postForm = document.forms.postData;
let nameInput = postForm.elements.title;
let authorInput = postForm.elements.author;
let addName = nameInput.value;
let addAuthor = authorInput.value;
let newPost = {};



button.addEventListener('click', function decorator(e) {
  e.preventDefault();
  newPost={
    "title" : nameInput.value,
    "author" : authorInput.value
  };
  saveJSON('http://localhost:3000/posts', JSON.stringify(newPost)).then(function(data) {

    let li = document.createElement('li');
    li.innerHTML = `there is ${newPost.title} of ${newPost.author}`;
    ul.append(li);
    console.log('Success ', data);
    postForm.reset();

  }, function(status) {
    console.log('Something went wrong.', status);
  });
});

var getJSON = function(url) {
  return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.open('get', url, true);

      // browsers that support this feature automatically handle the JSON.parse()
      xhr.responseType = 'json'; // ответ будет в виде обьекта, а не строка

      xhr.onload = function() {
          var status = xhr.status;

          if (status === 200) {
              resolve(xhr.response);
          } else {
              reject(status);
          }
      };
      xhr.send();
  });
};

getJSON('http://localhost:3000/posts').then(function(data) {
      console.log(data)
      ul.innerHTML = data.map((post) => {
        
        let li = `<li>there is ${post.title} of ${post.author}</li>`;
        console.log(li)
        return li;
      }).join('');
      
      postsArea.appendChild(ul);
      
      console.log('Success ', data);
    }, function(status) {
      console.log('Something went wrong.', status);
      
    });


  function saveJSON (url, data) {
    console.log(nameInput.value + 'author ' + authorInput.value);
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.open('post', url, true);
        xhr.setRequestHeader(
            'Content-type', 'application/json; charset=utf-8'
        );

        xhr.responseType = 'json';

        xhr.onload = function() {
            var status = xhr.status;

            resolve(xhr.response);
        };
        xhr.onerror = function(e) {
            reject("Error fetching " + url);
        };
        xhr.send(data);
    });
  };


  


