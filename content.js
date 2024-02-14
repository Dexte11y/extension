// Функция отправки массива id без префикса "Offers_" на сервер
function sendIdsToServer(ids) {
    // Проверяем текущий URL страницы
    if (window.location.href.startsWith('https://optvideo.com/')) {
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
    } else {
        console.log("Текущий сайт не соответствует условию отправки запроса.");
    }
}

// Функция обновления страницы с данными из ответа сервера
function updatePage(data) {
    // Находим все блоки <td> с id, содержащим "Offers_"
    var tdElements = document.querySelectorAll('td[id^="Offers_"]');
    
    // Проходимся по всем найденным элементам
    tdElements.forEach(function(tdElement) {
        // Получаем id текущего элемента
        var id = tdElement.id;
        
        // Извлекаем номер предложения из id элемента
        var offerId = id.substring("Offers_".length);
        
        // Проверяем, есть ли значение для этого предложения в данных с сервера
        if (data.hasOwnProperty(id)) {
            // Создаем элемент для вставки значения из ответа с сервера
            var responseElement = document.createElement('div');
            responseElement.innerHTML = '<table><tbody><tr><td>' + data[id] + ' Р' + '</td></tr></tbody></table>';
            
            // Вставляем элемент с ответом перед закрывающим тегом </td>
            tdElement.appendChild(responseElement);
        }
    });
}

// Обработчик события загрузки страницы
window.onload = function() {
    // Проверяем текущий URL страницы
    if (window.location.href.startsWith('https://optvideo.com/')) {
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
    } else {
        console.log("Текущий сайт не соответствует условию отправки запроса.");
    }
};





