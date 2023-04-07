fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((data) => {
        data.map((item) => {
            console.log(item.name.toUpperCase());
        });
    });
