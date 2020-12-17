let userName;

function checker() {

    userName = document.getElementById('username').value;
    const userPass = document.getElementById('password').value;

    if (userPass === ''){
      alert('Please enter a password.');
    }
}