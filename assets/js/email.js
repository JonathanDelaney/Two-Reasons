////// Initialise Variables As Name and Email, and Project Feedback
let inputFields = document.getElementById("feedbackForm");
let projectFeedback = document.getElementById("projectfeedback");

//////////// Email API calling function
function sendMail(contactForm) {
    emailjs.send("service_ek6rze1", "template_b6jn9i1", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_feedback": contactForm.projectfeedback.value
    })
        .then(
            function (response) {
                successMessage(); // Sends Successful Message
            },
            function (error) {
                inputFields.reset();
                alert("Sorry, it failed to send! Please Retry.") // Sends Failure Message
            });
    return false;
};

 ///////////////// Success Message
function successMessage () {
    $("#feedbackContainer").html('<h1 class="feedback-response">Thanks For the feedback!!</h1><a href="index.html" class="main-link">Back to Main</a>');
}
