import { createRecipe } from './recipes'
import { setFilters } from './filters'
import { renderRecipes } from './views'

renderRecipes()

document.querySelector('#new-recipe').addEventListener('click', () => {
    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#filter').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderRecipes()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        renderRecipes()
    }
})