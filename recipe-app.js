'use strict'

let recipes = []

// Generate the DOM structure for a recipe
const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement('p')
    const textEl = document.createElement('a')

    // Setup the recipe title text
    recipe.title = 'Unnamed recipe'
    textEl.textContent = recipe.title
    recipeEl.appendChild(textEl)

    // Setup the link
    textEl.setAttribute('href', `/edit.html#${recipe.id}`)

    return recipeEl
}

// Render application recipes
const renderRecipes = (recipes) => {
    const recipesEl = document.querySelector('#recipes')

    recipesEl.innerHTML = ''

    recipes.forEach((recipe) => {
        const recipeEl = generateRecipeDOM(recipe)
        recipesEl.appendChild(recipeEl)
    })
}

// Create a recipe object
const createRecipe = () => {
    const id = uuidv4()

    recipes.push({
        id: id,
        title: '',
        body: '',
    })
    saveRecipe()
    return id
}

document.querySelector('#new-recipe').addEventListener('click', () => {
    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
    console.log(recipes)
})


// Save the recipe to local storage
const saveRecipe = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

// Read existing recipes from local storage
const getSavedRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')
    if (recipesJSON) {
        return JSON.parse(recipesJSON)
    } else {
        return []
    }
}

recipes = getSavedRecipes()
renderRecipes(recipes)