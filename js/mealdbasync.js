const SearchBtn = document.getElementById("button-search");
const SearchInput = document.getElementById("search-fild");

SearchInput.addEventListener("keypress", function(event) {
/*     event.preventDefault();
 */    if (event.key == 'Enter')
        SearchBtn.click();
});


const searchFild = () => {
    const searchFild = document.getElementById('search-fild');
    const searchText = searchFild.value;
    // clear data
    searchFild.value ='';
    if(searchText == ''){
        alert('please write something to input');
    }
    else{
     // load data
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}
    `;
/*    
    const res = await fetch(url);
    const data = await res.json();
    displaySearchResult(data.meals)
*/
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.meals));
    } 
}
//
const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    //clear page
    searchResult.textContent = '';
    if(meals.length == 0){
        alert('show no result found');
    }
    else{
        meals.forEach(meal => {
        console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadMealData(${meal.idMeal})" class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 250)}
                </p>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    });
    }
}
//
const loadMealData = async mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    
    const res = await fetch(url);
    const data = await res.json();
    updateMeal(data.meals[0]);
    //
/* 
    fetch(url)
    .then(res => res.json())
    .then(data => updateMeal(data.meals[0]))
*/
}
//
const updateMeal = meal => {
    console.log(meal);
    const mealDetails = document.getElementById('meal-detail');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
        <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
      </div>
    `;
    mealDetails.appendChild(div);
}
