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

// Variabeles aanmaken voor de routes
const apiUrl = 'https://fdnd-agency.directus.app/items/'
const sdgList = apiUrl + 'hf_sdgs'
const companyList = apiUrl + 'hf_companies'

app.get('/', function(request, response) {
	fetchJson(sdgList).then((sdgsUitDeAPI) => {
		response.render('index', {sdgs: sdgsUitDeAPI.data,})
	});
})

app.get('/sdg/:sdg', function(request, response) {
	fetchJson(sdgList + '?filter={"id":' + request.params.sdg + '}').then((sdgDetail) => {
		response.render('sdg', {sdg: sdgDetail.data[0]})
	})
})

app.get('/inlogpagina', function(request, response) {
	fetchJson(companyList).then((companiesUitDeAPI) => {
		response.render('inlogpagina', {companies: companiesUitDeAPI.data,})
	});
})

app.get('/bedrijf/:id', function (request, response) {
	// Gebruik de request parameter id en haal de juiste persoon uit de WHOIS API op
	fetchJson("https://fdnd-agency.directus.app/items/hf_scores" + '/' + request.params.id + '?fields=*,*.*,*.*.*').then((companyData) => {
	  // Render person.ejs uit de views map en geef de opgehaalde data mee als variable, genaamd person
	  response.render('bedrijf', {company: companyData.data})
	})
  })

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function() {
  // Toon een bericht in de console en geef het poortnummer door
console.log(`Application started on http://localhost:${app.get('port')}`)
})