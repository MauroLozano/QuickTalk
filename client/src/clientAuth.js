
// Authentication form element references
const authChangeBtn = document.getElementById('authChange')

const registerForm = document.getElementById('register-form');
const registerUsernameInput = document.getElementById('register-username');
const registerPasswordInput = document.getElementById('register-password');

const loginForm = document.getElementById('login-form');
const loginUsernameInput = document.getElementById('login-username');
const loginPasswordInput = document.getElementById('login-password');

// The following code handles the authentication form toggling
authChangeBtn.addEventListener('click',(e)=>{
    if(registerForm.classList.contains('auth-form--enabled')){
        registerForm.classList.remove('auth-form--enabled');
        registerForm.classList.add('auth-form--disabled');
        loginForm.classList.remove('auth-form--disabled');
        loginForm.classList.add('auth-form--enabled');
        authChangeBtn.textContent = '¿Don\'t have an account?';
    }
    else if(loginForm.classList.contains('auth-form--enabled')){
        loginForm.classList.remove('auth-form--enabled');
        loginForm.classList.add('auth-form--disabled');
        registerForm.classList.remove('auth-form--disabled');
        registerForm.classList.add('auth-form--enabled');
        authChangeBtn.textContent = '¡I already have an account!';
    }
})
// The following code handles the registration form submission
registerForm.addEventListener('submit',(e)=>{
    e.preventDefault(); // Prevents the default form submission behavior
    if(registerUsernameInput.value && registerPasswordInput.value){
        register(registerUsernameInput.value,registerPasswordInput.value)
    }
})
loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(loginUsernameInput.value && loginPasswordInput.value){
        login(loginUsernameInput.value,loginPasswordInput.value)
    }
})
async function register(userName, password) {
    const response = await fetch('/api/register', { // Sends a POST request to the server to register a new user
        method:'POST',
        headers: {ContentType: 'application/json'},
        body: JSON.stringify({
            userName: userName,
            password: password
        })
    })
    const registerData = await response.json(); // Parses the response data as JSON
    if (registerData.success){
        registerForm.classList.remove('auth-form--enabled');
        registerForm.classList.add('auth-form--disabled');
        loginForm.classList.remove('auth-form--disabled');
        loginForm.classList.add('auth-form--enabled');
        authChangeBtn.textContent = '¿Don\'t have an account?';
    }
}
async function login(userName, password) {
    const response = await fetch('/api/login', {
        method:'POST',
        headers: {ContentType: 'application/json'},
        body: JSON.stringify({
            userName: userName,
            password: password
        })
    })
}