function addPlaceMark(coord) {
    var myPlacemark = new ymaps.Placemark(coord, {
        hintContent: 'Trash'
    }, {
        iconLayout: 'default#image',
        //iconImageHref: 'file:///android_asset/Images/trash.png',
        iconImageHref: 'Images/trash.png',
        iconImageSize: [30, 30]
    });
    myMap.geoObjects.add(myPlacemark);
    placeMarks.push(myPlacemark);
    myPlacemark.events
        .add('click', function (e) {
            var index;
            if ((index = clicked.indexOf(myPlacemark)) >= 0) {
                clicked.splice(index, 1);
                alert('unclicked')
            } else {
                clicked.push(myPlacemark);
                alert('clicked')
            }
            console.log(clicked);

        });

}

function addTruck(coord) {
    var myPlacemark = new ymaps.Placemark(coord, {
        hintContent: 'TrashTruck'
    }, {
        iconLayout: 'default#image',
        //iconImageHref: 'file:///android_asset/Images/truck.png',
        iconImageHref: 'Images/truck.png',
        iconImageSize: [20, 20],
        draggable: true
    });
    myPlacemark.events
        .add('click', function (e) {
            var index;
            if ((index = clicked.indexOf(myPlacemark)) >= 0) {
                clicked.splice(index, 1);
                alert('unclicked')
            } else {
                clicked.push(myPlacemark);
                alert('clicked')
            }
            console.log(clicked);

        });
    placeMarks.push(myPlacemark);
    myMap.geoObjects.add(myPlacemark);
}


function addRoute() {
    ymaps.route(
        parameterBuilder()
    ).then(function (route) {
        currentRoute = route;
        myMap.geoObjects.add(route);
        var points = route.getWayPoints(),
            lastPoint = points.getLength() - 1;
        points.options.set('iconImageHref', './images/transparent.png');
    }, function (error) {
        alert('Возникла ошибка: ' + error.message);
    });
}

function addPolygon(array) {
    var myPolygon = new ymaps.Polygon([
        array
    ], {
        hintContent: "Многоугольник"
    }, {
        fillColor: '#00FF0088',
        strokeWidth: 5
    });

    myMap.geoObjects.add(myPolygon);
}
