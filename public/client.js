const form = document.querySelector('form')
const typeSelect = form.querySelector('select[name="type"]')
const priceSelect = form.querySelector('select[name="price"]')

form.addEventListener('submit', e => e.preventDefault())

typeSelect.addEventListener('change', updateContent)
priceSelect.addEventListener('change', updateContent)

async function updateContent() {
  const formData = new FormData(form)
  const params = new URLSearchParams(formData)

  params.set('enhanced', 'true')

  const response = await fetch('/pizzas?' + params.toString())
  const filteredPizzas = await response.text()
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  if (document.startViewTransition && !prefersReducedMotion) {
    document.startViewTransition(updateMain.bind(null, filteredPizzas))
  } else {
    updateMain(filteredPizzas)
  }
  
  params.delete('enhanced')
  history.pushState(null, '', '/pizzas?' + params.toString())
}

function updateMain(filteredPizzas) {
  document.querySelector('main').innerHTML = filteredPizzas
} 

