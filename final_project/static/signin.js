/* jshint esversion: 6 */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    let create = document.getElementById("account");

    create.addEventListener('click', function (){
        window.location.href = '/create/';
    });

    let sign = document.getElementById("sign_in");

    sign.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(sign);

        fetch('', {
            method: 'POST',
            body: formData
        })

        .then(function (response) {
            return response.json();
        })

        .then(function (user) {
            if (user.found) {
                window.location.href = "/account/";
            } else {
                setTimeout(function () {
                    document.getElementById("name").value = "";
                    document.getElementById("password").value = "";
                }, 1000);

                window.alert("Ups. Something went wrong. If you do not have an account\nmake sure to create one. Otherwise try to sign in again!");
            }
        });
    });


});



