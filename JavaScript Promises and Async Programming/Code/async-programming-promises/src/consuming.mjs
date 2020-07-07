import setText, { appendText, showWaiting, hideWaiting } from "./results.mjs";

// 2.1 Consuming promises
export function get() {
    axios.get("http://localhost:3000/orders/1") //HTTP GET request
        .then(({ data }) => {
            setText(JSON.stringify(data));
        });
}

// 2.2 Handling Errors with Promises
export function getCatch() {
    // then() nu se foloseste cu rejected
    // axios.get("http://localhost:3000/orders/123") //HTTP GET request
    //     .then(result => {
    //         if (result.status === 200) {
    //             setText(JSON.stringify(result.data));
    //         } else {
    //             setText("Error!");
    //         }
    //     });
    axios.get("http://localhost:3000/orders/123") //HTTP GET request
        .then(({ data }) => {
            setText(JSON.stringify(data));
        })
        .catch(err => setText(err));
}

// 2.3 Chaining Promises
export function chain() {
    axios.get("http://localhost:3000/orders/1") //HTTP GET request
        .then(({ data }) => {
            return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`); // daca puneam then aici => pyramid of doom
        })
        .then(({ data }) => {
            setText(`City: ${data.city}`);
        })
        ;
}

// 2.4 Catching Errors in a Chain
export function chainCatch() {
    // the error is handled and we do not get an error in the Console
    // axios.get("http://localhost:3000/orders/1") //HTTP GET request
    //     .then(({ data }) => {
    //         axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`); // daca puneam then aici => pyramid of doom
    //     })
    //     .then(({ data }) => {
    //         setText(`City: ${data.city}`);
    //     })
    //     .catch(err => setText(err));
    // axios.get("http://localhost:3000/orders/1") //HTTP GET request
    //     .then(({ data }) => {
    //         axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`); // daca puneam then aici => pyramid of doom

    //         throw new Error("Error in first then()!");
    //     })
    //     .catch(err => { // prinde erori doar din primul then()
    //         setText(err);
    //         return { data: {} };
    //     })
    //     .then(({ data }) => {
    //         setText(`City: ${data.my.city}`);
    //     })
    //     .catch(err => setText(err)); // prinde toate erorile de dupa primul catch() pana la al doilea then()
    // [3.30]
    axios.get("http://localhost:3000/orders/1") //HTTP GET request
        .then(({ data }) => {
            return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`); // daca puneam then aici => pyramid of doom
        })
        .then(({ data }) => {
            setText(`City: ${data.city}`);
        })
        .catch(err => setText(err)); // prinde toate erorile de dupa primul catch() pana la al doilea then()
}

// 2.5 Performing One Last Operation
export function final() {

    showWaiting();

    axios.get("http://localhost:3000/orders/1") //HTTP GET request
        .then(({ data }) => {
            return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`); // daca puneam then aici => pyramid of doom
        })
        .then(({ data }) => {
            setText(`City: ${data.city}`);
        })
        .catch(err => setText(err)) // prinde toate erorile de dupa primul catch() pana la al doilea then()
        .finally(() => {
            setTimeout(() => {
                hideWaiting();
            }, 1500);

            appendText("--- completely done! ---");
        });
}