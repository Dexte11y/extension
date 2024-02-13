// // Обработчик события загрузки страницы
// window.onload = function() {
//     // Сканируем все блоки <td> с id, содержащим "Offers_"
//     var tdElements = document.querySelectorAll('td[id^="Offers_"]');
//     // Инициализируем пустой массив для хранения id без префикса "Offers_"
//     var ids = [];
//     // Проходимся по всем найденным элементам
//     tdElements.forEach(function(tdElement) {
//         // Получаем id текущего элемента
//         var id = tdElement.id;
//         // Удаляем префикс "Offers_" и добавляем id в массив
//         ids.push(id.substring("Offers_".length));
//     });
//     // Отправляем массив id без префикса "Offers_" на сервер
//     sendIdsToServer(ids);
// };

// // Функция отправки массива id без префикса "Offers_" на сервер
// function sendIdsToServer(ids) {
//     var xhr = new XMLHttpRequest();
//     xhr.open("POST", "http://127.0.0.1:8000/oreon_bestprice", true);
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             console.log("Ids успешно отправлены на сервер:", ids);
//         }
//     };
//     xhr.send(JSON.stringify({ids: ids}));
// }

// Функция отправки массива id без префикса "Offers_" на сервер
function sendIdsToServer(ids) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:8000/oreon_bestprice", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("Ids успешно отправлены на сервер:", ids);
                // Если ответ получен успешно, вызываем функцию обновления страницы с полученными данными
                updatePage(JSON.parse(xhr.responseText));
            } else {
                console.error("Ошибка при отправке запроса на сервер:", xhr.status);
            }
        }
    };
    xhr.send(JSON.stringify({ids: ids}));
}

// Функция обновления страницы с данными из ответа сервера
function updatePage(data) {
    // Находим тег <td> с указанным стилем
    var tdElement = document.querySelector('td[align="center"] > span[style="color:#4AC5FA;font-family:arial;font-size:14px; letter-spacing: 2px"]');
    // Если тег найден
    if (tdElement) {
        // Отображаем полученные данные внутри тега
        tdElement.innerHTML = JSON.stringify(data);
    } else {
        // Если тег не найден, выводим сообщение об ошибке в консоль
        console.error("Тег <td> с указанным стилем не найден на странице.");
    }
}

// Обработчик события загрузки страницы
window.onload = function() {
    // Сканируем все блоки <td> с id, содержащим "Offers_"
    var tdElements = document.querySelectorAll('td[id^="Offers_"]');
    // Инициализируем пустой массив для хранения id без префикса "Offers_"
    var ids = [];
    // Проходимся по всем найденным элементам
    tdElements.forEach(function(tdElement) {
        // Получаем id текущего элемента
        var id = tdElement.id;
        // Удаляем префикс "Offers_" и добавляем id в массив
        ids.push(id.substring("Offers_".length));
    });
    // Отправляем массив id без префикса "Offers_" на сервер
    sendIdsToServer(ids);
};




