const questionEl = document.querySelector('.survey-question')
const surveyNumEl = document.querySelector('.survey-num')
const choicesEl = document.querySelector('.choices')
const buttonEl = document.querySelector('.nav-buttons')
const containerEl = document.querySelector('.container')


const survey = [
    {
        id: 1,
        question: ' What is descriptive analytics?',
        choices: ['Predicting future outcomes', 'Analyzing current data to understand what has happened', 'Identifying patterns and trends', 'Prescribing actions based on data'],
        correctAnswer: 'Analyzing current data to understand what has happened',
        answer: null
    },
    {
        id: 2,
        question: ' Which type of analysis involves analyzing data to understand the causes and relationships between marketing variables?',
        choices: ['Descriptive analysis', 'Predictive analysis', 'Prescriptive analysis', 'Diagnostic analysis'],
        correctAnswer: 'Diagnostic analysis',
        answer: null
    },
    {
        id: 3,
        question: ' Which type of analysis involves analyzing historical data to identify patterns and trends?',
        choices: ['Descriptive analysis', 'Predictive analysis', 'Prescriptive analysis', 'Diagnostic analysis'],
        correctAnswer: 'Descriptive analysis',
        answer: null
    },
    {
        id: 4,
        question: ' What does SAAS stand for?',
        choices: ['System Aerosurface Actuator Simulation', 'systems as a Service', 'Software acting as Service', 'Software as a Service'],
        correctAnswer: 'systems as a Service',
        answer: null
    },
    {
        id: 5,
        question: 'The science of examining raw data with the purpose of drawing conclusions about that information?',
        choices: ['Data Analytics', 'In-memory Analytics', ' Descriptive Analytics', 'Predictive Analytics'],
        correctAnswer: 'Data Analytics',
        answer: null
    },
    {
        id: 6,
        question: 'Which of the following is/are correct types of data?',
        choices: ['Semi-structured Data', 'Unstructured Data', 'Semi Data', 'Both a & b'],
        correctAnswer: 'Both a & b',
        answer: null
    },
    {
        id: 7,
        question: 'What is  analytics?',
        choices: ['The practice of measuring, managing, and analyzing data', 'The process of creating  campaigns', 'The practice of optimizing websites for search engines', 'The process of targeting specific customer segments'],
        correctAnswer: 'The practice of measuring, managing, and analyzing data',
        answer: null
    },
    {
        id: 8,
        question: 'The branch of data mining concerned with the prediction of future probabilities and trends.',
        choices: ['In-memory Analytics', 'Predictive Analytics', 'Behavioral Analytics', 'Big Data Analytics'],
        correctAnswer: 'Predictive Analytics',
        answer: null
    },
    {
        id: 9,
        question: 'Which of the following is a key component of predictive analytics?',
        choices: ['Historical data analysis', 'Understanding current trends', 'Real-time data processing', 'Prescriptive analysis'],
        correctAnswer: 'Historical data analysis',
        answer: null
    },
    {
        id: 10,
        question: 'What does the term "data visualization" refer to in analytics?',
        choices: ['Hiding data from unauthorized users', 'Representing data graphically for better understanding', 'Encrypting data for security purposes', 'Storing data in a database'],
        correctAnswer: 'Representing data graphically for better understanding',
        answer: null
    }
];



const surveyState = {
    currentQuestion: 1
}


const navigateButtonClick = (e) => {
    if(e.target.id == 'next') {
        surveyState.currentQuestion++
        initialSurvey()
    }

    if(e.target.id == 'prev') {
        surveyState.currentQuestion--
        initialSurvey()
    }
}

const checkBoxHandler = (e, question) => {    
    //Check if the chekbox has selected before if it is remove selected
    if(!e.target.checked) {
        e.target.checked = false
        question.answer = null
        return
    }
    
    const allCheckBoxes = choicesEl.querySelectorAll('input')
    allCheckBoxes.forEach(checkBox => checkBox.checked = false)
    e.target.checked = true
    question.answer = e.target.value    
}

const getResults = () => {
    const correctAnswerCount = survey.filter(question => question.answer == question.correctAnswer).length
    const emptyQuestionCount = survey.filter(question => question.answer === null).length
    const wrongQuestionCount = survey.filter(question => question.answer !== null && question.answer != question.correctAnswer).length


    return {
        correct: correctAnswerCount,
        empty: emptyQuestionCount,
        wrong: wrongQuestionCount
    }
}


const renderQuestion = (question) => {    
    //Last question of survey
    const lastQuestion = survey[survey.length - 1]
   // Check if all questions are answered, then insert some message
   if (surveyState.currentQuestion > lastQuestion.id) {
    const results = getResults();
    let message, className;

    if (results.correct === 10) {
        message = "Excellent! You have answered all questions correctly.";
        className = "excellent";
    } else if (results.correct >= 5) {
        message = "Good job! You have answered more than half of the questions correctly.";
        className = "good";
    } else {
        message = "Satisfactory. Keep practicing to improve.";
        className = "satisfactory";
    }
   containerEl.innerHTML = `<h1 class="test-completed ${className}">${message}</h1>
        <p class="results-info"> You have <strong>${results.correct}</strong> correct, <strong>${results.wrong}</strong> wrong, <strong>${results.empty}</strong> empty answers</p>                        
        <span class="tick"></span>`;
        return;
   }
    // Clean innerHTML before append
    surveyNumEl.innerHTML = ''
    choicesEl.innerHTML = ''
    buttonEl.innerHTML = ''
    // Render question and question id
    surveyNumEl.textContent = question.id + '-'
    questionEl.textContent = question.question
    // Render choices
    question.choices.forEach(choice => {
        const questionRowEl = document.createElement('p')
        questionRowEl.setAttribute('class','question-row')
        questionRowEl.innerHTML = `<label class="label">                                        
                                        <span class="choise">${choice}</span>
                                    </label>`
        //Create checkbox input
        const checkBoxEl = document.createElement('input')
        checkBoxEl.setAttribute('type', 'checkbox')
        // Bind checkboxHandler with event and current question
        checkBoxEl.addEventListener('change', (e) => checkBoxHandler(e, question))
        //Add answer to the input as a value
        checkBoxEl.value = choice
        //If question has answer already make it checked again
        if(question.answer === choice) {
            checkBoxEl.checked = true
        }
        //Insert into question row
        questionRowEl.firstChild.prepend(checkBoxEl)
        //Insert row to the wrapper
        choicesEl.appendChild(questionRowEl)                                    
    })

    //Next & Previous Buttons
    const prevButton = document.createElement('button')
    prevButton.classList.add('nav-button')
    prevButton.classList.add('prev')
    prevButton.id = 'prev'
    prevButton.textContent = 'Previous'
    prevButton.addEventListener('click', navigateButtonClick)

    const nextButton = document.createElement('button')
    nextButton.classList.add('nav-button')
    nextButton.classList.add('next')
    nextButton.id = 'next'
    nextButton.textContent = 'Next'
    nextButton.addEventListener('click', navigateButtonClick)



    //Display buttons according to survey current question
    if(question.id == 1){        
        buttonEl.appendChild(nextButton)
    } else if (surveyState.currentQuestion == lastQuestion) {
        buttonEl.appendChild(prevButton)
    } else {
        buttonEl.appendChild(prevButton)
        buttonEl.appendChild(nextButton)
    }   
    
}

const initialSurvey = () => {
    //Get the current question
    const currentQuestion = survey.find(question => question.id === surveyState.currentQuestion)
    // Render the currentQuestion
    renderQuestion(currentQuestion)    

}

initialSurvey()