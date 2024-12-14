let url = "https://opentdb.com/api.php?amount=50";

let container = document.querySelector(".container");
let question = document.querySelector(".question");
let answer = document.querySelector(".answers");
let submit = document.querySelector(".submit");
let next = document.querySelector(".next");
let get_started = document.querySelector(".get-started");

async function get_data(){
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data.results);
    

    get_started.addEventListener("click",()=>{
        question.innerHTML = data.results[0].question;
        let answer_of_first_question = [];
        answer_of_first_question.push(data.results[0].correct_answer);
        for (let j = 0; j < data.results[0].incorrect_answers.length; j++) {
            answer_of_first_question.push(data.results[0].incorrect_answers[j]);
        };
        let sorted_first_answers = answer_of_first_question.sort();
        for (let i = 0; i < answer_of_first_question.length; i++) {
            answer.innerHTML  += `<div>${sorted_first_answers[i]}</div>`;
        };
        
        container.style.display = "block";

        let count = 1;
        next.addEventListener("click",()=>{
            question.innerHTML = data.results[count].question;
            answer.innerHTML = "";
                    let answer_of_question = [];
                    answer_of_question.push(data.results[count].correct_answer);
                    for (let j = 0; j < data.results[count].incorrect_answers.length; j++) {
                        answer_of_question.push(data.results[count].incorrect_answers[j]);
                    };
                    let sorted_answers = answer_of_question.sort();
                for (let i = 0; i < sorted_answers.length; i++) {
                    answer.innerHTML  += `<div>${sorted_answers[i]}</div>`;
                }
            count++;
        });

        answer.addEventListener("click",(e)=>{
            for (let i = 0; i < data.results.length; i++) {
                for (let j = 0; j < data.results[i].incorrect_answers.length; j++) {
                    if (e.target.innerHTML == data.results[i].correct_answer) {
                        e.target.style.backgroundColor = "green";
                    }
                    else if(e.target.innerHTML == data.results[i].incorrect_answers[j]){
                        e.target.style.backgroundColor = "red";
                    }
                }
            }
        });
    });
    
};
get_data();