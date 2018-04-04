
<script src="https://api-maps.yandex.ru/2.0/?load=package.full&lang=ru-RU" type="text/javascript"></script> 
<script type="text/javascript">
    ymaps.ready(init); // карта соберется после загрузки скрипта и элементов
    var myMap; // заглобалим переменную карты чтобы можно было ею вертеть из любого места
	var markerCONST = "/html/img/marker.png", markerActiveCONST = "/html/img/marker-active.png";
    function init() { // функция - собиралка карты и фигни
      myMap = new ymaps.Map("map", { // создаем и присваиваем глобальной переменной карту и суем её в див с id="map"
        center: [55.768603, 37.635251], // ну тут центр
        behaviors: ['default', 'scrollZoom'], // скроллинг колесом
        zoom: 5 // тут масштаб
      });
      myMap.controls // добавим всяких кнопок, в скобках их позиции в блоке
        .add('zoomControl', {
          left: 5,
          top: 5
        }); //Масштаw

      var balloonStylesDefault = {
        iconImageHref: markerCONST, // картинка иконки
        iconImageSize: [54, 63], // размер иконки
        iconImageOffset: [-32, -64], // позиция иконки
        balloonContentSize: [270, 99], // размер нашего кастомного балуна в пикселях
        balloonImageOffset: [-65, -89], // смещание балуна, надо подогнать под стрелочку
        balloonImageSize: [260, 89], // размер картинки-бэкграунда балуна
        balloonShadow: false,
        balloonAutoPan: false // для фикса кривого выравнивания
      };

      /* Создаем кастомные метки */
      var myGeoObjects = new ymaps.GeoObjectCollection({});
      var myPlacemark0 = new ymaps.Placemark([55.768603,37.635251], null, balloonStylesDefault);
      myPlacemark0.name = "moscow";

      var myPlacemark1 = new ymaps.Placemark([51.53582,46.017907], null, balloonStylesDefault);
      myPlacemark1.name = "saratov";

      var myPlacemark2 = new ymaps.Placemark([55.896544,49.138861], null, balloonStylesDefault);
      myPlacemark2.name = "kazan";

      var myPlacemark3 = new ymaps.Placemark([57.821848, 28.355888], null, balloonStylesDefault);
      myPlacemark3.name = "pskov";

      var myPlacemark4 = new ymaps.Placemark([58.362117,25.582672], null, balloonStylesDefault);
      myPlacemark4.name = "estonia";

      var myPlacemark5 = new ymaps.Placemark([59.939095,30.315868], null, balloonStylesDefault);
      myPlacemark5.name = "saint-petersburg";

      var myPlacemark6 = new ymaps.Placemark([44.584526,33.483552], null, balloonStylesDefault);
      myPlacemark6.name = "sevastopol";

      myGeoObjects.add(myPlacemark0);
      myGeoObjects.add(myPlacemark1);
      myGeoObjects.add(myPlacemark2);
      myGeoObjects.add(myPlacemark3);
      myGeoObjects.add(myPlacemark4);
      myGeoObjects.add(myPlacemark5);
      myGeoObjects.add(myPlacemark6);

      myMap.geoObjects.add(myGeoObjects);
      myMap.setBounds(myGeoObjects.getBounds());

      var activeMarker = myPlacemark0;
        myPlacemark0.options.set('iconImageHref', markerActiveCONST);
        myGeoObjects.events.add("click", function(e) {
          resetActiveMarkers();
          activeMarker = e.get('target');
		  console.log(activeMarker.name);
          $(".tt-contact-item." + activeMarker.name).parent().addClass("active");
          e.get('target').options.set('iconImageHref', markerActiveCONST);
          e.preventDefault();
        });

      function resetActiveMarkers() {
        $(".contact-item").removeClass("active");
        if (activeMarker)
            activeMarker.options.set('iconImageHref', markerCONST);
      }

      /* Фикс кривого выравнивания кастомных балунов */
      myMap.geoObjects.events.add([
        'balloonopen'
      ], function(e) {
        var geoObject = e.get('target');
        myMap.panTo(geoObject.geometry.getCoordinates(), {
          delay: 0
        });
      });

    }
  </script>