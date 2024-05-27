document.addEventListener('DOMContentLoaded', () => {
    const questionElement = document.getElementById('question');
    const feedbackElement = document.getElementById('feedback');
    const startBtn = document.getElementById('start-btn');
    const answerBtn = document.getElementById('answer-btn');

    const questions = [
        {
            question: "Wat voor plant heeft Stijn gekregen met Andy zijn lab1 project?",
            answer: "Aardbeienplant"
        },
        {
            question: "Wat voor kleur heeft een aardbei als hij nog niet rijp is?",
            answer: "Groen"
        },
        {
            question: "Wat voor kleur heeft een aardbei als hij rijp is?",
            answer: "Rood"
        },
    ];

    let currentQuestionIndex = 0;

    function askQuestion() {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex].question;
            questionElement.textContent = question;
            speak(question);
        } else {
            questionElement.textContent = "De quiz is voorbij!";
            feedbackElement.textContent = "";
            startBtn.style.display = 'block';
            answerBtn.style.display = 'none';
        }
    }

    function speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    }

    function listen() {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'nl-NL';
        recognition.start();

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            checkAnswer(transcript);
        };

        recognition.onerror = function(event) {
            feedbackElement.textContent = 'Sorry, ik kon je niet verstaan. Probeer het opnieuw.';
        };
    }

    function checkAnswer(answer) {
        const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();
        if (answer.toLowerCase() === correctAnswer) {
            feedbackElement.textContent = 'Juist!';
        } else {
            feedbackElement.textContent = `Fout! Het juiste antwoord is ${questions[currentQuestionIndex].answer}.`;
        }
        currentQuestionIndex++;
        setTimeout(askQuestion, 2000);
    }

    startBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        feedbackElement.textContent = '';
        startBtn.style.display = 'none';
        answerBtn.style.display = 'block';
        askQuestion();
    });

    answerBtn.addEventListener('click', () => {
        feedbackElement.textContent = 'Luisteren...';
        listen();
    });
});
