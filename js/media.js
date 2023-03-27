'use strict';
console.log('media js is connected!');


//add some volume randomization
const levees = document.getElementById('levees');
console.log('🚀 ~ file: media.js:7 ~ levees:', levees);

const randomizer = document.getElementById('randomizer');
console.log('🚀 ~ file: media.js:10 ~ randomizer:', randomizer);


randomizer.addEventListener('click', function(){
  levees.volume = Math.random();
  console.log(levees.volume);
  levees.autoPlay = true;
});

