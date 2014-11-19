/**
 * Created by Кель on 18.11.2014.
 */
var myMap;
var placeMarks = [];
var clicked = [];
var routeClicked = false;
var currentRoute;

function parameterBuilder() {
    var out = [];
    for (var index = 0; index < clicked.length; index++) {
        out[index] = clicked[index].geometry.getCoordinates();
    }
    console.log(out);
    return out;

}

ymaps.ready(function () {

    myMap = new ymaps.Map('map', {
        center: [55.796395,49.106971],
        zoom: 13,
        type: 'yandex#satellite'
    }), firstButton = new ymaps.control.Button("Построить маршрут"),
    myMap.controls.add(firstButton, {float: 'right'});
    firstButton.events.add('click', function (e) {
        if (!routeClicked) {
            addRoute();
            firstButton.data.set('content', "Убрать маршрут");
            routeClicked = true;
        } else {
            firstButton.data.set('content', "Построить маршрут");
            routeClicked = false;
            myMap.geoObjects.remove(currentRoute);
        }
    });



    addPlaceMark([55.793288,49.126733]);
    addPlaceMark([55.797047,49.092043]);
    addPlaceMark([55.801211,49.140748]);
    addTruck([55.773556,49.151588]);
});
