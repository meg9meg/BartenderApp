const inputDrinkName = document.querySelector(".search__input");
const alphabethLetter = document.querySelectorAll('.dictionary__letter');
const drinksPanel = document.querySelector('.drinks');
const noDrinks = document.querySelector('.drinks__no-drinks');


const API_LINK = "https://thecocktaildb.com/api/json/v1/1/search.php?f=";

const API_BY_NAME = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";

const findDrinks = (letter) => {
    drinksPanel.textContent = "";
    const URL = API_LINK + letter;

    axios.get(URL).then(res => {
        const drinks = res.data.drinks;

        drinks.forEach(drink => {
            const item = document.createElement('div');
            item.className = "drinks__drink";

            item.innerHTML = 
            `
                <div class="drinks__drink__name">${drink.strDrink}</div>
                <img class="drinks__drink__image" src="${drink.strDrinkThumb}"/>`
            drinksPanel.appendChild(item);
        })
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

alphabethLetter.forEach(item => {
    item.addEventListener('click', () => {
        findDrinks(item.textContent);
    })
});

inputDrinkName.addEventListener("input", searchByName);

window.onload = function(){
    inputDrinkName.value = "";
}