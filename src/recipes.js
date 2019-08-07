import uuidv4 from 'uuid/v4'

let recipes = []

// Read existing recipes from local storage
const loadRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')
    try {
        return recipesJSON ? JSON.parse(recipesJSON) : []
    } catch (e) {
        return []
    }
}

// Save the recipe to local storage
const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

// Expose recipes from modules
const getRecipes = () => recipes

const createRecipe = () => {
    const recipeId = uuidv4()

    recipes.push({
        id: recipeId,
        title: '',
        body: '',
        ingredients: [],
    })
    saveRecipes()
    return recipeId
}

// Remove a recipe from the list
const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
        saveRecipes()
    }
}

const updateRecipe = (id, updates) => {
    const recipe = recipes.find((recipe) => recipe.id === id)

    if (!recipe) {
        return 
    }

    if (typeof updates.title === 'string') {
        recipe.title = updates.title
    }
    if (typeof updates.body === 'string') {
        recipe.body = updates.body
    }

    saveRecipes()
}

// Add object into ingredient array
const addIngredient = (recipeId, text) => {
    const recipe = getRecipes().find((recipe) => recipe.id === recipeId)

    recipe.ingredients.push({
        text: text,
        youhave: false
    })
    saveRecipes()
}

// Setup the remove functionality
const removeIngredient = (text, recipeId) => {
    const recipe = recipes.find((recipe) => recipe.id === recipeId)

    const ingredients = recipe.ingredients

    const ingredientIndex = ingredients.findIndex((ingredient) => ingredient.text === text)

    if (ingredientIndex > -1) {
        ingredients.splice(ingredientIndex, 1)
        saveRecipes()
    }
}

// Set up the toggle for checkbox functionality
const toggleIngredient = (text, recipeId) => {
    const recipe = recipes.find((recipe) => recipe.id === recipeId)

    const ingredients = recipe.ingredients

    const ingredient = ingredients.find((ingredient) => ingredient.text === text)

    if (ingredient) {
        ingredient.youhave = !ingredient.youhave
        saveRecipes()
    }
}

// Checking if 'youhave' is true or false 
const filterIngredients = (recipeId) => {
    const recipe = recipes.find((recipe) => recipe.id === recipeId)

    const ingredients = recipe.ingredients

    return ingredients.filter((ingredient) => ingredient.youhave === true)
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
    label.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleIngredient(ingredient.text, recipe.id)
        renderIngredients(recipe.id, recipe.ingredients)
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
        renderIngredients(recipe.id, recipe.ingredients)
    })


    return container
}

// Rendering application ingredients
const renderIngredients = (recipeId, ingredients) => {
    const ingredientsEl = document.querySelector('#ingredients')
    ingredientsEl.innerHTML = ''

    const recipe = recipes.find((recipe) => recipe.id === recipeId)

    ingredients.forEach((ingredient) => {
        const container = generateIngredientDOM(ingredient, recipe)
        ingredientsEl.appendChild(container)
    })
}

recipes = loadRecipes()

export { getRecipes, saveRecipes, createRecipe, removeRecipe, updateRecipe, addIngredient, removeIngredient, toggleIngredient, filterIngredients, generateIngredientDOM, renderIngredients }