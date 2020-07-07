import setText, { appendText } from "./results.mjs";

// 3.1 Creating Promises
export function timeout() {
    const wait = new Promise((resolve) => {
        setTimeout(() => {
            resolve("Timeout!"); // the return value
        }, 1500);
    });

    wait.then(text => setText(text));
}

// 3.2 Understanding Promise States
export function interval() {
    let counter = 1;
    const wait = new Promise((resolve) => {
        setInterval(() => {
            resolve(`Timeout! ${counter++} times.`); // the return value
            console.log(counter);
        }, 1500);
    });

    wait.then(text => setText(text))
        .finally(() => appendText(`--- done ${counter} ---`));
}

export function clearIntervalChain() {
    let counter = 1;
    let interval;
    const wait = new Promise((resolve) => {
        interval = setInterval(() => {
            resolve(`Timeout! ${counter++} times.`); // the return value
            console.log(counter);
        }, 1500);
    });

    wait.then(text => setText(text))
        .finally(() => clearInterval(interval)); // this will stop the interval
}

// 3.3 Rejecting a Promise
export function xhr() {
    // let request = new Promise((resolve, reject) => {
    //     let xhr = new XMLHttpRequest();
    //     xhr.open("GET", "http://localhost:3000/users/7");

    //     xhr.onload = () => resolve(xhr.responseText);
    //     xhr.onerror = () => reject("Request failed!"); // only called when something like an network error occurs 

    //     xhr.send();
    // });

    // request.then(result => setText(result))
    //     .catch(reason => setText(reason));

    // putting code in onload
    let request = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/users/7");

        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject(xhr.statusText); // should return a 404
            }
        }
        xhr.onerror = () => reject("Request failed!"); // only called when something like an network error occurs 

        xhr.send();
    });

    request.then(result => setText(result))
        .catch(reason => setText(reason));
}

// 3.4 Waiting for All Promises to Resolve
export function allPromises() {
    // with error
    // let categories = axios.get("http://localhost:3000/itemCategories");
    // let statuses = axios.get("http://localhost:3000/orderStatuses");
    // let userTypes = axios.get("http://localhost:3000/userTypes");

    // // what happens when a call fails?
    // let addressType = axios.get("http://localhost:3000/addressType");

    // Promise.all([categories, statuses, userTypes, addressType])
    //     .then(([categs, stats, users, addresses]) => {
    //         setText("");

    //         appendText(JSON.stringify(categs.data));
    //         appendText("\n");
    //         appendText(JSON.stringify(stats.data));
    //         appendText("\n");
    //         appendText(JSON.stringify(users.data));
    //         appendText("\n");
    //         appendText(JSON.stringify(addresses.data));
    //         appendText("\n");
    //     })
    //     .catch(reasons => setText(reasons)); // when the call fails because of addresses

    // without error
    let categories = axios.get("http://localhost:3000/itemCategories");
    let statuses = axios.get("http://localhost:3000/orderStatuses");
    let userTypes = axios.get("http://localhost:3000/userTypes");

    Promise.all([categories, statuses, userTypes])
        .then(([categs, stats, users]) => {
            setText("");

            appendText(JSON.stringify(categs.data));
            appendText("\n");
            appendText(JSON.stringify(stats.data));
            appendText("\n");
            appendText(JSON.stringify(users.data));
            appendText("\n");
        })
        .catch(reasons => setText(reasons)); // when the call fails because of addresses
}

// 3.5 Setting All Promises
export function allSettled() {

    let categories = axios.get("http://localhost:3000/itemCategories");
    let statuses = axios.get("http://localhost:3000/orderStatuses");
    let userTypes = axios.get("http://localhost:3000/userTypes");

    // what happens when a call fails?
    let addressType = axios.get("http://localhost:3000/addressType");

    Promise.allSettled([categories, statuses, userTypes, addressType])
        .then((values) => {
            let results = values.map(v => {
                if (v.status === 'fulfilled') {
                    return `FULFILLED: ${JSON.stringify(v.value.data[0])} `; // takes only the first element of the data that was received
                }

                return `REJECTED: ${v.reason.message} `;
            })

            setText(results);
        })
        .catch(reasons => setText(reasons)); // when the call fails because of addresses
}

// 3.6 Racing Promises
export function race() {
    let users = axios.get("http://localhost:3000/users");
    let backup = axios.get("http://localhost:3001/users");

    Promise.race([users, backup])
        .then(usersData => setText(JSON.stringify(usersData.data)))
        .catch(reason => setText(reason));
}