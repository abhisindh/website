function sendMail(){
    console.log("starting...");
    var params = {
        user_name: document.getElementById('user_name').value,
        user_email: document.getElementById('user_email').value,
        message: document.getElementById('message').value
    }
    emailjs.send("service_f77fmp2","contact_form",params).then(function (res){
        alert("Send Message");
    })
}




// (function() {
//     emailjs.init("user_5EbI5orzDfnG1kbTlteYs");
//     })();
// window.onload = function() {
//     document.getElementById('contact-form').addEventListener('submit', function(event) {
//         event.preventDefault();
//         // generate a five digit number for the contact_number variable
//         this.contact_number.value = Math.random() * 100000 | 0;
//         // these IDs from the previous steps
//         emailjs.sendForm('service_f77fmp2', 'contact_form', this)
//             .then(function() {
//                 console.log('SUCCESS!');
//                 alert('Message sent');
//                 location.reload()
//             }, function(error) {
//                 console.log('FAILED...', error);
//                 console.log('Some error happened! Try again');
//             });
//     });
// }