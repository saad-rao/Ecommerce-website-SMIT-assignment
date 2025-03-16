import {auth, createUserWithEmailAndPassword} from './firebase-config'


document.getElementById('signup-form').addEventListener("submit", function(event){
    event.preventDefault();

    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
        alert("SignUp successful");
        window.location.href= 'login.html';
    })
      .catch((error)=>{
        alert("Error", error.message)

      })
})




















// Form elements
const form = document.getElementById('signupForm');
console.log("Form Data", form);

const fullNameInput = document.getElementById('fullName');
console.log("full name" , fullNameInput);

const emailInput = document.getElementById('email');
console.log(emailInput);

const passwordInput = document.getElementById('password');
const passwordToggle = document.getElementById('passwordToggle');
const signupButton = document.getElementById('signupButton');

// Error elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const errorToast = document.getElementById('errorToast');

// Password strength elements
const strengthBar = document.querySelector('.strength-bar');
const strengthText = document.querySelector('.strength-text');

// Validation patterns
const patterns = {
    name: /^[a-zA-Z\s]{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};

// Toggle password visibility
passwordToggle.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    passwordToggle.classList.toggle('fa-eye');
    passwordToggle.classList.toggle('fa-eye-slash');
});

// Check password strength
function checkPasswordStrength(password) {
    const segments = strengthBar.querySelectorAll('.bar-segment');
    segments.forEach(segment => {
        segment.className = 'bar-segment';
    });

    if (password.length === 0) {
        strengthText.textContent = 'Password strength';
        return;
    }

    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength++;
    // Lowercase letters check
    if (/[a-z]/.test(password)) strength++;
    // Uppercase letters check
    if (/[A-Z]/.test(password)) strength++;
    // Numbers check
    if (/\d/.test(password)) strength++;
    // Special characters check
    if (/[@$!%*?&]/.test(password)) strength++;

    // Update strength bar
    for (let i = 0; i < strength && i < 4; i++) {
        segments[i].className = 'bar-segment ' + 
            (strength <= 2 ? 'weak' : 
             strength <= 3 ? 'medium' : 
             'strong');
    }
    
    // Update strength text
    strengthText.textContent = 
        strength <= 2 ? 'Weak' :
        strength <= 3 ? 'Medium' :
        'Strong';
    }


 