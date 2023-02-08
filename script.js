
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


function loadfromLocalStorageToTable() {
    let allEntries = retrieveEntries();
    
    for (entry of allEntries) {
        let tr = document.createElement('tr');
        let tableRow = 
        `<tr>
        <td>${entry.nameValue}</td>
        <td>${entry.emailValue}</td>
        <td>${entry.passwordValue}</td>
        <td>${entry.dobValue}</td>
        <td>${entry.acceptedValue}</td>
        </tr>
        `
        tr.innerHTML = tableRow;
        table.appendChild(tr);
    }
}
function loadanEntryandUpdateTable(entry) {
    let tr = document.createElement('tr');
    let tableRow = 
    `<tr>
    <td>${entry.nameValue}</td>
    <td>${entry.emailValue}</td>
    <td>${entry.passwordValue}</td>
    <td>${entry.dobValue}</td>
    <td>${entry.acceptedValue}</td>
    </tr>
    `
    tr.innerHTML = tableRow;
    table.appendChild(tr);
}

window.onload = loadfromLocalStorageToTable();
email.addEventListener('input', () => validateEmail(email));
submitBtn.addEventListener('click', (event) => {
    const name = document.getElementById('name');
    const password = document.getElementById('password');
    const dob = document.getElementById('dob');
    const acceptedTerms = document.getElementById('acceptTerms')
    let entry = {'nameValue': name.value, 'emailValue': email.value,
                 'passwordValue': password.value, 'dobValue': dob.value,
                 'acceptedValue': acceptedTerms.value
    };
    validateEmail(email);
    if (name.checkValidity() && email.checkValidity() 
    && password.checkValidity() && validatedob(dob)
    && acceptedTerms.checkValidity()){
        event.preventDefault();
        saveToLocalStorage();
        loadanEntryandUpdateTable(entry);
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

    let userEntry = retrieveEntries();

    const anEntry = {nameValue, emailValue, passwordValue, dobValue, acceptedValue};
    let flag=true;
    for (entry in userEntry) {
        if (userEntry[entry].nameValue == nameValue) {
            flag = false;
            console.log("HI")
            break;
        }
        console.log(flag)
        console.log("Local Storage: ", userEntry[entry].nameValue)
        console.log("Entrytobe: ", nameValue)
    }
    if (!flag) {
        userEntry.push(anEntry);
        localStorage.setItem('user-entries', JSON.stringify(userEntry));
    }
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

function calculate_age(dob) { 
    var ageinsecond = Date.now() - dob.getTime();
    var ageInDate = new Date(ageinsecond); 
  
    return Math.abs(ageInDate.getUTCFullYear() - 1970);
}
