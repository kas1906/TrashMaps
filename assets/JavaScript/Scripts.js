/**
 * Created by Кель on 18.11.2014.
 */
var myMap;
var placeMarks = [];
var clicked = [];
var routeClicked = false;
var currentRoute;
var trucks = [];
var buckets = [];
var areas = [];
var mainArea;
var isAreasShown = false, isTruckVisible = true, isBucketsVisible = true, isSatelliteMode = false;

function changeZoneColor(color) {
    mainArea.options.set('fillColor', color);
}

function drawAreas() {
    addPolygon(firstRegion, true);
    addPolygon(fifthRegion, false);
    addPolygon(secondRegion, false);
    addPolygon(thirdRegion, false);
    addPolygon(fourRegion, false);
    addPolygon(sixthRegion, false);
}

function showTrucks() {
    for (var i = 0; i < trucks.length; i++) {
        trucks[i].options.set('visible', true);
    }
}

function hideTrucks() {
    for (var i = 0; i < trucks.length; i++) {
        trucks[i].options.set('visible', false);
    }
}

function changeTruckVisible() {
    if (isBucketsVisible) {
        hideTrucks();
        isBucketsVisible = false;
    } else {
        showTrucks();
        isBucketsVisible = true;
    }
}

function showBuckets() {
    for (var i = 0; i < buckets.length; i++) {
        buckets[i].options.set('visible', true);
    }
}

function hideBuckets() {
    for (var i = 0; i < buckets.length; i++) {
        buckets[i].options.set('visible', false);
    }
}

function changeBucketVisible() {
    if (isTruckVisible) {
        hideBuckets();
        isTruckVisible = false;
    } else {
        showBuckets();
        isTruckVisible = true;
    }
}

function hideAreas() {
    for (var i = 0; i < areas.length; i++) {
        areas[i].options.set('visible', false);
    }
}

function showAreas() {
    for (var i = 0; i < areas.length; i++) {
        areas[i].options.set('visible', true);
    }
}

function changeRegionMap() {
    if (isAreasShown) {
        hideAreas();
        isAreasShown = false;
    } else {
        showAreas()
        isAreasShown = true;
    }
}


function parameterBuilder() {
    var out = [];
    for (var index = 0; index < clicked.length; index++) {
        out[index] = clicked[index].geometry.getCoordinates();
    }
    console.log(out);
    return out;

}

function changeMapType() {
    if (!isSatelliteMode) {
        myMap.setType('yandex#satellite');
        isSatelliteMode = true;
    } else {
        myMap.setType('yandex#map');
        isSatelliteMode = false;
    }
}

function drawCustomRoute() {
    if (!routeClicked) {
        addRoute();
        routeClicked = true;
    } else {
        routeClicked = false;
        myMap.geoObjects.remove(currentRoute);
    }
}

ymaps.ready(function () {
        myMap = new ymaps.Map('map', {
            center: [55.796395, 49.106971],
            zoom: 12,
            type: 'yandex#map',
            controls: []
        });

        var latitude = ymaps.geolocation.latitude;
        var longitude = ymaps.geolocation.longitude;
        console.log(latitude);
        console.log(longitude);

    drawAreas();
    hideAreas();
    addPlaceMark([55.793288, 49.126733]); // наш
    addPlaceMark([55.773226,49.098625]); // оранжевый
    buckets[1].options.set('iconImageHref', 'Icons/trash-orange-stroke.png');
    addPlaceMark([55.752654,49.166603]);//красный
    buckets[2].options.set('iconImageHref', 'Icons/trash-red-stroke.png');
    addPlaceMark([55.797047, 49.092043]);
    addPlaceMark([55.801211, 49.140748]);
    addTruck([latitude, longitude]); //наш муссоровоз
    addTruck([55.773556, 49.171588]);
    addTruck([55.801829, 48.991953]);

});
