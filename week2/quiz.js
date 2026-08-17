const quizData = {
    html: [
        { q: "HTML stands for?", a: "Hyper Text Markup Language" },
        { q: "Which tag creates a paragraph?", a: "<p>" }
    ],
    css: [
        { q: "CSS stands for?", a: "Cascading Style Sheets" },
        { q: "Which property changes text color?", a: "color" }
    ],
    javascript: [
        { q: "Which keyword declares a variable?", a: "let" },
        { q: "Which function prints to console?", a: "console.log()" }
    ],
    python: [
        { q: "Python function to print?", a: "print()" },
        { q: "Which keyword defines a function?", a: "def" }
    ],
    mysql: [
        { q: "SQL command to retrieve data?", a: "SELECT" },
        { q: "SQL command to delete data?", a: "DELETE" }
    ]
};

let btn = document.getElementById("stbutton");

btn.addEventListener("click", function (event) {

    event.preventDefault();

    let category = document.getElementById("category").value;

    let level = document.querySelector('input[name="level"]:checked');

    if (level == null) {
        alert("Please select difficulty.");
        return;
    }

    document.body.style.backgroundColor = "lightblue";

    let questions = quizData[category];

    let score = 0;

    for (let i = 0; i < questions.length; i++) {

        let ans = prompt(questions[i].q);

        if (ans == null) return;

        if (ans.toLowerCase() === questions[i].a.toLowerCase()) {
            score++;
        }
    }

    document.body.style.backgroundColor = "lightgreen";

    alert("Quiz Finished\n\nScore : " + score + "/" + questions.length);
});