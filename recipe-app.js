'use strict'

let recipes = []


document.querySelector('#new-recipe').addEventListener('click', () => {
    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
    console.log(recipes)
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