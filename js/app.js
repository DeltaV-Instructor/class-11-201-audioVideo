'use strict';
console.log('pizza js connected.');

let pizzaContainer = document.querySelector('section');
let resultButton = document.querySelector('section + div');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let clicks = 0;
let maxClicks = 10;
Pizza.allPizzasArray = [];

function Pizza(name, src) {
  this.name = name;
  this.imageSrc = src;
  this.views = 0;
  this.clickedOn = 0;
  Pizza.allPizzasArray.push(this);
}

function getRandomNumber() {
  return Math.floor(Math.random() * Pizza.allPizzasArray.length);
}

function renderPizzas() {
  let pizza1 = getRandomNumber();
  let pizza2 = getRandomNumber();

  while (pizza1 === pizza2) {
    pizza2 = getRandomNumber();
  }
  image1.src = Pizza.allPizzasArray[pizza1].imageSrc;
  image2.src = Pizza.allPizzasArray[pizza2].imageSrc;
  image1.alt = Pizza.allPizzasArray[pizza1].name;
  image2.alt = Pizza.allPizzasArray[pizza2].name;

  Pizza.allPizzasArray[pizza1].views++;
  Pizza.allPizzasArray[pizza2].views++;
}

function handlePizzaClick(event) {
  if (event.target === pizzaContainer) {
    alert('Please click on an image!!!!');
  }
  clicks++;
  let clickedOnPizza = event.target.alt;
  for (let i = 0; i < Pizza.allPizzasArray.length; i++) {
    if (clickedOnPizza === Pizza.allPizzasArray[i].name) {
      Pizza.allPizzasArray[i].clickedOn++;
      break;
    }
  }
  if (clicks === maxClicks) {
    pizzaContainer.removeEventListener('click', handlePizzaClick);
    resultButton.addEventListener('click', renderResults);
    pizzaContainer.className = 'no-voting';
  } else {
    renderPizzas();
  }
} //closes the handle clicks function

function renderResults() {
  let ul = document.querySelector('ul');
  for (let i = 0; i < Pizza.allPizzasArray.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${Pizza.allPizzasArray[i].name} had ${Pizza.allPizzasArray[i].views} views and was clicked ${Pizza.allPizzasArray[i].clickedOn} times.`;
    ul.appendChild(li);
  }
}

new Pizza('Brick Oven Pizza', 'assets/images/brickOvenPizza.jpg');
new Pizza('Calzone', 'assets/images/calzonePizza.jpg');
new Pizza('Chicago Deep Dish', 'assets/images/chicagoPizza.jpg');
new Pizza('Chicago Pizza and Oven Grinder', 'assets/images/cpoGinderPizza.jpg');
new Pizza('Detroit Style', 'assets/images/detroitPizza.jpg');
new Pizza('Papa Vito\'s Thin', 'assets/images/mwDeluxePizzaThinCrust.jpg');
new Pizza('New York Thin', 'assets/images/newYorkPizza.jpg');
new Pizza('Shot Gun Dans Pizza', 'assets/images/sgDansHtossedMeatLovPizza.jpg');

renderPizzas();

//add listener
pizzaContainer.addEventListener('click', handlePizzaClick);
