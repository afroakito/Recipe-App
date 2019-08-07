
import { initializeEditPage } from './views'
import { getRecipes, updateRecipe, removeRecipe, addIngredient, renderIngredients } from './recipes'

const recipeId = location.hash.substring(1)
const recipe = getRecipes().find((recipe) => recipe.id === recipeId)
const titleElement = document.querySelector('#title')
const bodyElement = document.querySelector('#body')
const removeElement = document.querySelector('#removeButton')

initializeEditPage(recipeId)

// Set title to recipe
titleElement.addEventListener('input', (e) => {
    updateRecipe(recipeId, {
        title: e.target.value
    })
})

// Set body text to recipe
bodyElement.addEventListener('input', (e) => {
    updateRecipe(recipeId, {
        body: e.target.value
    })
})

document.querySelector('#new-ingredient').addEventListener('click', () => {
    if (document.querySelector('#inputIngredient').value.length > 0) {
        addIngredient(recipeId, document.querySelector('#inputIngredient').value)
        renderIngredients(recipeId, recipe.ingredients)
    } else {
        initializeEditPage(recipeId)
    document.querySelector('#inputIngredient').value = ''
    }
    document.querySelector('#inputIngredient').value = ''
})

removeElement.addEventListener('click', () => {
    removeRecipe(recipeId)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        initializeEditPage(recipeId)
    }
})

