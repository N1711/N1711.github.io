const searchBtn = document.querySelector('#searchBtn'),
randomBtn = document.querySelector('#random'),
mealContainer = document.querySelector('.meal-container'),
sInput = document.querySelector('#searchBar');
const searchTl = document.querySelector('#searchTitle');

function getResponse(r) {
    if(r.status >= 200 && r.status < 300) {
        return Promise.resolve(r);
    }
    else {
        return Promise.reject(r);
    }
}

const fetchData = (mealName) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(getResponse)
    .then(res => res.json())
    .then(data => {
        sInput.value = '';
        if(data.meals == null) {
            searchTl.innerHTML = `We found no matches. Please try again with a differnet key word.`
            mealContainer.innerHTML = ``;
        }
        else if(data.meals.length > 0 && data.meals.length <= 4) {
            if(mealContainer.classList.contains('single')) {
                mealContainer.classList.remove('single');
            }
            mealContainer.style.gridTemplateColumns = '180px 1fr';
            searchTl.innerHTML = `<h3>We found ${data.meals.length} meals based on your search.</h3>`
            mealContainer.innerHTML = data.meals.map(meal => 
                `<div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="meal-info" data-mealID="${meal.idMeal}" onClick="findMealById('${meal.idMeal}')">
                <h3>${meal.strMeal}</h3></div></div>`).join("");  
            }
            else if (data.meals.length > 4) {
                if(mealContainer.classList.contains('single')) {
                    mealContainer.classList.remove('single');
                }
                mealContainer.style.gridTemplateColumns = '180px 180px 180px 180px 1fr';
                searchTl.innerHTML = `<h3>We found ${data.meals.length} meals based on your search.</h3>`
                mealContainer.innerHTML = data.meals.map(meal => 
                `<div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="meal-info" data-mealID="${meal.idMeal}" onClick="findMealById('${meal.idMeal}')">
                <h3>${meal.strMeal}</h3></div></div>`).join(""); 
            }
        })
    }

    const findMealById = (mealId) => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
            const ingArray = [];
            mealContainer.innerHTML = '';
            mealContainer.classList.add('single');
            for(i=1;i<=20;i++) {
                if(data.meals[0][`strIngredient${i}`] != "") {
                    ingArray.push(`${data.meals[0][`strIngredient${i}`]} - ${data.meals[0][`strMeasure${i}`]}` );
                }
            }
            searchTl.innerHTML = `<h3>Full recipe for ${data.meals[0].strMeal}</h3>`;
            mealContainer.innerHTML = `
            <div class="single-meal-info">
                <img src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}">
                <div class="recipe-container">
                    <h3>Instructions</h3>
                    <span class="recipe">${data.meals[0].strInstructions}</span>
                    <div class="ingredients">
                    <h3>Ingredients</h3>
                        <ul>
                            ${ingArray.map(ing => `<li>${ing}</li>`).join("")}
                        </ul>
                    </div>
                    <h2>Watch the video <a href="${data.meals[0].strYoutube}">Here</a>
                </div>
            </div>
            `
        })
    }

searchBtn.addEventListener('click', () => {
    const searched = sInput.value;
    if(searched.trim() !== '') {
        // mealContainer.style.gridTemplateColumns = '180px 180px 180px 180px 1fr';
        fetchData(searched);
    }
})

randomBtn.addEventListener('click', () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(getResponse)
    .then(res => res.json())
    .then(data => {
        findMealById(data.meals[0].idMeal);
    })
})

// if(data.meals.length > 0) {
        //     data.meals.forEach(element => {
        //         mealContainer.insertAdjacentHTML('afterend',`
        //         <div class="meal">
        //         <img src="${element.strMealThumb}" alt="${element.strMeal}">
        //         <div class="meal-info" data-mealID="${element.idMeal}">
        //         <h3>${element.strMeal}</h3></div></div`);
        //     });
        // }  