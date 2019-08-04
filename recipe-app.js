'use strict'

let recipes = []

const filters = {
    searchText: ''
}


document.querySelector('#new-recipe').addEventListener('click', () => {
    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
    console.log(recipes)
})

// Filtering recipes
const search = document.querySelector('#filter')
search.addEventListener('input', (e) => {
    filters.searchText = e.target.value
    if (filters.searchText.trim().length > 0) {
        const filteredRecipes = filterRecipes(filters.searchText.replace(/\s+/g, ''))
        console.log(filters.searchText)
        renderRecipes(filteredRecipes)
    } else {
        renderRecipes(recipes)
    }
})

recipes = getSavedRecipes()
renderRecipes(recipes)

console.log(recipes)

// const person = {
//     name: 'Andrew',
//     age: 27,
//     oheckAge: function (age) {
//         return this.age > age
//     }
// }

// console.log(person)