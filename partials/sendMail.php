<?php
$yourEmailAddress = 'sithick@falconcreativestudio.com'; //Put your own email address here.

//Check to make sure that the name field is not empty
if(trim($_POST['contactname']) == '') {
	$hasError = true;
} else {
	$name = trim($_POST['contactname']);
}

//Check to make sure that the subject field is not empty
if(trim($_POST['subject']) == '') {
	$hasError = true;
} else {
	$subject = trim($_POST['subject']);
}

//Check to make sure sure that a valid email address is submitted
if(trim($_POST['email']) == '')  {
	$hasError = true;
} else if (!preg_match("/^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$/i", trim($_POST['email']))) {
	$hasError = true;
} else {
	$email = trim($_POST['email']);
}

//Check to make sure comments were entered
if(trim($_POST['message']) == '') {
	$hasError = true;
} else {
	if(function_exists('stripslashes')) {
		$comments = stripslashes(trim($_POST['message']));
	} else {
		$comments = trim($_POST['message']);
	}
}

//If there is no error, send the email
if(!isset($hasError)) {
	$emailTo = $yourEmailAddress;
	$body = "Name: $name \n\nEmail: $email \n\nSubject: $subject \n\nMessage:\n $comments";
	$headers = 'From: Interion Template <'.$emailTo.'>' . "\r\n" . 'Reply-To: ' . $email;
	mail($emailTo, $subject, $body, $headers);
	echo'<div id="success" class="sent success"><p><strong>Email Successfully Sent!</strong><br>Thanks for contacting Us. Your email was successfully sent and we \'ll be in touch with you soon.</p></div>';
} else { //If errors are found
	echo '<p class="error">Please check if you\'ve filled all the fields with valid information and try again. Thank you.</p>';
} 
 
 ?>