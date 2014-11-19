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

function addPolygon() {
    var myGeoObject = new ymaps.GeoObject({
        geometry: {
            type: "Polygon",
            coordinates: [
                [
                    [55.793288,49.126733],
                    [55.797047,49.092043],
                    [55.801211,49.140748]
                ]
            ]
        },
        // Описываем свойства геообъекта.
        properties:{
            // Содержимое балуна.
            balloonContent: "Многоугольник"
        }
    }, {
        // Описываем опции геообъекта.
        // Цвет заливки.
        fillColor: '#00FF00',
        // Цвет обводки.
        strokeColor: '#0000FF',
        // Общая прозрачность (как для заливки, так и для обводки).
        opacity: 0.5,
        // Ширина обводки.
        strokeWidth: 5,
        // Стиль обводки.
        strokeStyle: 'shortdash'
    });

    // Добавляем многоугольник на карту.
    myMap.geoObjects.add(myGeoObject);

    // Создаем многоугольник, используя вспомогательный класс Polygon.
    //var myPolygon = new ymaps.Polygon([
    //    // Указываем координаты вершин многоугольника.
    //    // Координаты вершин внешнего контура.
    //    [
    //        [55.75, 37.50],
    //        [55.80, 37.60],
    //        [55.75, 37.70],
    //        [55.70, 37.70],
    //        [55.70, 37.50]
    //    ],
    //    // Координаты вершин внутреннего контура.
    //    [
    //        [55.75, 37.52],
    //        [55.75, 37.68],
    //        [55.65, 37.60]
    //    ]
    //], {
    //    // Описываем свойства геообъекта.
    //    // Содержимое балуна.
    //    hintContent: "Многоугольник"
    //}, {
    //    // Задаем опции геообъекта.
    //    // Цвет заливки.
    //    fillColor: '#00FF0088',
    //    // Ширина обводки.
    //    strokeWidth: 5
    //});
    //
    //// Добавляем многоугольник на карту.
    //myMap.geoObjects.add(myPolygon);
}
