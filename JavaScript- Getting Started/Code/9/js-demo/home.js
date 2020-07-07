
const button = document.getElementById('see-review');

button.addEventListener('click', function() {

    const review = document.getElementById('review');

    if (review.classList.contains('d-none')) {
        review.classList.remove('d-none');
        button.textContent = 'CLOSE REVIEW';
    }
    else {
        review.classList.add('d-none');
        button.textContent = 'SEE REVIEW';
    }
    

});

let values = [];
values = Array.of(2*3);
console.log(values);
console.log(typeof values);
console.log(Array.isArray(values));

const val = ['a', 'b', 'c'];
val.push('d');
console.log(val);

//9.7
const containers = document.getElementsByClassName('container');
console.log(containers);

containers[2].classList.add('d-none'); //ascunde elementul 'crf-cigar-banner'