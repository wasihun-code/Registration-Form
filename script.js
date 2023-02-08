
const submitBtn = document.getElementById('submit');
const email = document.getElementById('email');
const dob = document.getElementById('dob')
const table = document.getElementsByTagName('table')[0];

const retrieveEntries = () => {
    let entreis = localStorage.getItem('user-entries')
    if (entreis) {
        entreis = JSON.parse(entreis);
        return entreis;
    }
    return [];
}



window.onload = loadfromLocalStorageToTableOnLoad();
email.addEventListener('input', () => validateEmail(email));
submitBtn.addEventListener('click', (event) => {
    const name = document.getElementById('name');
    const password = document.getElementById('password');
    const dob = document.getElementById('dob');
    const acceptedTerms = document.getElementById('acceptTerms')

    let entry = {'name': name.value, 'email': email.value,
                 'password': password.value, 'dob': dob.value,
                 'accepted': acceptedTerms.checked
    };

    validateEmail(email);

    if (name.checkValidity() && email.checkValidity() 
    && password.checkValidity() && validatedob(dob)
    && acceptedTerms.checkValidity()){
        event.preventDefault();
        saveToLocalStorage();
        addEntryToTable(entry);
    }
})



function loadfromLocalStorageToTableOnLoad() {
    let allEntries = retrieveEntries();
    allEntries.map(addEntryToTable)
}

function addEntryToTable(entry) {
    let tr = document.createElement('tr');
    let tableRow = `<tr>
        <td>${entry.name}</td>
        <td>${entry.email}</td>
        <td>${entry.password}</td>
        <td>${entry.dob}</td>
        <td>${entry.accepted}</td>
    </tr>`
    tr.innerHTML = tableRow;
    table.appendChild(tr);
}

function saveToLocalStorage() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    let accepted = document.getElementById('acceptTerms').checked;

    let userEntry = retrieveEntries();
    // let userEntry = [];

    const anEntry = {name, email, password, dob, accepted};

    userEntry.push(anEntry);
    localStorage.setItem('user-entries', JSON.stringify(userEntry));
}

function validatedob(dob) {
    
    if (dob.value === '') {
        return false;
    }
    let age = calculate_age(new Date(dob.value))    
    if (age < 18 || age > 55) {
        dob.setCustomValidity('Age should be between 18 and 55');
        dob.reportValidity();
        return false;
    }
    return true;
}

function validateEmail(email) {
    if(email.validity.typeMismatch){
        email.setCustomValidity("The Email is not in the expected format");
        email.reportValidity();
    }
    else {
        email.setCustomValidity('');
    }
}

function calculate_age(dob) { 
    var ageinsecond = Date.now() - dob.getTime();
    var ageInDate = new Date(ageinsecond); 
  
    return Math.abs(ageInDate.getUTCFullYear() - 1970);
}