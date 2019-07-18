/* globals Request */

const Cookies = require('js-cookie')

// function getRandomCard (stackPk) {
//   return new Request(`/json/stacks/${stackPk}/random-card/`, { 'credentials': 'include' })
// }

// function getRandomVocab (stackPk) {
//   return new Request(`/json/vocab/word/`, { 'credentials': 'include' })
// }

function markCorrect (questionPk, answerPk){
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
