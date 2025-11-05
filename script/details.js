// File: "details.js"
// Dettagli: contiene la gestione di tabella/form del file "details.html"

let campi = {};     // conterrà i dati della starship

$(document).ready(function() {
    // Recupero dell'url:
    const params = new URLSearchParams(window.location.search);
    const starshipUrl = params.get("url");

    // Chiamata AJAX verso l’endpoint della starship
    $.getJSON(starshipUrl, function(starship){
        // Imposta il titolo con il nome della starship
        $("#idTitoloDetails").text(starship.name);
		
		let imageName = starship.name.toLowerCase().replace(/ /g, "_") + ".png";
		$("#starshipImage").attr("src", `images/starships/${imageName}`);

        // Riempimento del Json con i dati:
		campi = {
			MODELLO: starship.model,
			PRODUTTORE: starship.manufacturer,
			COSTO: starship.cost_in_credits,
			LUNGHEZZA: starship.length,
			VELOCITA_MASSIMA: starship.MGLT,
			EQUIPAGGIO: starship.crew,
			PASSEGGERI: starship.passengers,
			CLASSE: starship.starship_class
		}
		
		// Creazione iniziale della tabella:
		creaTabellaCampi();
		
    });

    // Gestione form di aggiunta/modifica campi:
    $("#buttonStarship").click(function(e) {
        e.preventDefault();

        if (aggiungiCampo()) {
            creaTabellaCampi();
        }
    });
});

// Funzione per aggiungere o modificare un campo
function aggiungiCampo(){
    let nomeCampo = $("#nomeCampo").val().trim();
    let valoreCampo = $("#valoreCampo").val().trim();
	
    if(!nomeCampo || !valoreCampo) return false;
	
    campi[nomeCampo] = valoreCampo;
	
    // Reset input
    $("#nomeCampo").val("");
    $("#valoreCampo").val("");

    return true;
}

// Funzione per creare/aggiornare la tabella:
function creaTabellaCampi(){
    let html = `
        <table border="1">
            <tr>
                <th>NOME CAMPO</th>
                <th>VALORE</th>
            </tr>
    `;
	
	Object.entries(campi).forEach(([chiave, valore], index) => {
        html += `
			<tr data-index="${index}">
				<td>${chiave}</td>
				<td>${valore}</td>
				<td><button class="eliminaCampo" data-nome="${chiave}">🗑️</button></td>
			</tr>
		`;
    });
	
	html += "</table>";
	
	$("#tableDetails").html(html);
	
	// Invio dei dati al form:
	$("#tableDetails tr[data-index]").click(function(){
        indice = $(this).data("index");
        const entries = Object.entries(campi);
        $("#nomeCampo").val(entries[indice][0]);
        $("#valoreCampo").val(entries[indice][1]);
    });

    // Eliminazione di una riga con richiesta di conferma:
    $(".eliminaCampo").click(function(){
        const nomeCampo = $(this).data("nome");
        if(confirm(`Vuoi davvero eliminare il campo "${nomeCampo}"?`)){
            delete campi[nomeCampo];
            creaTabellaCampi();
        }
    });
}