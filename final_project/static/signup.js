 /* jshint esversion: 6 */

 document.addEventListener("DOMContentLoaded", () => {
     "use strict";

     let create = document.getElementById("create_account");

     create.addEventListener('submit', (event) => {
         event.preventDefault();
         const formData = new FormData(create);

         fetch('/create/', {
             method: 'POST',
             body: formData
         })

         .then(function (response) {
            return response.json();
         })

         .then(function (user) {
             if(user.exist) {
                 window.alert('It seems that user is already taken.\nFeel free to choose a different one.');

                setTimeout(function () {
                    document.getElementById("name").value = "";
                    document.getElementById("password").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("date").value = "";
                }, 1000);

             } else {
                 window.alert("Account created");
                 window.location.href = '/account/';
             }
         });

     });
     history.pushState(null, null, location.href);
     window.onpopstate = function () {
         history.go(1);
    };
 });
