<?php
// load auto loader agar lib bisa bekerja.
require_once 'PHPMailer-5.2.14'.DIRECTORY_SEPARATOR.'PHPMailerAutoload.php';

$useremail = "[sender]@gmail.com";
$userpass = "[sender-gmail-pass]";

$mail = new PHPMailer();
$mail->IsSMTP(); // !
$mail->SMTPDebug = 0; // debugging: 1 = errors and messages, 2 = messages only
$mail->SMTPAuth = true; // authentication enabled
$mail->SMTPSecure = 'ssl'; // REQUIRED for Gmail
$mail->Host = "smtp.gmail.com";
$mail->Port = 465; // or 587
$mail->IsHTML(true);
$mail->Username = $useremail;
$mail->Password = $userpass;
$mail->SetFrom($useremail);

$mail->Subject = "For [receiver]";
$mail->Body = "Hello <b>[receiver]</b>. This is a SMTP (g)mail test";
$mail->AddAddress("[receiver]@[mail].com");

if(!$mail->Send()) {
	echo "fail: " . $mail->ErrorInfo;
} else {
	echo "done";
}
