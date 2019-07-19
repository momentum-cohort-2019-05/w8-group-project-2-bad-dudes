/* globals Request */

const Cookies = require('js-cookie')

let make_correct_buttons = document.querySelectorAll('.makeCorrectLink')
let answer_submit = document.querySelector('#answerSubmit')

for (button of make_correct_buttons){
    button.addEventListener('click', function(event){
        console.log(event)
        // console.log("they're watching")
        const answerPk = event.target.dataset.answerpk
        const questionPk = event.target.dataset.questionpk
        fetch(postMarkCorrect( questionPk, answerPk ))
        .then (response => response.json())
        .then (function (data){
            document.querySelector(`#answer-${answerPk}`).innerText = "CORRECT ANSWER (Click to remove)"
            if (data.previous_correct_answer_pk) {
                document.querySelector(`#answer-${data.previous_correct_answer_pk}`).innerText = "Mark Answer as Correct"
            }
        })
    })
}


answer_submit.addEventListener('click', function(event){
    event.preventDefault()
    console.log("The answer button has been submited")
    const questionPk = event.target.dataset.questionpk
    const answerInput = document.querySelector("#answerInput").value;
    console.log(answerInput)
    fetch(postAnswer( questionPk, answerInput ))
    .then (response => response.json())
    .then (function (data){
        //location.reload()
        const newAnswer = document.createElement('p')
        newAnswer.innerHTML = `<strong>${data.answerInput} - by ${data.author}</strong>`
        const nodeAnswer = document.querySelector("#displayAnswers")
        nodeAnswer.insertBefore(newAnswer, nodeAnswer.childNodes[0])
    })
})


// function getRandomCard (stackPk) {
//   return new Request(`/json/stacks/${stackPk}/random-card/`, { 'credentials': 'include' })
// }

// function getRandomVocab (stackPk) {
//   return new Request(`/json/vocab/word/`, { 'credentials': 'include' })
// }

function postMarkCorrect (questionPk, answerPk){
    const csrftoken = Cookies.get('csrftoken')
    // console.log(`csrftoken: ${csrftoken}`)
    // console.log(`questionPk: ${questionPk}`)
    // console.log(`answerPk: ${answerPk}`)

    return new Request(`/json/mark-correct/${questionPk}/${answerPk}/`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({ 'questionPk': questionPk, 'answerPk': answerPk })
    })
}


function postAnswer ( questionPk, answerInput ){
    const csrftoken = Cookies.get('csrftoken')

    return new Request(`/json/post-answer/${questionPk}/`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({ 'questionPk': questionPk, 'answerInput': answerInput })
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
