
//typewriter effect

const text = "When Will I Die??";
const speed = 150;

let heading = document.getElementById('headn');

function typewrite(i) {
  heading.textContent += text[i];
}

for (let i = 0; i < text.length; i++) {
  setTimeout(() => typewrite(i), speed*i);
}

//get data from form

let interval = null;

async function getData(event) {
    event.preventDefault();

    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const dob = document.getElementById('dob').value;
    const countryName = document.getElementById('country').value;

    async function countDown(country) {
        let response = await fetch(`https://api.api-ninjas.com/v1/country?name=${country}`, {
            method: 'GET',
            headers: {
                'X-Api-Key': 'VH0Lun3948dHjgEmbYgPyQ==068FY5KlxY67LIhM'
            }
        });
    
        let data = await response.json();
        return data;
    }

    let data = await countDown(countryName);
    let life = 0;

    if(gender === 'female') {
        life = data[0].life_expectancy_female;
    } else life = data[0].life_expectancy_male;

    const dobUser = new Date(dob);

    // Calculate death date
    const deathDate = new Date(dobUser);
    deathDate.setFullYear(deathDate.getFullYear() + Math.floor(life));

    // Start countdown
    
    const countdownElement = document.getElementById("countdown");

    if (interval) {
        clearInterval(interval);
    }

    interval = setInterval(() => {
        const now = new Date();
        const distance = deathDate - now;

        if (distance < 0) {
            clearInterval(interval);
            countdownElement.textContent = "💀 Time's up.";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);

}

let submit = document.getElementById('deathform');
submit.addEventListener('submit', getData);