
const submitBtn = document.getElementById('submit');
const email = document.getElementById('email');
const dob = document.getElementById('dob')

email.addEventListener('input', () => validateEmail(email));
submitBtn.addEventListener('click', (event) => {
    const name = document.getElementById('name');
    const password = document.getElementById('password');
    const dob = document.getElementById('dob');
    const acceptedTerms = document.getElementById('acceptTerms')
    validateEmail(email);
    if (name.checkValidity() && email.checkValidity() 
        && password.checkValidity() && validatedob(dob)
        && acceptedTerms.checkValidity()){
        event.preventDefault();
        console.log("HI")
        saveToLocalStorage();
        appendLocalStorageToTable();
    }
})


function validateEmail(email) {
    if(email.validity.typeMismatch){
        email.setCustomValidity("The Email is not in the expected format");
        email.reportValidity();
    }
    else {
        email.setCustomValidity('');
    }
}

function saveToLocalStorage() {
    const nameValue = document.getElementById('name').value;
    const emailValue = document.getElementById('email').value;
    const passwordValue = document.getElementById('password').value;
    const dobValue = document.getElementById('dob').value;
    let acceptedValue = document.getElementById('acceptTerms').checked;

        localStorage.setItem('name', nameValue);
        localStorage.setItem('email', emailValue);
        localStorage.setItem('password', passwordValue);
        localStorage.setItem('dob', dobValue);
        localStorage.setItem('acceptedTerms', acceptedValue)
}

function appendLocalStorageToTable() {
    const nameValue = localStorage.getItem('name');
    const emailValue = localStorage.getItem('email');
    const passwordValue = localStorage.getItem('password');
    const dobValue = localStorage.getItem('dob');
    const acceptedValue = localStorage.getItem('acceptedTerms');


    let tableRow = 
    `<tr>
       <td>${nameValue}</td>
       <td>${emailValue}</td>
       <td>${passwordValue}</td>
       <td>${dobValue}</td>
       <td>${acceptedValue}</td>
     </tr>`;

    const table = document.getElementsByTagName('table')[0];
    let tr = document.createElement('tr');
    tr.innerHTML = tableRow;
    table.appendChild(tr)
}

function validatedob(dob) {
    
    if (dob.value === '') {
        return false;
    }
    let age = calculate_age(new Date(dob.value))    
    console.log(age)
    if (age < 18 || age > 55) {
        dob.setCustomValidity('Age should be between 18 and 55');
        dob.reportValidity();
        return false;
    }
    return true;
}

function calculate_age(dob) { 
    var ageinsecond = Date.now() - dob.getTime();
    var ageInDate = new Date(ageinsecond); 
  
    return Math.abs(ageInDate.getUTCFullYear() - 1970);
}
