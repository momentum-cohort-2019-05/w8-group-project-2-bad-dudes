/* globals Request */

const Cookies = require('js-cookie')

let make_correct_buttons = document.querySelectorAll('.makeCorrectLink')
for (button of make_correct_buttons){
    button.addEventListener('click', function(event){
        const answerPk = event.target.dataset.answerpk
        const questionPk = event.target.dataset.questionpk
        fetch(postMarkCorrect( questionPk, answerPk ))
        .then (response => response.json())
        .then (function (data){
            console.log(data)
        })
    })
}



// function getRandomCard (stackPk) {
//   return new Request(`/json/stacks/${stackPk}/random-card/`, { 'credentials': 'include' })
// }

// function getRandomVocab (stackPk) {
//   return new Request(`/json/vocab/word/`, { 'credentials': 'include' })
// }

function postMarkCorrect (questionPk, answerPk){
    const csrftoken = Cookies.get('csrftoken')
    return new Request(`/json/mark-correct/${questionPk}/${answerPk}`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({ 'questionPk': questionPk, 'answerPk': answerPk })
    })
}

// function postCardResults (cardPk, correct) {
//   const csrftoken = Cookies.get('csrftoken')
//   return new Request(`/json/card-results/${cardPk}/`, {
//     credentials: 'include',
//     method: 'POST',
//     headers: {
//       'X-CSRFToken': csrftoken
//     },
//     body: JSON.stringify({ 'correct': correct })
//   })
// }

// module.exports = {
//   'getRandomCard': getRandomCard,
//   'postCardResults': postCardResults,
//   'getRandomVocab': getRandomVocab
// }
