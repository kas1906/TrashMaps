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
    firstButton.events.add('click', function (e) {
        if (!routeClicked) {
            addRoute();
            firstButton.data.set('content', "Убрать маршрут");
            routeClicked = true;
        } else {
            firstButton.data.set('content', "Построить маршрут");
            routeClicked = false;
            //location.reload(true);
            myMap.geoObjects.remove(currentRoute);
        }
    });

    addPlaceMark([55.771574, 37.573856]);
    addPlaceMark([55.76, 37.67]);
    addPlaceMark([55.66, 37.47]);
    addTruck([55.72, 37.57]);
});
