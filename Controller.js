    function City(name, lat, long) {
        this.name = name;
        this.latitude = lat;
        this.longitude = long;

        this.getState = function () {
            var arrState = name.split(',');
            return arrState[1].trim();
        }
    }

    function Map (cities) {

        this.cities = cities;

        this.getUniqueStates = function () {

            var uniqueNamesOfStates = new Set();
            for (var i = 0; i < cities.length; i++) {
                uniqueNamesOfStates.add(cities[i].getState());
            }

            var str = Array.from(uniqueNamesOfStates).join(' ');
            return str;
        };

        this.mostCity = function (choiceOfCheckBox) {

            var choiceCity = '';
            switch (choiceOfCheckBox) {
                case 'northernmostCity':
                    choiceCity = findNorthernmostCity();
                    break;
                case 'southernmostCity':
                    choiceCity = findSouthernmostCity();
                    break;
                case 'westernmostCity':
                    choiceCity = findWesternmostCity();
                    break;
                case 'easternmostCity':
                    choiceCity = findEasternmostCity();
                    break;
                default:
                    console.log('Я таких значений не знаю');
            }
            return choiceCity;
        }

        this.findClosestCity = function (inputLatitude, inputLongitude) {
            var distance;
            var nameClosestCity;

            for (var i = 0; i < listCities.length; i++) {

                var newDistance =
                    getDistanceFromLatLonInKm(inputLatitude, inputLongitude, listCities[i].latitude, listCities[i].longitude);

                if (i === 0) {
                    distance = newDistance;
                    nameClosestCity = listCities[i].name;
                }
                if (newDistance < distance) {
                    distance = newDistance;
                    nameClosestCity = listCities[i].name;
                }
            }
            return nameClosestCity;
        }
        function findNorthernmostCity() {
            var northernmostCityLat = cities[0].latitude;
            var northernmostCityName = cities[0].name;

            for (var i = 0; i < cities.length; i++) {
                if (northernmostCityLat < cities[i].latitude) {
                    northernmostCityLat = cities[i].latitude;
                    northernmostCityName = cities[i].name;
                }
            }
            return northernmostCityName;
        }

        function findSouthernmostCity() {
            var southernmostCityLat = cities[0].latitude;
            var southernmostCityName = cities[0].name;

            for (var i = 0; i < cities.length; i++) {
                if (southernmostCityLat > cities[i].latitude) {
                    southernmostCityLat = cities[i].latitude;
                    southernmostCityName = cities[i].name;
                }
            }
            return southernmostCityName;
        }

        function findWesternmostCity() {
            var westernmostCityLong = cities[0].longitude;
            var westernmostCityName = cities[0].name;

            for (var i = 0; i < cities.length; i++) {
                if (westernmostCityLong > cities[i].longitude) {
                    westernmostCityLong = cities[i].longitude;
                    westernmostCityName = cities[i].name;
                }
            }
            return westernmostCityName;
        }

        function findEasternmostCity() {
            var easternmostCityLong = cities[0].longitude;
            var easternmostCityName = cities[0].name;

            for (var i = 0; i < cities.length; i++) {
                if (easternmostCityLong < cities[i].longitude) {
                    easternmostCityLong = cities[i].longitude;
                    easternmostCityName = cities[i].name;
                }
            }
            return easternmostCityName;
        }

        function degree2radian(deg) {
            return deg * (Math.PI / 180)
        }

        function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
            var Radius = 6371; // Radius of the earth in km
            var dLat = degree2radian(lat2 - lat1);
            var dLon = degree2radian(lon2 - lon1);
            var a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(degree2radian(lat1)) * Math.cos(degree2radian(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var distance = Radius * c; // Distance in km
            return distance;
        }
    }

    var city1 = new City('Nashville, TN', 36.17, -86.78);
    var city2 = new City('New York, NY', 40.71, -74.00);
    var city3 = new City('Atlanta, GA', 33.75, -84.39);
    var city4 = new City('Denver, CO', 39.74, -104.98);
    var city5 = new City('Seattle, WA', 47.61, -122.33);
    var city6 = new City('Los Angeles, CA', 34.05, -118.24);
    var city7 = new City('Memphis, TN', 35.15, -90.05);

    var listCities = [city1, city2, city3, city4, city5, city6, city7];
    var map1 = new Map(listCities);


    function method1(choiceOfCheckBox, inputCity) {

        choiceOfCheckBox = document.getElementById(choiceOfCheckBox);
        choiceCheck = document.getElementById(inputCity);
        var choiceCity = map1.mostCity(inputCity);
        if (choiceOfCheckBox.checked) {
            choiceCheck.style.display = "block";
            document.getElementById(inputCity).innerHTML = choiceCity;
        } else {
            choiceCheck.style.display = "none";
        }
    }

    function method2() {

        const inputLatitude = document.getElementById('lat').value;
        const inputLongitude = document.getElementById('long').value;

        document.getElementById("divClosestCity").innerHTML = map1.findClosestCity(inputLatitude,inputLongitude);
    }

    function method3() {
        var str = map1.getUniqueStates();
        document.getElementById("divAllStates").innerHTML = str;
    }





