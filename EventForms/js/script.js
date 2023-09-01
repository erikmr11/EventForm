document.addEventListener('DOMContentLoaded', (event) => {
    // Check if a theme is already set in Web Storage, if not, set the default theme
    if (localStorage.getItem('theme') === null) {
        localStorage.setItem('theme', 'dark'); // Set the default theme to 'dark'
    }

    // Function to apply the stored theme from Web Storage
    function applyTheme() {
        const currentTheme = localStorage.getItem('theme');

        // Change body theme
        document.body.classList.remove('bg-dark', 'text-light', 'bg-light', 'text-dark');
        document.body.classList.add(`bg-${currentTheme}`, `text-${currentTheme === 'light' ? 'dark' : 'light'}`);

        // Change navbar theme
        const navbar = document.querySelector('.navbar');
        if (currentTheme === 'light') {
            navbar.classList.remove('navbar-dark');
            navbar.classList.add('navbar-light');
        } else {
            navbar.classList.remove('navbar-light');
            navbar.classList.add('navbar-dark');
        }
    }

    // Apply the stored theme on page load
    applyTheme();

    // Toggle theme function
    document.getElementById('toggleTheme').addEventListener('click', function () {
        const currentTheme = localStorage.getItem('theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme); // Store the new theme in Web Storage
        applyTheme(); // Apply the new theme immediately
    });
});

// Attach an event listener to the form with id "main-form" that calls the userForm function when the form is submitted
document.getElementById("main-form").addEventListener("submit", userForm);

// Function that handles the form submission
function userForm(event) {
    event.preventDefault(); // Prevent form from submitting normally
    const fname = document.getElementById('fname').value; // Retrieve first name from form
    const lname = document.getElementById('lname').value; // Retrieve last name from form
    const email = document.getElementById('email').value; // Retrieve email from form
    const address = document.getElementById('address').value; // Retrieve address from form
    const city = document.getElementById('city').value; // Retrieve city from form
    const province = document.getElementById('province').value; // Retrieve province from form

    let membership; // Declare membership variable
    // Check which membership radio button is checked and assign its value to the membership variable
    if (document.getElementById('premium').checked) {
        membership = document.getElementById('premium').value;
    } else if (document.getElementById('standard').checked) {
        membership = document.getElementById('standard').value;
    } else if (document.getElementById('basic').checked) {
        membership = document.getElementById('basic').value;
    }

    const output = document.getElementById('output'); // Get the output div by id
    // Update the innerHTML of the output div to display the submitted form information
    output.innerHTML = `
        Full Name: ${fname} ${lname}<br/>
        Email: ${email}<br/>
        Address: ${address}<br/>
        City: ${city}<br/>
        Province: ${province}<br/>
        Membership: ${membership}
    `;
}

function myExcelFuns() { // Declare a function named myExcelFuns
    let numberStr = document.getElementById("numbers").value.trim(); // Get numbers string
    if (numberStr === "") { // Check if numbers string is empty
        alert("Please type your numbers."); // Alert user
        return false; // End function
    }
    let numberArr = numberStr.split(" "); // Split numbers string into array
    let finalNumericArray = []; // Declare final array for numbers
    for(let i = 0; i < numberArr.length; i++){ // Loop over numberArr
        let number = parseFloat(numberArr[i]); // Parse each item into a number
        if(!isNaN(number)) { // Check if number is a number
            finalNumericArray.push(number); // Add number to finalNumericArray
        }
    }

    let result; // Declare variable for result
    if (document.getElementById("sum").checked) { // If "sum" option is checked
        result = finalNumericArray.reduce((a, b) => a + b, 0); // Calculate sum of finalNumericArray
    } else if (document.getElementById("avg").checked) { // If "avg" option is checked
        let sum = finalNumericArray.reduce((a, b) => a + b, 0); // Calculate sum of finalNumericArray
        result = sum / finalNumericArray.length; // Calculate average
    } else if (document.getElementById("max").checked) { // If "max" option is checked
        result = Math.max(...finalNumericArray); // Calculate max of finalNumericArray
    } else if (document.getElementById("min").checked) { // If "min" option is checked
        result = Math.min(...finalNumericArray); // Calculate min of finalNumericArray
    } else { // If no option is checked
        alert("Please select a calculation method."); // Alert user
        return false; // End function
    }
    document.getElementById("result").innerText = result; // Display result
    return false; // End function
}
