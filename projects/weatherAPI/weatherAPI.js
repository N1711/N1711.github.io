function status(response) {                                                                                                                                                                     //check the response from the fetch
    if(response.status >= 200 && response.status < 300) {                                                                                                                                       //resolve if 200<=status<300 e.g. OK
        return Promise.resolve(response);
    }else {
        console.log(Promise.resolve(response));                                                                                                                                                 //reject if status is anything else
        return Promise.reject(new Error("Something went wrong accessing the data"));
    }
}

function json(response) {                                                                                                                                                                       //parse the response
    return response.json();
}

function cityArray(data) {                                                                                                                                                                      //using the list in the json file of cityIds
    if(!(dataArray && dataArray.length)) {                                                                                                                                                      //create a new array of city objects
        for(let cityID of data) {
            dataArray.push(cityID);
        }
    }
    return Promise.resolve(dataArray);
}

const updateDashboard = (el, name, country, lat, lon) => {                                                                                                                                      //arrow function to update some of the dashboard entries
    name.innerText = `${el.name}`;
    country.innerText = `Country: ${el.country}`;
    lat.innerText = `Lat: ${el.lat}`;
    lon.innerText = `Lon: ${el.lon}`;
}

function findCityArray(newData) {                                                                                                                                                               //function to find the cityID based on the user input by seraching
    if(searched) {                                                                                                                                                                              //through the array of city object        
        modalContent.innerHTML = "";                                                                                                                                                            //!important check, if the user has searched for something already, the modal content box will contain <a> children. This removes them all without looping through all of
    }                                                                                                                                                                                           //children of this object. Otherwise, search results will accumulate.
    if(cidArray.length > 0) {                                                                                                                                                                   //same logic, clear the city objects array to prepare for a new search
        cidArray = [];
    }
    let cityTextValue = cityText.value;                                                                                                                                                         //grab the user input
    if (cityTextValue) {                                                                                                                                                                        //if not empty
        for(let i=0; i<newData.length; i++) {                                                                                                                                                   //loop through the array and if any matches are found, populate the cidArray, which contains only a list of objects that match the user's search query
            if(cityTextValue.toLowerCase() === newData[i].name.toLowerCase()) {
                cidArray.push({id: `${newData[i].id}`, name: `${newData[i].name}`, country: `${newData[i].country}`, lat: `${newData[i].coord.lat}`, lon: `${newData[i].coord.lon}`});          //push the objects into an array, taking the name, country, lattitude and longitude. Could have also be done with descructuring earlier.
             }
        }
    }
    if(!cidArray.length) {                                                                                                                                                                      //if nothing is found
        modal.style.display = 'block';                                                                                                                                                          //show the modal box
        let anchor = document.createElement('a');                                                                                                                                               //create an <a> child
        modalContent.appendChild(anchor);
        anchor.innerText = `City ${cityText.value} not found`;                                                                                                                                  //let the user know nothing was found
    }else if(cidArray.length == 1) {                                                                                                                                                            //if one match is found
        updateDashboard(cidArray[0], divName, divCountry, divLat, divLon);                                                                                                                      //update the dashboard
        queryWeatherData(cidArray[0].id);                                                                                                                                                       //get the cityID immediately without displaying the modal box and query the weather data
    }else {
        const uniqueAddresses = Array.from(new Set(cidArray.map(a => a.country))).map(country => {                                                                                              //very clever ES6 function to remove duplicates. For Example, there are many cities with the same name in the same country. We don't want all of them becuse
            return cidArray.find(a => a.country === country)                                                                                                                                    //this is difficult for the user to establish which one is theirs. Additional hints will be required from the city objects but as this is just a demo, one per country will suffice
        });
        modal.style.display = "block";                                                                                                                                                          //display the modal box
        const anc = document.createElement('a');                                                                                                                                                //create <a> element as a child
        anc.innerHTML = "Matches Found: <br></br>"
        modalContent.appendChild(anc);
        for(let i of uniqueAddresses) {                                                                                                                                                         //for every match, create an a element with the city name and country and display it in the modal box
            const p = document.createElement('a');
            p.href = '#';
            p.classList.add('hyperlinked');
            modalContent.appendChild(p);
            p.innerHTML = `${i.name}, ${i.country}<br>`;
            p.addEventListener('click', function() {                                                                                                                                            //attach on click event and wait for user click before passing the city Id to the next function
                modal.style.display = 'none';
                updateDashboard(i, divName, divCountry, divLat, divLon);
                queryWeatherData(i.id);
            })
        }
        window.onclick = function(event) {                                                                                                                                                      //if the user clicks anywhere outside of the box, hide the modal box. May be they changed their minds?
            if (event.target == modal) {
             modal.style.display = "none";
            }
        }
    }
}

