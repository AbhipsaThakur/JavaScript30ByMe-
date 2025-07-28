let userInput = document.getElementById("date");
userInput.max = new Date().toISOString().split("T")[0];
let result = document.getElementById("result");
let button = document.querySelector("button");

button.addEventListener("click", calculateAge);

function calculateAge() {
    let birthDate = new Date(userInput.value);
    let today = new Date();

    let d1 = birthDate.getDate();
    let m1 = birthDate.getMonth() + 1;
    let y1 = birthDate.getFullYear();

    let d2 = today.getDate();
    let m2 = today.getMonth() + 1;
    let y2 = today.getFullYear();

    let y3 = y2 - y1;
    let m3 = m2 - m1;
    let d3 = d2 - d1;

    if (d3 < 0) {
        m3--;
        d3 += getDaysInMonth(y2, m2 - 1);
    }

    if (m3 < 0) {
        y3--;
        m3 += 12;
    }

    result.innerHTML = `You are ${y3} years, ${m3} months and ${d3} days old.`;
}

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}
