async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    if (username && password) {
//when using await we can assign the result of the promise to a variable allows us to get rid of
//.then and .catch
      const response = await  fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
    })
 // check the response status ok instead of .then .catch for err handling
 if (response.ok) {
    console.log('success');
  } else {
    alert(response.statusText);
  }
}
  }


document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);