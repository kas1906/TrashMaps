function addPlaceMark(coord) {
    var myPlacemark = new ymaps.Placemark(coord, {
        hintContent: 'Trash'
    }, {
        iconLayout: 'default#image',
        iconImageHref: './images/trash.png',
        iconImageSize: [20, 20]
    });
    myMap.geoObjects.add(myPlacemark);
    placeMarks.push(myPlacemark);
    myPlacemark.events
        .add('click', function (e) {
            var index;
            if ((index = clicked.indexOf(myPlacemark)) >= 0) {
                clicked.splice(index, 1);
            } else {
                clicked.push(myPlacemark);
            }
            console.log(clicked);
        });

}

function addTruck(coord) {
    var myPlacemark = new ymaps.Placemark(coord, {
        hintContent: 'TrashTruck'
    }, {
        iconLayout: 'default#image',
        iconImageHref: './images/truck.png',
        iconImageSize: [20, 20],
        draggable: true
    });
    myMap.geoObjects.add(myPlacemark);
    placeMarks.push(myPlacemark);
    myPlacemark.events
        .add('click', function (e) {
            var index;
            if ((index = clicked.indexOf(myPlacemark)) >= 0) {
                clicked.splice(index, 1);
            } else {
                clicked.push(myPlacemark);
            }
            console.log(clicked);
        });

}

function addRoute() {
    ymaps.route([
        [55.771574, 37.573856],
        [55.76, 37.67],
        [55.72, 37.57],
        [55.66, 37.47]
    ]).then(function (route) {
        currentRoute = route;
        myMap.geoObjects.add(route);
        var points = route.getWayPoints(),
            lastPoint = points.getLength() - 1;
        points.options.set('iconImageHref', './images/transparent.png');
    }, function (error) {
        alert('Возникла ошибка: ' + error.message);
    });
}

function getCities() {
    // Создадим собственный макет выпадающего списка.
    ListBoxLayout = ymaps.templateLayoutFactory.createClass(
        "<button id='my-listbox-header' class='btn btn-success dropdown-toggle' data-toggle='dropdown'>" +
        "{{data.title}} <span class='caret'></span>" +
        "</button>" +
            // Этот элемент будет служить контейнером для элементов списка.
            // В зависимости от того, свернут или развернут список, этот контейнер будет
            // скрываться или показываться вместе с дочерними элементами.
        "<ul id='my-listbox'" +
        " class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu'" +
        " style='display: {% if state.expanded %}block{% else %}none{% endif %};'></ul>", {

            build: function () {

                // Вызываем метод build родительского класса перед выполнением
                // дополнительных действий.
                ListBoxLayout.superclass.build.call(this);

                this.childContainerElement = $('#my-listbox').get(0);
                // Генерируем специальное событие, оповещающее элемент управления
                // о смене контейнера дочерних элементов.
                this.events.fire('childcontainerchange', {
                    newChildContainerElement: this.childContainerElement,
                    oldChildContainerElement: null
                });
            },

            // Переопределяем интерфейсный метод, возвращающий ссылку на
            // контейнер дочерних элементов.
            getChildContainerElement: function () {
                return this.childContainerElement;
            },

            clear: function () {
                // Заставим элемент управления перед очисткой макета
                // откреплять дочерние элементы от родительского.
                // Это защитит нас от неожиданных ошибок,
                // связанных с уничтожением dom-элементов в ранних версиях ie.
                this.events.fire('childcontainerchange', {
                    newChildContainerElement: null,
                    oldChildContainerElement: this.childContainerElement
                });
                this.childContainerElement = null;
                // Вызываем метод clear родительского класса после выполнения
                // дополнительных действий.
                ListBoxLayout.superclass.clear.call(this);
            }
        }),

        // Также создадим макет для отдельного элемента списка.
        ListBoxItemLayout = ymaps.templateLayoutFactory.createClass(
            "<li><a>{{data.content}}</a></li>"
        ),

        // Создадим 2 пункта выпадающего списка
        listBoxItems = [
            new ymaps.control.ListBoxItem({
                data: {
                    content: 'Москва',
                    center: [55.751574, 37.573856],
                    zoom: 9
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    content: 'Казань',
                    center: [55.796708, 49.115127],
                    zoom: 9
                }
            })
        ],

        // Теперь создадим список, содержащий 2 пунтка.
        listBox = new ymaps.control.ListBox({
            items: listBoxItems,
            data: {
                title: 'Выберите пункт'
            },
            options: {
                // С помощью опций можно задать как макет непосредственно для списка,
                layout: ListBoxLayout,
                // так и макет для дочерних элементов списка. Для задания опций дочерних
                // элементов через родительский элемент необходимо добавлять префикс
                // 'item' к названиям опций.
                itemLayout: ListBoxItemLayout
            }
        });

    listBox.events.add('click', function (e) {
        // Получаем ссылку на объект, по которому кликнули.
        // События элементов списка пропагируются
        // и их можно слушать на родительском элементе.
        var item = e.get('target');
        // Клик на заголовке выпадающего списка обрабатывать не надо.
        if (item != listBox) {
            myMap.setCenter(
                item.data.get('center'),
                item.data.get('zoom')
            );
        }
    });

    return listBox;
}
