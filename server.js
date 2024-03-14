// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js';

// Maak een nieuwe express app aan
const app = express();

// Importeer het npm pakket express uit de node_modules map
import express, { json } from 'express';

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({extended: true}))

// TODO: routes voor deze Hand-Footprint applicatie..



app.get('/', function(request, response) {
	fetchJson("https://fdnd-agency.directus.app/items/hf_sdgs").then((sdgsUitDeAPI) => {
		response.render('index', {sdgs: sdgsUitDeAPI.data,})
	});
})

app.get('/sdg/:sdg', function(request, response) {
	fetchJson('https://fdnd-agency.directus.app/items/hf_sdgs?filter={"id":' + request.params.sdg + '}').then((sdgDetail) => {
		response.render('sdg', {sdg: sdgDetail.data[0]})
	})
})

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function() {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})