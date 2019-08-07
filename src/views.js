import { getRecipes, saveRecipes, filterIngredients, renderIngredients } from './recipes'
import { getFilters } from './filters'

// Generate the DOM structure for a recipe
const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement('a')
    recipeEl.classList.add('container__recipe-card')
    const bodyTextEl = document.createElement('p')
    bodyTextEl.classList.add('recipe-card__card-body')
    const titleTextEl = document.createElement('p')
    titleTextEl.classList.add('recipe-card__card-title')

    // Getting different body message depending on the condition of ingredients
    const filteredIngredients = filterIngredients(recipe.id)
    if (recipe.ingredients.length > 0 && filteredIngredients.length === 0) {
        bodyTextEl.textContent = 'You have none of the ingredients.'
    } else if (recipe.ingredients.length > 0 && filteredIngredients.length > 0 && filteredIngredients.length < recipe.ingredients.length) {
        bodyTextEl.textContent = 'You have some of the ingredients.'
    } else if (recipe.ingredients.length > 0 && filteredIngredients.length === recipe.ingredients.length) {
        bodyTextEl.textContent = 'You have all of the ingredients.'
    }

    if (recipe.ingredients.length === 0) {
        bodyTextEl.textContent = 'Let\'s add ingredients!'
    }

    // Setup the recipe title text
    if (recipe.title.length > 0) {
        titleTextEl.textContent = recipe.title
    } else {
        titleTextEl.textContent = 'Recipe title unnamed'
    }

    recipeEl.appendChild(titleTextEl)
    recipeEl.appendChild(bodyTextEl)

    // Setup the link
    recipeEl.setAttribute('href', `/edit.html#${recipe.id}`)

    return recipeEl
}

// Render application recipes
const renderRecipes = () => {
    const recipes = getRecipes()
    const filters = getFilters()
    const filteredRecipes = recipes.filter((recipe) =>  recipe.title.toLowerCase().replace(/\s+/g, '').includes(filters.searchText.toLowerCase()))
    const recipesEl = document.querySelector('#recipes')

    recipesEl.innerHTML = ''

    filteredRecipes.forEach((recipe) => {
        const recipeEl = generateRecipeDOM(recipe)
        recipesEl.appendChild(recipeEl)
    })
}

const initializeEditPage = (recipeId) => {
    const titleElement = document.querySelector('#title')
    const bodyElement = document.querySelector('#body')
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipeId === recipe.id)
    const ingredients = recipe.ingredients

    if (!recipe) {
        location.assign('/index.html')
    }

    titleElement.value = recipe.title
    bodyElement.value = recipe.body
    renderIngredients(recipeId, ingredients)
}

export { generateRecipeDOM, renderRecipes, initializeEditPage }