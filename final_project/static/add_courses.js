// /* jshint esversion: 6 */
//
// document.addEventListener('DOMContentLoaded', () => {
//     "use strict";
//
//     document.getElementById('submit').addEventListener('click', () => {
//         const selectedCoursesElements = document.querySelectorAll('#selectedCourses li');
//         const selectedCourses = Array.from(selectedCoursesElements).map(li => li.textContent.trim());
//
//         // Here you would send `selectedCourses` to your server.
//         // For demonstration, we'll just log to the console.
//         console.log(selectedCourses);
//
//         // If you're not using AJAX, you might instead submit a form.
//         // If using AJAX, upon success, update the main page content or redirect as needed.
//     });
// });

/* jshint esversion: 6 */

document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    let form = document.getElementById('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const courseItems = document.querySelectorAll('#selectedCourses li');

        const courseNames = Array.from(courseItems)
        .map(li => li.textContent.trim())
        .filter(name => name !== ''); // Filter out empty strings

        let token;

        for (let [key, value] of formData.entries()) {
            if (key === 'csrfmiddlewaretoken') {
                token = value;
            }
        }

        fetch('/courses/', {
            method: 'POST',
            headers: {
                'X-CSRFTOKEN': token,
            },

            body: JSON.stringify({courses: courseNames}),
        })

        .then(function (response) {
            return response.json();
        })

        .then(function (user){
            if(user.registered){
                window.location.href = '/account/';
            }
        });

    });
});