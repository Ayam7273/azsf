document.addEventListener("DOMContentLoaded", function() {
    const questions = document.querySelectorAll(".nisab-question h3");

        questions.forEach(question => {
            question.addEventListener("click", function() {
                const answer = this.nextElementSibling;
                const arrowIcon = this.querySelector(".arrow i");

                answer.classList.toggle("active");

                if (answer.classList.contains("active")) {
                    answer.style.display = "block";
                    arrowIcon.classList.remove("fa-chevron-down");
                    arrowIcon.classList.add("fa-chevron-up");
                } else {
                    answer.style.display = "none";
                    arrowIcon.classList.remove("fa-chevron-up");
                    arrowIcon.classList.add("fa-chevron-down"); 
                }

                question.classList.toggle("open");
            });
        });
    });