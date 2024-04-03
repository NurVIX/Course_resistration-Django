/* jshint esversion: 6 */


document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    document.getElementById("sendButton").addEventListener('click', function (){
        var checkboxes = document.querySelectorAll('#courseList input[type="checkbox"]:checked');
        var selectedCoursesContainer = document.getElementById('selectedCourses').querySelector('ul'); // ensure we're selecting the UL within the container

        checkboxes.forEach(function (checkbox) {
            var listItem = checkbox.parentNode;
            checkbox.checked = false; // uncheck the checkbox
            // Insert the list item at the top of the container
            selectedCoursesContainer.insertBefore(listItem, selectedCoursesContainer.firstChild);
        });
    });
});