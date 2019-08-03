let recipes = getSavedRecipes()
const recipeId = location.hash.substring(1)
// Get object by using id
const getRecipeById = (recipeId) => {
    const recipe = recipes.find((recipe) => {
        return recipeId === recipe.id
    })
    return recipe
}

// const ingredient = getIngredientById()
let recipe = getRecipeById(recipeId)
const ingredients = recipe.ingredients
const titleElement = document.querySelector('#title')
const bodyElement = document.querySelector('#body')
const removeButton = document.querySelector('#removeButton')


initializeEditPage(recipeId)
renderIngredients(recipeId)
console.log(ingredients)

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
    if (document.querySelector('#inputIngredient').value.length > 0) {
        addIngredient(recipeId)
        ingredients[ingredients.length - 1].text = document.querySelector('#inputIngredient').value
        saveRecipe()
    }
    renderIngredients(recipeId)
    document.querySelector('#inputIngredient').value = ''
})

removeButton.addEventListener('click', () => {
    removeRecipe(recipe.id)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        recipes = JSON.parse(e.newValue)
        initializeEditPage(recipeId)
    }
})

