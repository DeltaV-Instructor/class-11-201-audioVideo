'use strict';
console.log('pizza js connected.');

let pizzaContainer = document.querySelector('section');
let resultButton = document.querySelector('section + div');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let clicks = 0;
let maxClicks = 10;
Pizza.allPizzasArray = [];

function Pizza(name, src, views, clickedOn) {
  this.name = name;
  this.imageSrc = src;

  // this.views = 0;
  if(views){
    this.views = views;
  } else {
    this.views = 0;
  }
  // this.clickedOn = 0;
  if(clickedOn){
    this.clickedOn = clickedOn;
  } else {
    this.clickedOn = 0;
  }


  Pizza.allPizzasArray.push(this);
}



//get Json out of local storage
//if we have local storage then 1. parse back into objects
//2. run them though our constructor function
//3. else check to see if no local storage then run the regular new calls to our constructor functions
let savedPizzaString = localStorage.getItem('savedPizza');
console.log('local storage?',savedPizzaString);


if(savedPizzaString){
  let arrayOfNotPizzaObject = JSON.parse(savedPizzaString);
  console.log('🚀 ~ file: app.js:32 ~ arrayOfNotPizzaObject:', arrayOfNotPizzaObject);
  //once we have object we are going to run them through our constructor function so that they are Pizza objects.
  for(let j = 0; j < arrayOfNotPizzaObject.length; j++){
    new Pizza(
      this.name = arrayOfNotPizzaObject[j].name,
      this.imageSrc = arrayOfNotPizzaObject[j].imageSrc,
      this.views = arrayOfNotPizzaObject[j].views,
      this.clickedOn = arrayOfNotPizzaObject[j].clickedOn
    );
  }
} else {
  // first time through these create our objects so that we can add data. 
  new Pizza('Brick Oven Pizza', 'assets/images/brickOvenPizza.jpg');
  new Pizza('Calzone', 'assets/images/calzonePizza.jpg');
  new Pizza('Chicago Deep Dish', 'assets/images/chicagoPizza.jpg');
  new Pizza('Chicago Pizza and Oven Grinder', 'assets/images/cpoGinderPizza.jpg');
  new Pizza('Detroit Style', 'assets/images/detroitPizza.jpg');
  new Pizza('Papa Vito\'s Thin', 'assets/images/mwDeluxePizzaThinCrust.jpg');
  new Pizza('New York Thin', 'assets/images/newYorkPizza.jpg');
  new Pizza('Shot Gun Dans Pizza', 'assets/images/sgDansHtossedMeatLovPizza.jpg');
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
  //clicking is done and our objects now have data.
  if (clicks === maxClicks) {
    pizzaContainer.removeEventListener('click', handlePizzaClick);
    resultButton.addEventListener('click', renderResults);
    pizzaContainer.className = 'no-voting';
    // localStorage.setItem(key, make the value a string using the stringify());
    localStorage.setItem('savedPizza', JSON.stringify(Pizza.allPizzasArray));
    renderChart();
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

/* refer to Chart.js > Chart Types > Bar Chart:
  https://www.chartjs.org/docs/latest/charts/bar.html
  and refer to Chart.js > Getting Started > Getting Started:
  https://www.chartjs.org/docs/latest/getting-started/ */



renderPizzas();

//add listener
pizzaContainer.addEventListener('click', handlePizzaClick);

function renderChart() {
  console.log(Pizza.allPizzasArray);
  //lets look the names, like, total views
  let pizzaNames = [];
  let pizzaLikes = [];
  let pizzaViews = [];

  for (let i = 0; i < Pizza.allPizzasArray.length; i++) {
    pizzaNames.push(Pizza.allPizzasArray[i].name);
    pizzaLikes.push(Pizza.allPizzasArray[i].clickedOn);
    pizzaViews.push(Pizza.allPizzasArray[i].views);
  }
  console.log(pizzaNames, pizzaLikes, pizzaViews);

  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',

    data: {
      labels: pizzaNames,
      datasets: [
        {
          label: 'Vote Counts',
          backgroundColor: 'rgb(200,0,0)',
          data: pizzaLikes,
          borderWidth: 5,
        },
        {
          label: 'Shown Count',
          backgroundColor: 'rgb(20,44,222)',
          data: pizzaViews,
          borderWidth: 5,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}



/**
function renderChart(){
  console.log(Pizza.allPizzasArray);
  let pizzaNames = [];
  let pizzaLikes = [];
  let pizzaViews = [];

  for(let i = 0; i < Pizza.allPizzasArray.length; i++){
    pizzaNames.push(Pizza.allPizzasArray[i].name);
    // pizzaNames.push(Pizza.allPizzasArray[i].name);
    pizzaLikes.push(Pizza.allPizzasArray[i].clickedOn);
    pizzaViews.push(Pizza.allPizzasArray[i].views);
  }



  const data = {
    labels: pizzaNames,
    datasets: [
      {
        label: 'Likes',
        data: pizzaLikes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.3)',
          'rgba(255, 206, 86, 0.9)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(5, 159, 64, 0.8)',
          'rgba(5, 159, 64, 0.5)',
          'rgba(5, 159, 64, 0.3)'
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: 'Views',
        data: pizzaViews,
        backgroundColor: ['rgba(255, 9, 64, 0.3)'],
        borderColor: ['rgba(255, 9, 64, 0.9)'],
        borderWidth: 1
      }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
    //go grab the canvas element from the html
  const canvasChart = document.getElementById('myChart').getContext('2d');
  // eslint-disable-next-line no-undef
  new Chart(canvasChart, config);
}

 */
