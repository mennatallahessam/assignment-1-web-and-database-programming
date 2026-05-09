// User class definition
class User {
    constructor(id, firstName, lastName, email, password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}

// Handle registration form submission
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            register();
        });
    }

    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            login();
        });
    }
});

// Register function
function register() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Generate a simple ID (in real app, backend would handle this)
    const id = Date.now();
    
    // Create new User object
    const newUser = new User(id, firstName, lastName, email, password);
    
    // Print the object to console
    console.log('Registration - New User Object Created:');
    console.log(newUser);
    
    // Optional: Show success message
    alert('Registration successful! Check the console to see the User object.');
}

// Login function
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Generate a simple ID (in real app, backend would handle this)
    const id = Date.now();
    
    // Create User object with login credentials
    const loginUser = new User(id, '', '', email, password);
    
    // Print the object to console
    console.log('Login - User Object Created:');
    console.log(loginUser);
    
    // Optional: Show success message
    alert('Login attempt! Check the console to see the User object.');
}
