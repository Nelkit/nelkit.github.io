<?php

if(isset($_POST['pers3']) && !empty($_POST['pers3']) 
  && isset($_POST['email3']) && !empty($_POST['email3'])
  && isset($_POST['asunt3']) && !empty($_POST['asunt3'])
  && isset($_POST['content3']) && !empty($_POST['content3']))
{
  
$dest = "juicecomputer13@gmail.com";
$nombre = $_POST['pers3'];
$asunto = "Enviado por $nombre:".$_POST['asunt3'];
$mensaje = $_POST['content3'];
$de = $_POST['email3'];
    
$headers = "MIME-Version:1.0;\r\n";
$headers .= "Content-type: text/html; \r\n charset=UTF-8;\r\n";
$headers .= "From: $de@juicecomputer.com \r\n";
$headers .="To: $dest; \r\n Subject: $asunto \r\n";
    
    mail($dest,$asunto,$mensaje,$headers);
    echo "Mensaje enviado";
	header("Location: ../index.html");
	die(); 	
}

else {

    echo "Fallo de envío";
	header("Location: ../index.html");
	die();
}

    ?>