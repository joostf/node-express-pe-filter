import express from 'express'
import { Liquid } from 'liquidjs'

const app = express()
const engine = new Liquid()

app.use(express.static('public'))
app.engine('liquid', engine.express()) 
app.set('views', './views')

// URL's & Endpoints
// HOME (/)
// https://fdnd-agency.directus.app/items/demo_pizzas?sort[]=-ordered&limit=4

// PIZZAS (/pizzas)
// https://fdnd-agency.directus.app/items/demo_pizzas?sort=name&meta=total_count,filter_count

// PIZZAS FILTERED (/pizzas?type=vegetarisch)
// https://fdnd-agency.directus.app/items/demo_pizzas?sort=name&meta=total_count,filter_count&filter[type][_eq]=vegetarisch

// PIZZA (/pizzas/caprese-captioni)
// https://fdnd-agency.directus.app/items/demo_pizzas?filter[slug][_eq]=caprese-captioni

app.set('port', process.env.PORT || 8001)
app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
