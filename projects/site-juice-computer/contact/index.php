<?php
	file_get_contents("php://input");
	$objDatos = json_decode(file_get_contents("php://input"));
	  
	$dest = "juicecomputer13@gmail.com";
	$nombre = $objDatos->name;
	$asunto = "$nombre Quiere establecer contacto con JuiceComputer";
	$mensaje = $objDatos->msg;
	$de = $objDatos->mail;
	    
	$headers = "MIME-Version:1.0;\r\n";
	$headers .= "Content-type: text/html; \r\n charset=UTF-8;\r\n";
	$headers .= "From: $de@juicecomputer.com \r\n";
	$headers .="To: $dest; \r\n Subject: $asunto \r\n";
	    
	try {
	    mail($dest,$asunto,$mensaje,$headers);
	    echo "Mensaje enviado";	
	} catch (Exception $e) {
		echo 'Excepción capturada: ',  $e->getMessage(), "\n";
	}

?>