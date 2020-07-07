function showMessage(message) {
    document.getElementById('message').textContent = message;
}

function showPercent(percent) {
    document.getElementById('percent-off').textContent = percent + '% OFF';
}

function logMessage() {
    console.log('Message from logMessage()');
}

let fn = function () {
    console.log('Message from fn()');
}

function doubleTheValue(value){
    console.log(`value=${value}`);
    return value * 2;
}