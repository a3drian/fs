import setText, { appendText } from './results.mjs';

// 4.2 Awaitng a Call
export async function get() {
    const { data } = await axios.get("http://localhost:3000/orders/1");
    setText(JSON.stringify(data));
}

// 4.3 Handling Errors with Async/Await
export async function getCatch() {
    try {
        const { data } = await axios.get("http://localhost:3000/orders/123"); // 123 to get an error
        setText(JSON.stringify(data));
    } catch (error) {
        setText(error);
    }
}

// 4.4 Chaining Async/Await
export async function chain() {
    const { data } = await axios.get("http://localhost:3000/orders/1");
    const { data: address } = await axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`); // address data

    setText(`City: ${JSON.stringify(address.city)}`);
}

// 4.5 Awaiting Concurrent Requests
export async function concurrent() {
    const orderStatus = axios.get("http://localhost:3000/orderStatuses");
    const orders = axios.get("http://localhost:3000/orders");

    setText("");

    // nu facem nimic cu orders pana nu terminam cu orderStatuses
    const { data: statuses } = await orderStatus; // because orderStatus is a promise
    const { data: order } = await orders;

    appendText(JSON.stringify(statuses));
    appendText(JSON.stringify(order[0]));
}

// 4.6 Awaiting Parallel Calls
export async function parallel() {

    setText("");

    // building 2 promises in the array Promise.all()
    await Promise.all([
        (async () => { // anonymous async function => returns the first promise
            // basic async/await call to get the order statuses:
            const { data } = await axios.get("http://localhost:3000/orderStatuses");
            appendText(JSON.stringify(data));
        })(),
        (async () => { // anonymous async function => returns the first promise
            // basic async/await call to get the order statuses:
            const { data } = await axios.get("http://localhost:3000/orders");
            appendText(JSON.stringify(data));
        })()
    ]);
}