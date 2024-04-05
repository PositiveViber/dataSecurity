document.addEventListener('DOMContentLoaded', () => {
    const startQuizContainer = document.getElementById('startQuizContainer');
    const startQuizButton = document.getElementById('startQuiz');
    const quizWrapper = document.getElementById('quizWrapper');
    const factImage = document.getElementById('factImage');
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');
    let currentPage = 0;
    const questionsPerPage = 1;


    
   const myQuestions = [
    { question: "Which of the following should you NOT do with your personal information on social media?",
            answers: {
                a: "Share it publicly without any restrictions",
                b: "Review privacy settings regularly",
                c: "Use privacy settings to control who sees your information"
            },
        correctAnswer: "a"
    },
    {
        question: "What does 'HTTPS' indicate in a website URL?",
        answers: {
            a: "That the website is secure and encrypted",
            b: "That the website is still loading",
            c: "That the website is experiencing technical difficulties"
        },
        correctAnswer: "a"
    },
    {
        question: "What should you do if you receive an email from an unknown sender asking for personal information?",
        answers: {
            a: "Ignore and delete the email",
            b: "Reply with the requested information",
            c: "Share the email with friends"
        },
        correctAnswer: "a"
    },
    {
        question: "Why is it important to use different passwords for different online accounts?",
        answers: {
            a: "To minimize the risk of multiple accounts being compromised if one password is leaked",
            b: "Because it's easier to remember one password for everything",
            c: "To confuse hackers"
        },
        correctAnswer: "a"
    },
    {
        question: "What should you do if you notice unauthorized activity on your bank account?",
        answers: {
            a: "Contact your bank immediately to report the suspicious activity",
            b: "Post about it on social media",
            c: "Ignore it and hope it goes away"
        },
        correctAnswer: "a"
    },
    {
        question: "What is a 'strong password'?",
        answers: {
            a: "A password that is long, contains a mix of letters, numbers, and special characters, and is not easily guessable",
            b: "A password that is short and easy to remember",
            c: "A password that is written on a sticky note attached to your computer"
        },
        correctAnswer: "a"
    },
    {
        question: "Why should you be cautious about clicking on links in emails from unknown senders?",
        answers: {
            a: "Because they could lead to phishing websites designed to steal your personal information",
            b: "Because they might take you to interesting websites",
            c: "Because they offer free prizes"
        },
        correctAnswer: "a"
    },
    {
        question: "What is a common method used by hackers to gain unauthorized access to accounts?",
        answers: {
            a: "Brute force attacks",
            b: "Sending flowers",
            c: "Sending friendly emails"
        },
        correctAnswer: "a"
    },
    {
        question: "Why is it important to keep your software and operating system updated?",
        answers: {
            a: "To patch security vulnerabilities and protect against cyber threats",
            b: "To make your computer run faster",
            c: "To get access to new emojis"
        },
        correctAnswer: "a"
    },
    {
        question: "What should you do if you suspect your computer is infected with malware?",
        answers: {
            a: "Run a reputable antivirus scan to remove the malware",
            b: "Ignore it and hope it goes away",
            c: "Tell your friends about it"
        },
        correctAnswer: "a"
    },
    {
        question: "What is a 'phishing' email?",
        answers: {
            a: "An email pretending to be from a legitimate source in order to trick recipients into revealing sensitive information",
            b: "An email with funny cat videos",
            c: "An email offering free money"
        },
        correctAnswer: "a"
    }
    // Add more questions as needed...
];
       
    const userAnswers = new Array(myQuestions.length);
    const images = ["image1.png", "image2.png", "image3.png", "image4.png", "image5.png", "image6.png", "image7.png"]; // Example array
    const tips = ["Always keep your operating system and applications updated. Software updates often include patches for security vulnerabilities that have been discovered since the last version.", " Use strong, unique passwords for all your accounts. A strong password is at least 12 characters long and includes a mix of letters, numbers, and special characters.", "Enable two-factor authentication (2FA) whenever available for an extra layer of security beyond just a password.", "Be cautious when using public Wi-Fi. Avoid accessing sensitive information like banking when connected to a public network.","Regularly backup your data. Whether you use a physical device like an external hard drive or a cloud service, backups can save you from data loss due to hardware failure, theft, or ransomware.", "Review and adjust privacy settings on social media and other online services to limit the amount of personal information you share publicly.", "Operate your computer with a user account that has the least privileges necessary to accomplish your tasks to reduce the risk of malware infection. Only use an administrator account when necessary. This prevents lost of important data."]; // Example array

    // Randomize the arrays
    shuffleArray(images);
    shuffleArray(tips);


 function buildQuizPage() {
        const pageQuestions = myQuestions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage);
        quizContainer.innerHTML = pageQuestions.map((currentQuestion, questionIndex) => {
            const questionNumber = currentPage * questionsPerPage + questionIndex;
            const answers = Object.keys(currentQuestion.answers).map(letter => 
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                </label>`
            ).join('');
            return (
                `<div class="slide">
                    <div class="question">${currentQuestion.question}</div>
                    <div class="answers">${answers}</div>
                </div>`
            );
        }).join('');
    }
    
    function showResults() {
        let numCorrect = 0;

        // Save the final page's selections before calculating results
        saveSelections();

        userAnswers.forEach((answer, index) => {
            if (answer === myQuestions[index].correctAnswer) {
                numCorrect++;
            }
         setTimeout(redirectToIndex, 2000); // 2 second delay before redirecting
        });

        // Display the number of correct answers out of the total
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length} questions correct. <br><br> Thanks for participating!`;

        // Hide the pagination buttons
        nextButton.style.display = 'none';
        prevButton.style.display = 'none';
        submitButton.style.display = 'none'; // Assuming we don't want to show it after completing the quiz
    }

     function saveSelections() {
        const startIndex = currentPage * questionsPerPage;
        const endIndex = Math.min(startIndex + questionsPerPage, myQuestions.length);

        for (let i = startIndex; i < endIndex; i++) {
            const selector = `input[name=question${i}]:checked`;
            const userAnswer = (document.querySelector(selector) || {}).value;
            userAnswers[i] = userAnswer; // Save the answer to the userAnswers array
        }
    }
function showNextPage() {
    saveSelections();
    currentPage++;
    if (currentPage * questionsPerPage >= myQuestions.length) {
        showResults();
    } else {
        buildQuizPage();
        loadFactImageAndTip(); // Load new fact and image
        if (currentPage * questionsPerPage >= myQuestions.length - questionsPerPage) {
            nextButton.textContent = 'Show Results';
        }
    }
    prevButton.style.display = 'inline-block';
}

function showPreviousPage() {
    if (currentPage > 0) {
        currentPage--;
        buildQuizPage();
        loadFactImageAndTip(); // Load new fact and image
        nextButton.textContent = 'Next Page';
    }
    if (currentPage === 0) {
        prevButton.style.display = 'none';
    }
}

function loadFactImageAndTip() {
    const index = currentPage % images.length; // Use modulo to loop back to the start of the arrays if needed
    factImage.src = images[index];
    factImage.alt = "Image " + (index + 1);
    document.querySelector('.sidebar p').textContent = tips[index];
    factImage.style.display = 'block';
}
    
    function startQuiz() {
        startQuizContainer.style.opacity = '0';
        setTimeout(() => {
            startQuizContainer.style.display = 'none';
            quizWrapper.style.display = 'flex';
            quizWrapper.style.opacity = '1';
            // Load the first image and tip
            loadFactImageAndTip(0);
            // Build the first page of the quiz
            buildQuizPage();
        }, 600); // This timeout duration should match the transition duration
    }

    function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
    // After quiz completion, redirect to index.html
    function redirectToIndex() {
        window.location.href = 'index.html';
    }
    
 startQuizButton.addEventListener('click', () => {
        startQuizContainer.style.display = 'none';
        quizWrapper.style.display = 'flex';

        // Load the first image and tip
        loadFactImageAndTip(0);

        // Call function to build and show the quiz
        buildQuizPage();
    });
// Start quiz event listener
    startQuizButton.addEventListener('click', startQuiz);

    // Event listeners for quiz navigation
    nextButton.addEventListener('click', showNextPage);
    prevButton.addEventListener('click', showPreviousPage);
    submitButton.addEventListener('click', showResults);

    // Initialize quiz visibility
    quizWrapper.style.opacity = '0';
    quizWrapper.style.transition = 'opacity 0.6s';
});