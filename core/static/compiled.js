(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* globals Request */

const Cookies = require('js-cookie')

correctButtons()
favoriteButtons()
deleteButton()

function deleteButton(){
    const deleteButton = document.querySelector('#delete-q-button')
    deleteButton.addEventListener('click', function(event) {
        console.log(document.querySelector('#perm-delete-link'))
        document.querySelector('#perm-delete-link').removeAttribute("hidden")
    })
}

const showForm = document.querySelector('#showFormButton')

showForm.addEventListener('click', function(event){
    let answerForm = document.querySelector('#answerForm')
    answerForm.removeAttribute("hidden")
})



function correctButtons(){
    let make_correct_buttons = document.querySelectorAll('.makeCorrectLink')
    for (button of make_correct_buttons){
        button.addEventListener('click', function(event){
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
}

function favoriteButtons(){
    const q_fav_button = document.querySelector('#q-fav-button')
    q_fav_button.addEventListener('click', function(event){
        const questionPk = event.target.dataset.questionpk
        fetch(postFavQuestion( questionPk ))
        .then (response => response.json())
        .then (function (data){
            if (data.removed){
                document.querySelector(`#q-fav-button`).innerText = "☆"
            } else{
                document.querySelector(`#q-fav-button`).innerText = "★"
            }
        })
    })
    
    const a_fav_buttons = document.querySelectorAll('.a-fav-button')
    for (button of a_fav_buttons){
        button.addEventListener('click', function(event){
            const answerPk = event.target.dataset.answerpk
            fetch(postFavAnswer( answerPk ))
            .then (response => response.json())
            .then (function (data){
                if (data.removed){
                    document.querySelector(`#fav-${ answerPk }`).innerText = "☆"
                } else {
                    document.querySelector(`#fav-${ answerPk }`).innerText = "★"
                }
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

const answer_submit = document.querySelector('#answerSubmit')


answer_submit.addEventListener('click', function(event){
    event.preventDefault()
    console.log("The answer button has been submited")
    let answerForm = document.querySelector('#answerForm')
    answerForm.setAttribute("hidden","hidden")
    const questionPk = event.target.dataset.questionpk
    const answerInput = document.querySelector("#answerInput").value;
    console.log(answerInput)
    fetch(postAnswer( questionPk, answerInput ))
    .then (response => response.json())
    .then (function (data){
        //location.reload()
        const newAnswer = document.createElement('p')
        newAnswer.innerHTML = `
        
        <strong>${data.answerInput} - by ${data.answer_author}</strong>
        
        
        `
        const nodeAnswer = document.querySelector("#individualAnswer")
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

},{"js-cookie":2}],2:[function(require,module,exports){
/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!this.json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));

},{}]},{},[1]);
