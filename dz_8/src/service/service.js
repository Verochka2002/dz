
export const service = (method, path, body) => (
    new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, path, true);
        if (body) {
            xhr.setRequestHeader("Content-type", "application/json");
        }
        xhr.send(body);
        xhr.onload = (event) => {
            resolve(JSON.parse(event.target.response));
        };
    })
)