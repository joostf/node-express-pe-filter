// variables
const form = document.querySelector('form')
const selects = form.querySelectorAll('select')
const button = form.querySelector('input[type="submit"]')
const loader = document.querySelector('.loader')
const main = document.querySelector('main')

// logic
button.hidden = true

form.addEventListener('submit', handleSubmit)

selects.forEach(select => select.addEventListener('change', handleChange))

window.addEventListener('popstate', handlePopState)

// function declarations
function handleSubmit(event) {
  event.preventDefault()
}

function handleChange() {
  fetchPizzas({ pushState: true })
}

function handlePopState() {
  syncFilterState()
  fetchPizzas({ pushState: false })
}

async function fetchPizzas({ pushState = false } = {}) {
  const url = buildFilterUrl()

  loader.classList.add('loading')

  const response = await fetch(url)
  const filteredPizzas = await response.text()

  // Mimic network delay for demonstration purposes
  await new Promise(resolve => setTimeout(resolve, 1500))

  loader.classList.remove('loading')

  renderPizzas(filteredPizzas)

  if (pushState) {
    history.pushState(null, '', buildFilterUrl({ enhanced: false }))
  }
}

function renderPizzas(filteredPizzas) {
  main.innerHTML = filteredPizzas
}

function buildFilterUrl({ enhanced = true } = {}) {
  const formData = new FormData(form)
  const params = new URLSearchParams(formData)

  if (enhanced) {
    params.set('enhanced', 'true')
  }

  return '/pizzas?' + params.toString()
}

function syncFilterState() {
  const params = new URLSearchParams(window.location.search)

  if (params.has('type')) {
    typeSelect.value = params.get('type')
  }

  if (params.has('price')) {
    priceSelect.value = params.get('price')
  }
}

/*
  Code flow when a user changes a filter or navigates with the browser history:
  1. A change event on a filter calls handleChange().
  2. handleChange() calls fetchPizzas() with pushState enabled.
  3. fetchPizzas() calls buildFilterUrl(), which converts the form values into a URL such as /pizzas?type=vis&enhanced=true.
  4. fetchPizzas() requests the filtered pizza HTML from the server.
  5. renderPizzas() replaces the contents of <main> with the new results.
  6. The URL is updated with history.pushState() without a full browser reload.
  7. When the user goes back or forward, popstate calls handlePopState(), which restores the filter values and fetches the matching pizza results again.
  */
