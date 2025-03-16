import { auth , signInWithEmailAndPassword } from "./firebase-config";


doucument.getElementById('loginForm').addEventListener("submit",function(event){

    event.preventDefault()

    let email = document.getElementById('email').value
    let password = document.getElementById('password').value


    signInWithEmailAndPassword(auth,email,password)

    .then((userCredential)=>{
        alert("Login Successful!");
        window.location.href = 'index.html';
    })

    .catch((error)=>{
        alert("Error" , error.message)
    })
})




























// DOM Elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showLoginBtn = document.getElementById('showLogin');
const showSignupBtn = document.getElementById('showSignup');
const errorAlert = document.getElementById('errorAlert');
const errorMessage = document.getElementById('errorMessage');

// Form Switching
showLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
});

showSignupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
});

// Password Toggle
document.querySelectorAll('.password-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
        const targetId = toggle.getAttribute('data-target');
        const passwordInput = document.getElementById(targetId);
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        toggle.classList.toggle('fa-eye');
        toggle.classList.toggle('fa-eye-slash');
    });
});

// Validation Functions
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePassword = (password) => {
    return password.length >= 6;
};

const validateName = (name) => {
    return name.trim().length >= 2;
};

const showError = (message) => {
    errorMessage.textContent = message;
    errorAlert.classList.add('show');
    setTimeout(() => {
        errorAlert.classList.remove('show');
    }, 3000);
};

const setLoading = (form, loading) => {
    const btn = form.querySelector('.submit-btn');
    if (loading) {
        btn.classList.add('loading');
        btn.disabled = true;
    } else {
        btn.classList.remove('loading');
        btn.disabled = false;
    }
};


function signIn() {
    const email = document.getElementById("loginEmail").value;

    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            console.log("USER ", user)

            alert("USER LOGGED IN", user)
            // ...
        })
        .catch((error) => {


            alert(error.message);
        });
}



// Login Form Validation and Submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    const emailError = document.getElementById('loginEmailError');
    const passwordError = document.getElementById('loginPasswordError');
    
    // Reset errors
    email.classList.remove('error');
    password.classList.remove('error');
    emailError.textContent = '';
    passwordError.textContent = '';
    
    let isValid = true;

    if (!validateEmail(email.value)) {
        email.classList.add('error');
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }

    if (!validatePassword(password.value)) {
        password.classList.add('error');
        passwordError.textContent = 'Password must be at least 6 characters';
        isValid = false;
    }

    if (isValid) {
        setLoading(loginForm, true);
        try {
            await auth.signInWithEmailAndPassword(email.value, password.value);
           
        } catch (error) {
            showError(error.message);
        } finally {
            setLoading(loginForm, false);
            alert("YOU ARE LOGGEDIN ")
        }
    }
});

// Signup Form Validation and Submission
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signupName');
    const email = document.getElementById('signupEmail');
    const password = document.getElementById('signupPassword');
    const nameError = document.getElementById('signupNameError');
    const emailError = document.getElementById('signupEmailError');
    const passwordError = document.getElementById('signupPasswordError');
    
    // Reset errors
    name.classList.remove('error');
    email.classList.remove('error');
    password.classList.remove('error');
    nameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    
    let isValid = true;

    if (!validateName(name.value)) {
        name.classList.add('error');
        nameError.textContent = 'Please enter your full name';
        isValid = false;
    }

    if (!validateEmail(email.value)) {
        email.classList.add('error');
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }

    if (!validatePassword(password.value)) {
        password.classList.add('error');
        passwordError.textContent = 'Password must be at least 6 characters';
        isValid = false;
    }

    if (isValid) {
        setLoading(signupForm, true);
        try {
            await auth.createUserWithEmailAndPassword(email.value, password.value);
            // Update user profile with name
            const user = auth.currentUser;
            await user.updateProfile({
                displayName: name.value
            });
            // Redirect or handle successful signup
        } catch (error) {
            showError(error.message);
        } finally {
            setLoading(signupForm, false);
            // alert("Signup successfully")
        }
    }
});

// Google Sign In
document.querySelectorAll('.google-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        try {
            const result = await auth.signInWithPopup(googleProvider);
            // Handle successful login
        } catch (error) {
            showError(error.message);
        }
    });
});