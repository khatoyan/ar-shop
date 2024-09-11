document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const code = document.getElementById('code').value;
    const category = document.getElementById('category').value;
    const path = document.getElementById('path').value;

    if (code && category && path) {
        const newModel = {
            code: code,
            category: category,
            path: path
        };

        fetch('models.json')
            .then(response => response.json())
            .then(data => {
                data.push(newModel);
                return fetch('models.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            });
    }
});