// content.js

// Функция для поиска блоков с указанными атрибутами и добавления стоимости к ним
function addPriceToBlocks() {
    // Используем селектор CSS для поиска всех элементов, у которых id начинается с "Offers_"
    var blocks = document.querySelectorAll('[id^="Offers_"][rowspan="2"][valign="top"]');

    // Перебираем найденные элементы и добавляем к ним стоимость
    blocks.forEach(function(block) {
        // Создаем элемент с указанной стоимостью
        var priceElement = document.createElement('p');
        priceElement.textContent = '1500 Р'; // Замените на вашу логику получения стоимости

        // Добавляем созданный элемент к текущему блоку
        block.appendChild(priceElement);
    });
}

// Вызываем функцию для поиска блоков и добавления стоимости к ним при загрузке страницы
addPriceToBlocks();
