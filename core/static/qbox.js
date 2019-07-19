/* globals Request */

const Cookies = require('js-cookie')

correctButtons()
favoriteButtons()

function correctButtons(){
    let make_correct_buttons = document.querySelectorAll('.makeCorrectLink')
    for (button of make_correct_buttons){
        button.addEventListener('click', function(event){
            const answerPk = event.target.dataset.answerpk
            const questionPk = event.target.dataset.questionpk
            fetch(postMarkCorrect( questionPk, answerPk ))
            .then (response => response.json())
            .then (function (data){
                document.querySelector(`#answer-${answerPk}`).innerText = "CORRECT ANSWER"
                if (data.previous_correct_answer_pk) {
                    document.querySelector(`#answer-${data.previous_correct_answer_pk}`).innerText = "Mark Answer as Correct"
                }
            })
        })
    }
}

function favoriteButtons(){
    const q_fav_button = document.querySelector('#q-fav-button')
    q_fav_button.addEventListener('click', function(event){
        const questionPk = event.target.dataset.questionpk
        fetch(postFavQuestion( questionPk ))
        .then (response => response.json())
        .then (function (){
            document.querySelector(`#q-fav-button`).innerText = "Favorited"
        })
    })
    
    const a_fav_buttons = document.querySelectorAll('.a-fav-button')
    for (button of a_fav_buttons){
        button.addEventListener('click', function(event){
            const answerPk = event.target.dataset.answerpk
            fetch(postFavAnswer( answerPk ))
            .then (response => response.json())
            .then (function (data){
                document.querySelector(`#fav-${ answerPk }`).innerText = "Favorited"
            console.log(`favorite answer - ${answerPk}`)
            })
        })
    }

}

function postFavAnswer( answerPk ){
    const csrftoken = Cookies.get('csrftoken')

    return new Request(`/json/fav-answer/${answerPk}/`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({ 'answerPk': answerPk })
    })
}

function postFavQuestion( questionPk ){
    const csrftoken = Cookies.get('csrftoken')
    return new Request(`/json/fav-question/${questionPk}/`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({ 'questionPk': questionPk })
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

    return new Request(`/json/mark-correct/${questionPk}/${answerPk}/`, {
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
