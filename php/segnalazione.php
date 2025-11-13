<?php
	// Recupero dei dati:
	$email = $_POST['email'] ?? '';
	$segnalazione = $_POST['segnalazione'] ?? '';
	
	$pattern = "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/";
	
	// Messaggio di errore email:
	if(!preg_match($pattern, $email)){
		echo "<p style='color:red'>Email non valida!</p>";
		exit;
	}
	
	// Messaggio di errore segnalazione:
	if(empty(trim($segnalazione))){
		echo "<p style='color:red'>Segnalazione vuota!</p>";
		exit;
	}
	
	// Messaggio di successo:
	echo "<p style='color:lightgreen'>Segnalazione riuscita da:<br>$email</p>";
?>