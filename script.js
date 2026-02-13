const btn = document.getElementById('submit-btn');

const inputDay = document.getElementById('day');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year');

const outDay = document.getElementById('result-days');
const outMonth = document.getElementById('result-months');
const outYear = document.getElementById('result-years');

function showError(input, message) {
    const parent = input.parentElement;
    parent.classList.add('error');
    const msg = parent.querySelector('.error-msg');
    msg.innerText = message;
    msg.style.display = 'block';
}

function clearErrors() {
    document.querySelectorAll('.input-group').forEach(el => {
        el.classList.remove('error');
        el.querySelector('.error-msg').style.display = 'none';
    });
}

btn.addEventListener('click', () => {
    clearErrors();
    
    const day = parseInt(inputDay.value);
    const month = parseInt(inputMonth.value);
    const year = parseInt(inputYear.value);
    let isValid = true;

    if (!day) { showError(inputDay, "Este campo es requerido"); isValid = false; }
    if (!month) { showError(inputMonth, "Este campo es requerido"); isValid = false; }
    if (!year) { showError(inputYear, "Este campo es requerido"); isValid = false; }

    if (month < 1 || month > 12) {
        showError(inputMonth, "Mes no válido");
        isValid = false;
    }

    const maxDays = new Date(year, month, 0).getDate(); 
    if (day < 1 || day > 31) {
        showError(inputDay, "Día no válido");
        isValid = false;
    } else if (day > maxDays) {
        showError(inputDay, "Fecha inexistente");
        isValid = false;
    }

    if (year > new Date().getFullYear()) {
        showError(inputYear, "Debe ser en el pasado");
        isValid = false;
    }

    if (isValid) {
        calculateAge(day, month, year);
    }
});

function calculateAge(d, m, y) {
    let today = new Date();
    let birthDate = new Date(y, m - 1, d);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Animación simple de números
    outYear.innerText = years;
    outMonth.innerText = months;
    outDay.innerText = days;
}