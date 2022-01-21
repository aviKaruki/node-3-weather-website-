const weatherForm = document.querySelector('form');
const search = document.querySelector("input");
const messageOne = document.querySelector("#alt");
const messageTwo = document.querySelector("#Temperature");
const messageThree = document.querySelector("#Weather");


const weather = (location) => {

    messageOne.textContent = "Loading"
    messageTwo.textContent = ""
    messageThree.textContent = ""

    fetch("http://localhost:3000/weather?address=" + encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error);
            messageOne.textContent = data.error;
        }
        else {
            messageOne.textContent = data[1].location;
            messageTwo.textContent = data[0].Temperature;
            messageThree.textContent = data[0].weather;
            console.log(data[0].Temperature);
            console.log(data[1].location);
        }
    });
});
}

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const location = search.value;
    console.log(location);
    weather(location);
});