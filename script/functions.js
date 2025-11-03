// File: "functions.js"
// Dettagli: contiene funzioni utili alle altre pagine

// Funzione che restituisce tutte le starships (come vettore), anche su più pagine:
function getAllStarships(){
	let allStarships = [];
	let url = "https://swapi.dev/api/starships/";

	function fetchPage(nextUrl){
		
		return $.get(nextUrl).then(function(data){
			// Aggiunge i risultati della pagina corrente
			allStarships = allStarships.concat(data.results);

			// Se esiste una pagina successiva, continua a scaricarla
			if(data.next){
				return fetchPage(data.next);
			}else{
				// Nessuna pagina successiva → restituisci l’array completo
				return allStarships;
			}
		});
	}

	// Avvia il caricamento dalla prima pagina
	return fetchPage(url);
}

// Funzione che estrae le classi (come vettore) in modo case insansitive:
function estraiClassiUniche(starships){
	const mappaClassi = new Map();
	
	starships.forEach(s => {
		if(s.starship_class){
			
			// Trasformazione in minuscolo e senza spazi:
			const minuscolo = s.starship_class.toLowerCase().trim();
			
			// Se non esiste già una classe con quel nome "normalizzato":
			if(!mappaClassi.has(minuscolo)){
				const formatted = s.starship_class
				.toLowerCase()
				.split(' ')
				.map(word => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ');
				mappaClassi.set(minuscolo, formatted);
			}
		}
	});
	
	return Array.from(mappaClassi.values());
}