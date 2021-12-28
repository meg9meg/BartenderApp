const inputDrinkName = document.querySelector(".search__input");
const alphabethLetter = document.querySelectorAll('.dictionary__letter');
const drinksPanel = document.querySelector('.drinks');
const noDrinks = document.querySelector('.drinks__no-drinks');

const fullScreen = document.querySelector('.fullscreen-container');

const drinkDetails = document.querySelector('.details');
const drinkName = document.querySelector('.details__name');
const drinkIngredients = document.querySelector('.details__ingredients');
const drinkPrep = document.querySelector('.details__prep');
const closeBtn = document.querySelector('.details__close-btn');

const arrow = document.querySelector('.fa-arrow-up');

const API_LINK = "https://thecocktaildb.com/api/json/v1/1/search.php?f=";
const API_BY_NAME = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";
const API_BY_ID = "https://thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const findDrinks = (letter) => {
    drinksPanel.textContent = "";
    const URL = API_LINK + letter;

    axios.get(URL).then(res => {
        const drinks = res.data.drinks;

        drinks.forEach(drink => {
            const item = document.createElement('div');
            item.className = "drinks__drink";
            item.setAttribute("onclick", `showDrinkDetails(${drink.idDrink})`);
            item.id = drink.idDrink;

            item.innerHTML = 
            `
                <div class="drinks__drink__name">${drink.strDrink}</div>
                <img class="drinks__drink__image" src="${drink.strDrinkThumb}"/>`
            drinksPanel.appendChild(item);
        })
    }).catch(() => {
        drinksPanel.innerHTML = `
        <div class="drinks__no-drinks">
            <i class="fas fa-glass-martini-alt drinks__no-drinks__icon"></i>
            <h2 class="drinks__no-drinks__zero">We don't find drink you requested :(</h2> 
        </div>`
    })
}

const searchByName = () => {
    drinksPanel.textContent = "";
    const txt = inputDrinkName.value;
    const URL = API_BY_NAME + txt;
    
    axios.get(URL).then(res => {
        const drinks = res.data.drinks;

        drinks.forEach(drink => {
            const item = document.createElement('div');
            item.className = "drinks__drink";
            item.setAttribute("onclick", `showDrinkDetails(${drink.idDrink})`);
            item.id = drink.idDrink;

            item.innerHTML = 
            `
                <div class="drinks__drink__name">${drink.strDrink}</div>
                <img class="drinks__drink__image" src="${drink.strDrinkThumb}"/>`
            drinksPanel.appendChild(item);
        })
    }).catch(() => {
        drinksPanel.innerHTML = `
        <div class="drinks__no-drinks">
            <i class="fas fa-glass-martini-alt drinks__no-drinks__icon"></i>
            <h2 class="drinks__no-drinks__zero">We don't find drink you requested :(</h2> 
        </div>`
    })

    
}

const showDrinkDetails = id => {
    const drink = document.getElementById(id);
    drinkDetails.classList.remove("hidden");
    fullScreen.classList.remove("hidden");

    const URL = API_BY_ID + id;
    console.log(URL);

    axios.get(URL).then(res => {
        const drink = res.data.drinks[0];
        drinkName.textContent = `${drink.strDrink}`;
        drinkPrep.textContent = `${drink.strInstructions}`;

        //ingredients
        const ingredients = [[drink.strIngredient1, drink.strMeasure1],[drink.strIngredient2, drink.strMeasure2],[drink.strIngredient3, drink.strMeasure3],[drink.strIngredient4, drink.strMeasure4],
                    [drink.strIngredient5, drink.strMeasure5],[drink.strIngredient6, drink.strMeasure6],[drink.strIngredient7, drink.strMeasure7],[drink.strIngredient8, drink.strMeasure8],
                    [drink.strIngredient9, drink.strMeasure9],[drink.strIngredient10, drink.strMeasure10],[drink.strIngredient11, drink.strMeasure11],[drink.strIngredient12, drink.strMeasure12],
                    [drink.strIngredient13, drink.strMeasure13],[drink.strIngredient14, drink.strMeasure14],[drink.strIngredient15, drink.strMeasure15]];

        for(let i = 0; i < ingredients.length; i++){
            let ingredient = ingredients[i][0];
            let measure = ingredients[i][1];
            if(ingredient != null){
                drinkIngredients.innerHTML += `<p class="details__ingredients_ingredient">${ingredient} ${measure==null ? "" : measure}</p>`;
            }
            else return;
        }
        })
}

const closeDetails = () => {
    drinkDetails.classList.add("hidden");
    fullScreen.classList.add("hidden");
    drinkName.textContent = "";
    drinkIngredients.textContent = "";
    drinkPrep.textContent = "";
}


alphabethLetter.forEach(item => {
    item.addEventListener('click', () => {
        findDrinks(item.textContent);
    })
});

inputDrinkName.addEventListener("input", searchByName);
closeBtn.addEventListener("click", closeDetails);


//-------------onload settings-----------
window.onload = function(){
    inputDrinkName.value = "";
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//-------------navigation----------------
arrow.addEventListener('click', () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    arrow.style.display = "inline-block";
  } else {
    arrow.style.display = "none";
  }
}