searchQuery.addEventListener('click', requestData);                                                                                                                                             //attach event listener to the 'Get Weather Data' button

const animateInit = () => {                                                                                                                                                                     //if the cityId is found the weather data query was succesfull, animate the text input and search button to the top left
    if(!searched) {
        searchWrapper.style.top = 10+'%';
        searchWrapper.style.left = 7 + '%';
        cityText.style.width = 150+'px';
        cityText.value = "";
        cityText.insertAdjacentHTML('afterend', '<br>');
        searchQuery.innerText = "Search Again";
        searchQuery.style.width = `150px`;
        secondaryWrap.style.display = 'block';
        teritaryWrap.style.display = 'block';
    }
    searched = true;                                                                                                                                                                            //if this function is executed, then the user has performed a search
}

function getWeatherData(weatherData) {                                                                                                                                                          //let's get some data from the API
    let {sunrise, sunset} = weatherData.sys;                                                                                                                                                    //destructure weatherData.sys which contains some of the required data
    let {feels_like, humidity, pressure, temp} = weatherData.main;                                                                                                                              //destructure weatherData.main which contains the rest of the required data
    let d = new Date();                                                                                                                                                                         //get the date and time
    let min = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();                                                                                                                                //add a prefix to the minutes otherwise HTML omits one 0 when the minutes is a single digit 
    citySunrise.innerText = `Sunrise: ${convertUTCTime(sunrise, weatherData.timezone)}`;                                                                                                        //convert the UTC time returned by the weather object to SI time and adjust according to the timezone
    citySunset.innerText = `Sunset: ${convertUTCTime(sunset, weatherData.timezone)}`;
    currentT.innerHTML = `${convertToC(temp)}°C<br><div id="feelsLike">Feels Like: ${convertToC(feels_like)}°C</div>`;                                                                          //convert the temperature from K to °C
    pressureT.innerHTML = `${icons.pressure}</i><br><div class="atmPressure">${pressure}hPa</div>`;                                                                                             //update the pressure, humidity, windSpeed divs    
    humidityT.innerHTML = `${icons.humidity}</i><br><div class="hum">${humidity}%</div>`;
    windSpeed.innerHTML = `${icons.wind}</i><br><div class="windFormat">${weatherData.wind.speed}m/s</div>`;
    dateWrapper.innerHTML = `${d.getDate()} ${monthArray[d.getMonth()]} <br>${d.getHours()} : ${min}`;                                                                                          //update the timestamp
    return weatherData;                                                                                                                                                                         //return the weatherData object for further processing
}

function convertUTCTime(firstInput, timezone) {                                                                                                                                                 //funcction to convert the UTC time to SI time
    let utcTime = firstInput + timezone;
    let dateObj = new Date(utcTime * 1000); 
    return dateObj.toLocaleTimeString();
}

const convertToC = (tempData) => Celsius = parseInt(tempData - 273.15).toFixed(0);                                                                                                              //function to convert the K to °C

function parseWeather(weatherData) {                                                                                                                                                            //get the current Weather Conditions and assign background depending on the result
    let description = weatherData.weather[0].main;
    document.querySelector('#skyDesc').innerText = description;
    if(description === "Rain" || description === "Thunderstorm" || description === "Drizzle") {
        sky.innerHTML = icons.rain
        bg.style.backgroundImage = "url('img/rainy.jpg')";
        bg.style.backgroundSize = 'cover';
    } else if(description === "Clear") {
        sky.innerHTML = icons.sun;
        bg.style.backgroundImage = "url('img/clearSky.jpg')";
        bg.style.backgroundSize = 'cover';
    }else if(description === "Snow"){
        sky.innerHTML = icons.snow;
        bg.style.backgroundImage = "url('img/snowy.jpg')";
        bg.style.backgroundSize = 'cover';
    }else if(description === "Clouds") {
        sky.innerHTML = icons.cloud;
        bg.style.backgroundImage = "url('img/cloudy.jpg')";
        bg.style.backgroundSize = 'cover';
    }else if(atmosphere.includes(description)) {
        sky.innerHTML = icons.haze;
        bg.style.backgroundImage = "url('img/haze.jpg')";
        bg.style.backgroundSize = 'cover';
    }
    
}

function requestData() {                                                                                                                                                                          //chaining promises
    fetch('city.list.json')
    .then(status)
    .then(json)
    .then(cityArray)
    .then(findCityArray)
    .catch(function error(e) {
        console.log("Error has occurred", e)
    })
}

function queryWeatherData(id) {                                                                                                                                                                   //chaining promises
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=26e3ad3f73756c8fb12f6a27bf152796`, {mode: "cors"})
    .then(status)
    .then(json)
    .then(getWeatherData)
    .then(parseWeather)
    .then(animateInit)
    .catch(function error(e) {
        console.log("Error with data parsing has occured", e);
    })
}