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
        text: '',
        id: ingredientId,
        youhave: false
    })
    saveRecipe()
    console.log(recipe.ingredients)
}

const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => {
        return recipe.id === id
    })

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
        location.assign('index.html')
        saveRecipe()
    }
}

// Generate the DOM structure for a recipe
const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement('a')
    recipeEl.classList.add('container__recipe-card')
    const bodyTextEl = document.createElement('p')
    bodyTextEl.classList.add('recipe-card__card-body')
    const titleTextEl = document.createElement('p')
    titleTextEl.classList.add('recipe-card__card-title')

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
    recipeEl.setAttribute('href', `/edit.html#${recipe.id}`)

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

const filterRecipes = (text) => {
    return recipes.filter((recipe) => {
        return recipe.title.toLowerCase().replace(/\s+/g, '').includes(text.toLowerCase())
    })
}

// Set up the ingredient DOM 
const generateIngredientDOM = (ingredient, recipe) => {
    const container = document.createElement('div')
    const label = document.createElement('label')
    const checkbox = document.createElement('input')
    const ingredientEl = document.createElement('span')
    const removeButton = document.createElement('a')

    ingredientEl.classList.add('ingredient')

    // Set ingredient checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = ingredient.youhave
    console.log(checkbox.checked)
    label.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleIngredient(ingredient.text, recipe.id)
        renderIngredients(recipe.id)
    })

    container.appendChild(label)

    label.appendChild(ingredientEl)

    if (ingredient.text.length > 0) {
        ingredientEl.textContent = ingredient.text
    } else {
        ingredientEl.textContent = 'Unnamed'
    }
    
    // Setup the remove button for ingredient
    removeButton.textContent = 'remove'
    removeButton.classList.add('removeIngredient')
    container.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeIngredient(ingredient.text, recipe.id)
        renderIngredients(recipe.id)
    })


    return container
}

// Rendering application ingredients
const renderIngredients = (recipeId) => {
    const ingredientsEl = document.querySelector('#ingredients')

    const recipe = recipes.find((recipe) => {
        return recipe.id === recipeId
    })
    const ingredients = recipe.ingredients

    ingredientsEl.innerHTML = ''

    ingredients.forEach((ingredient) => {
        const container = generateIngredientDOM(ingredient, recipe)
        ingredientsEl.appendChild(container)
    })
}

// Setup the remove functionality
const removeIngredient = (text, recipeId) => {
    const recipe = recipes.find((recipe) => {
        return recipe.id === recipeId
    })

    const ingredients = recipe.ingredients

    const ingredientIndex = ingredients.findIndex((ingredient) => {
        return ingredient.text === text
    })

    if (ingredientIndex > -1) {
        ingredients.splice(ingredientIndex, 1)
        saveRecipe()
    }
}

// Set up the toggle for checkbox functionality
const toggleIngredient = (text, recipeId) => {
    const recipe = recipes.find((recipe) => {
        return recipe.id === recipeId
    })

    const ingredients = recipe.ingredients

    const ingredient = ingredients.find((ingredient) => {
        return ingredient.text === text
    })

    if (ingredient) {
        ingredient.youhave = !ingredient.youhave
        saveRecipe()
    }
}

// Initialization functionality for edit page
const initializeEditPage = (recipeId) => {
    const getRecipeById = (recipeId) => {
        const recipe = recipes.find((recipe) => {
        return recipeId === recipe.id
        })
        return recipe
    }
    const recipe = getRecipeById(recipeId)
    const titleElement = document.querySelector('#title')
    const bodyElement = document.querySelector('#body')

    titleElement.value = recipe.title
    bodyElement.value = recipe.body
    renderIngredients(recipeId)
}