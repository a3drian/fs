
changePercentOff(32);

// let person = {};

// person.FirstName = 'John';

// console.log(person);

let mySymbol = Symbol();

let person = {
    name: 'Adi',
    lastName: 'Manghiuc',
    age: 26,
    [mySymbol]: 'secret information',
    showInfo: function () {
        console.log(`${this.name} is of age ${this.age}.`);
    }
};

person[mySymbol] = 'whaaat';

console.log(person);
person.showInfo();

const header = document.getElementById('message');

header.style.color = 'black';
header.style.fontWeight = '600';

const button = document.getElementById('see-review');

// button.addEventListener('click', function(){
//     console.log('clicked');
// });

const divReview = document.getElementById('review');

let divReviewFunc = function () {
    
    if (divReview.classList.contains('d-none')) {

        divReview.classList.remove('d-none');
        button.textContent = 'Hide';
        console.log('hidden');

    } else {

        divReview.classList.add('d-none');
        button.textContent = 'Show';
        console.log('shown');

    }
}

button.addEventListener('click', divReviewFunc);