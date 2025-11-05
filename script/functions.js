// File: "functions.js"
// Dettagli: contiene funzioni utili alle altre pagine

// Funzione che restituisce tutte le starships (come vettore), anche su più pagine:
function getAllStarships(){
	const baseUrl = "https://swapi.dev/api/starships/";
	//let allStarships = [];
	//return $.get(url).then(function(pagina){
		//calcolo il numero delle pagine arrotondate per eccesso
//		num_pagine = Math.ceil(pagina)
//	});
	return $.get(baseUrl).then(function(Page) {
    const totalPages = Math.ceil(Page.count / Page.results.length);

    // Prepara un array con tutte le URL
    const urls = [];
    for (let i = 2; i <= totalPages; i++) {
      urls.push(`${baseUrl}?page=${i}`);
    }

    // Scarica in parallelo tutte le altre pagine
    return Promise.all(urls.map(url => $.get(url))).then(function(pages) {
      // Combina i risultati
      let allStarships = Page.results.slice();
      pages.forEach(page => {
        allStarships = allStarships.concat(page.results);
      });
      return allStarships;
    });
  });


 // async function fetchAllParallel(baseUrl) {
  //const first = await $.get(baseUrl);
  //let urls = [];
//  let next = first.next;
//
  //while (next) {
    //urls.push(next);
 //   const pageNum = parseInt(next.match(/page=(\d+)/)?.[1]) || urls.length + 1;
  //  next = next.replace(/page=\d+/, `page=${pageNum + 1}`);
 // }

 // const others = await Promise.all(urls.map(url => $.get(url)));
 // return [first, ...others].flatMap(page => page.results);
//	}

//	fetchAllParallel(baseUrl);

	/*
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
		*/

	// Avvia il caricamento dalla prima pagina
	
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