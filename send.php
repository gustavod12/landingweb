<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre  = trim($_POST["nombre"]);
    $email   = trim($_POST["email"]);
    $asunto  = trim($_POST["asunto"]);
    $mensaje = trim($_POST["mensaje"]);

    $destino = "contacto@gudu.ar";
    $asuntoFinal = "Nueva consulta desde el sitio web: " . $asunto;

    $cuerpo = "
    Nombre: $nombre\n
    Email: $email\n
    Asunto: $asunto\n
    Mensaje:\n$mensaje
    ";

    $headers = "From: $nombre <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($destino, $asuntoFinal, $cuerpo, $headers)) {
        echo "OK";
    } else {
        echo "ERROR";
    }
}
?>
