'use strict'

// Read existing recipes from local storage
const getSavedRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')
    if (recipesJSON) {
        return JSON.parse(recipesJSON)
    } else {
        return []
    }
}

// Create a recipe object
const createRecipe = () => {
    const recipeId = uuidv4()

    recipes.push({
        id: recipeId,
        title: '',
        body: '',
        ingredients: [],
    })
    // addIngredient(recipeId)
    saveRecipe()
    return recipeId
}

// Add object into ingredient array
const addIngredient = (recipeId) => {
    const recipe = recipes.find((recipe) => {
        return recipe.id === recipeId
    })

    // another uuid
    const uuid = () => {
        var uuid = "", i, random;
        for (i = 0; i < 33; i++) {
          random = Math.random() * 16 | 0;
      
          if (i == 8 || i == 12 || i == 16 || i == 20) {
            uuid += "-"
          }
          uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
        }
        return uuid;
    }

    const ingredientId = uuid()
    console.log(recipe.ingredients)

    recipe.ingredients.push({
        name: '',
        id: ingredientId
    })
    saveRecipe()
    console.log(recipe.ingredients)
}

// Generate the DOM structure for a recipe
const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement('p')
    recipeEl.classList.add('recipe-card')
    const bodyTextEl = document.createElement('a')
    const titleTextEl = document.createElement('a')

    // Setup the recipe title text
    if (recipe.title.length > 0) {
        titleTextEl.textContent = recipe.title
    } else {
        titleTextEl.textContent = 'Recipe title unnamed'
    }

    if (recipe.body.length > 0) {
        bodyTextEl.textContent = recipe.body
    } else {
        bodyTextEl.textContent = 'Recipe body unnamed'
    }
    // titleTextEl.textContent = recipe.title
    recipeEl.appendChild(titleTextEl)
    recipeEl.appendChild(bodyTextEl)

    // Setup the link
    titleTextEl.setAttribute('href', `/edit.html#${recipe.id}`)

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

// Save the recipe to local storage
const saveRecipe = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}


const generateIngredientDOM = (ingredient) => {
    const container = document.createElement('div')
    const label = document.createElement('label')
    const checkbox = document.createElement('input')
    const ingredientEl = document.createElement('span')
    const removeButton = document.createElement('button')

    container.appendChild(label)

    container.appendChild(removeButton)
    removeButton.textContent = 'x'

    label.appendChild(checkbox)
    checkbox.type = 'checkbox'

    label.appendChild(ingredientEl)

    if (ingredient.name.length > 0) {
        ingredientEl.textContent = ingredient.name
    } else {
        ingredientEl.textContent = 'Unnamed'
    }

    return container
}

const renderIngredients = (recipeId) => {
    const ingredientsEl = document.querySelector('#ingredients')

    const recipe = recipes.find((recipe) => {
        return recipe.id === recipeId
    })
    const ingredients = recipe.ingredients

    ingredientsEl.innerHTML = ''

    ingredients.forEach((ingredient) => {
        const container = generateIngredientDOM(ingredient)
        ingredientsEl.appendChild(container)
    })
}

// const getIngredientById = (ingredientId) => {
//     ingredients.find((ingredient) => {
//         return ingredient.id === ingredientId
//     })
// }