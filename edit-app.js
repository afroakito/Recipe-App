const recipes = getSavedRecipes()
const recipeId = location.hash.substring(1)
// Get object by using id
const getRecipeById = (recipeId) => {
    const recipe = recipes.find((recipe) => {
        return recipeId === recipe.id
    })
    return recipe
}

// const ingredient = getIngredientById()
const recipe = getRecipeById(recipeId)
const ingredients = recipe.ingredients
const titleElement = document.querySelector('#title')
const bodyElement = document.querySelector('#body')

// Set title to recipe
titleElement.addEventListener('input', (e) => {
    // console.log(recipe)
    recipe.title = e.target.value
    saveRecipe()
})

// Set body text to recipe
bodyElement.addEventListener('input', (e) => {
    // console.log(recipe)
    recipe.body = e.target.value
    saveRecipe()
})

// id => search recipe id => get object
// click => search id of clicked stuff

document.querySelector('#new-ingredient').addEventListener('click', () => {
    if (document.querySelector('#input').value.length > 0) {
        addIngredient(recipeId)
        ingredients[ingredients.length - 1].name = document.querySelector('#input').value
        saveRecipe()
    }
    renderIngredients(recipeId)
    document.querySelector('#input').value = ''
})

console.log(ingredients)
renderIngredients(recipeId)