<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect post data
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

    // Process or store the posting data
    // For example, save to database, send email, etc.

    // Redirect to a new page or display a success message
    echo "Thank you for contacting us, " . $name . "!";
    // Or if you want to redirect:
    // header('Location: thank-you.html');
}
?>
