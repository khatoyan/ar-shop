document.getElementById('searchBtn').addEventListener('click', function() {
    const searchValue = document.getElementById('search').value.trim();

    fetch('models.json')
        .then(response => response.json())
        .then(data => {
            const model = data.find(item => item.code === searchValue);
            
            if (model) {
                const modelEntity = document.getElementById('modelEntity');
                modelEntity.setAttribute('gltf-model', model.path);
                modelEntity.setAttribute('scale', '0.5 0.5 0.5');
            } else {
                alert('Модель не найдена');
            }
        });
});

document.addEventListener('DOMContentLoaded', function() {
    // Загрузка категорий при загрузке страницы
    loadCategories();
});

function loadCategories() {
    fetch('models.json')
        .then(response => response.json())
        .then(data => {
            const categories = [...new Set(data.map(item => item.category))];
            const categoryContainer = document.getElementById('categoryContainer');
            categoryContainer.innerHTML = '';

            categories.forEach(category => {
                const div = document.createElement('div');
                div.className = 'category-item';
                div.textContent = category;
                div.onclick = () => loadModelsByCategory(category);
                categoryContainer.appendChild(div);
            });
        });
}

function loadModelsByCategory(category) {
    fetch('models.json')
        .then(response => response.json())
        .then(data => {
            const models = data.filter(item => item.category === category);
            const modelContainer = document.getElementById('modelContainer');
            modelContainer.innerHTML = '';

            models.forEach(model => {
                const div = document.createElement('div');
                div.className = 'model-item';
                div.textContent = model.code;
                div.onclick = () => displayModel(model.path);
                modelContainer.appendChild(div);
            });
        });
}

let currentCategoryIndex = 0;
let currentModelIndex = 0;

function slideCategory(direction) {
    const container = document.getElementById('categoryContainer');
    const items = document.querySelectorAll('.category-item');
    currentCategoryIndex = Math.max(0, Math.min(currentCategoryIndex + direction, items.length - 1));
    container.style.transform = translateX(`${-currentCategoryIndex * items[0].offsetWidth}px`);
}

function slideModel(direction) {
    const container = document.getElementById('modelContainer');
    const items = document.querySelectorAll('.model-item');
    currentModelIndex = Math.max(0, Math.min(currentModelIndex + direction, items.length - 1));
    container.style.transform = translateX(`${-currentModelIndex * items[0].offsetWidth}px`);
}

function displayModel(modelPath) {
    const modelEntity = document.getElementById('modelEntity');
    modelEntity.setAttribute('gltf-model', modelPath);
    modelEntity.setAttribute('scale', '0.5 0.5 0.5');
}