const form = document.querySelector('form')
const typeSelect = form.querySelector('select[name="type"]')
const priceSelect = form.querySelector('select[name="price"]')
const button = form.querySelector('input[type="submit"]')
const loader = document.querySelector('.loader')

button.hidden = true

form.addEventListener('submit', e => e.preventDefault())

typeSelect.addEventListener('change', updateContent)
priceSelect.addEventListener('change', updateContent)

async function updateContent() {
  const formData = new FormData(form)
  const params = new URLSearchParams(formData)

  params.set('enhanced', 'true')

  loader.classList.add('loading')

  const response = await fetch('/pizzas?' + params.toString())
  const filteredPizzas = await response.text()

  // Simuleer een langere laadtijd om altijd de loader te tonen
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  if (document.startViewTransition && !prefersReducedMotion) {
    document.startViewTransition(updateMain.bind(null, filteredPizzas))
  } else {
    updateMain(filteredPizzas)
  }

  loader.classList.remove('loading')
  
  params.delete('enhanced')
  history.pushState(null, '', '/pizzas?' + params.toString())
}

function updateMain(filteredPizzas) {
  document.querySelector('main').innerHTML = filteredPizzas
} 
