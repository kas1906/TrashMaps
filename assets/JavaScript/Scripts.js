/**
 * Created by Кель on 18.11.2014.
 */
var myMap;
var placeMarks = [];
var clicked = [];
var routeClicked = false;
var currentRoute;

function parameterStringBuilder() {
    var out = "";

}

ymaps.ready(function () {
    myMap = new ymaps.Map('map', {
        center: [55.751574, 37.573856],
        zoom: 11,
        type : 'yandex#satellite'
    }), firstButton = new ymaps.control.Button("Построить маршрут"),
        listBox = getCities();
    myMap.controls.add(firstButton, {float: 'right'});

    //var adress = window.location.toString();
    //console.log(adress);
    //var sharpIndex = adress.indexOf('#');
    //if (sharpIndex > 0) {
    //    var func = adress.substr(sharpIndex + 1);
    //    if (func === '123') {
    //        addPlaceMark([55.770324,37.377022]);
    //    }
    //    if (func === '234') {
    //        addPlaceMark([55.812248,37.553514]);
    //    }
    //}

    firstButton.events.add('click', function (e) {
        if (!routeClicked) {
            addRoute();
            firstButton.data.set('content', "Убрать маршрут");
            routeClicked = true;
        } else {
            firstButton.data.set('content', "Построить маршрут");
            routeClicked = true;
            myMap.geoObjects.remove(currentRoute);
        }
    });
    addPlaceMark([55.771574, 37.573856]);
    addPlaceMark([55.76, 37.67]);
    addPlaceMark([55.66, 37.47]);
    addTruck([55.72, 37.57]);
});
