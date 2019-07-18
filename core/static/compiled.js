(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* globals Request */

// const Cookies = require('js-cookie')

let make_correct_buttons = document.querySelectorAll('.makeCorrectLink')
for (button of make_correct_buttons){
    button.addEventListener('click', function(event){
        console.log(event)
        console.log("How you like me now?")
        const answerPk = event.target.dataset.answerpk
        const questionPk = event.target.dataset.questionpk
        // fetch(postMarkCorrect( questionPk, answerPk ))
        // .then (response => response.json())
        // .then (function (data){
        //     console.log(data)
        // })
    })
}



// function getRandomCard (stackPk) {
//   return new Request(`/json/stacks/${stackPk}/random-card/`, { 'credentials': 'include' })
// }

// function getRandomVocab (stackPk) {
//   return new Request(`/json/vocab/word/`, { 'credentials': 'include' })
// }

// function postMarkCorrect (questionPk, answerPk){
//     const csrftoken = Cookies.get('csrftoken')
//     return new Request(`/json/mark-correct/${questionPk}/${answerPk}`, {
//         credentials: 'include',
//         method: 'POST',
//         headers: {
//             'X-CSRFToken': csrftoken
//         },
//         body: JSON.stringify({ 'questionPk': questionPk, 'answerPk': answerPk })
//     })
// }

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

},{}]},{},[1]);
