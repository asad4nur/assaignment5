const searchMeals = () => {
  event.preventDefault();
  const inputMeal = document.getElementById("search-field").value;
  const url = (`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputMeal}`)
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.meals) {
        const showMeal = document.getElementById("display-item")
        data.meals.forEach(meal => {
          const mealDiv = document.createElement('div')
          mealDiv.className = "meal-list"
          mealDiv.innerHTML = `
        
        <div class="card meal-card" onclick="showDetail ('${meal.idMeal}')" >
          <img src="${meal.strMealThumb}" class="card-img-top">
        <div class="card-body meal-title">
          <h5 class="card-text">${meal.strMeal}</h5>
        </div>
        </div>
        `
          showMeal.appendChild(mealDiv)
          document.getElementById("search-field").value = "";
        });
      } else {
        const showMeal = document.getElementById("not-found")
        const mealDiv = document.createElement('div')
        mealDiv.className = "meal-list"
        mealDiv.innerHTML = `
        <div class=" not-found">
          <h5>Something went wrong! Please try again with a valid meal name.</h5>
        </div>
        `
        document.getElementById("search-field").value = "";
        showMeal.appendChild(mealDiv)

      }
    })
}

const showDetail = (idMeal) => {
  const showMealDetail = document.getElementById("meal-detail")
  const url = (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
  fetch(url)
    .then(res => res.json())
    .then(data => displayMealItem(data.meals[0]))

}
const displayMealItem = meal => {
  const mealItemDiv = document.getElementById("meal-detail")
  mealItemDiv.innerHTML = `
  <div class="card mt-5 meal-details" style="width: 18rem;">
  <img src="${meal.strMealThumb}" class="card-img-top">
  <div class="card-body">
    <h4 class="card-text">${meal.strMeal}</h4>
    <h5>Ingredient</h5>
    <ul id="ingredientDetail"> </ul>
    <ul class="list-unstyled">
     ${ingredientList(meal)}
    </ul>
  </div>
</div>
  `
}

const ingredientList = meal => {
  let li = ''
  for (let i = 1; i <= 20; i++) {
    const strIngredient = 'strIngredient' + i
    const strMeasure = 'strMeasure' + i
    if (meal[strIngredient]) {
      li = li + `<li><span><i class="fas fa-check-square text-info"></i> </span> ${meal[strMeasure]}  ${meal[strIngredient]}</li>`;
    }
  }
  return li
}