const weatherForm = document.querySelector('form');
const search = document.querySelector("input");
const messageOne = document.querySelector("#alt");
const messageTwo = document.querySelector("#Temperature");
const messageThree = document.querySelector("#Weather");
const messageFour = document.querySelector("#sunrise");
const messageFive = document.querySelector("#sunset");
const messageSix = document.querySelector("#uvi");

const timeConverter = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var orig = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return orig;
  }

const weather = (location) => {

    messageOne.textContent = "Loading"
    messageTwo.textContent = ""
    messageThree.textContent = ""
    messageFour.textContent = ""
    messageFive.textContent = ""
    messageSix.textContent = ""

    fetch("/weather?address=" + encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error);
            messageOne.textContent = data.error;
        }
        else {
            messageOne.textContent  = "Location   : " + data[1].location;
            messageFour.textContent = "Sunrise    : " + timeConverter(data[0].sunrise);
            messageFive.textContent = "Sunset     : " + timeConverter(data[0].sunset);
            messageTwo.textContent = "Temperature : " + data[0].Temperature;
            messageThree.textContent = "Weather   : " + data[0].weather;
            messageSix.textContent = "UVI         : " + data[0].uvi;
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