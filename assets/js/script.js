let doc = document;
let url = "https://opentdb.com/api.php?amount=50";

let container = doc.querySelector(".container");
let get_started = doc.querySelector(".get-started");

const the_question = doc.createElement("h1");
const answers = doc.createElement("div");
const apply = doc.createElement("div");
const next = doc.createElement("button");

the_question.classList.add("question");
answers.classList.add("answers");
apply.classList.add("apply");
next.classList.add("next");
next.innerHTML = "Next";

async function get_data(){
    let response = await fetch(url);
    let questions = await response.json();

    get_started.addEventListener("click",()=>{
        fetch_questions(questions, the_question, next, answers);
    });

    let count = 1;
    next.addEventListener("click",()=>{
        the_question.innerHTML = "";
        the_question.innerHTML = `${count + 1} - ${questions.results[count].question}`;
        answers.innerHTML = "";
        let answer_of_question = [];
        answer_of_question.push(questions.results[count].correct_answer);
        for (let j = 0; j < questions.results[count].incorrect_answers.length; j++) {
            answer_of_question.push(questions.results[count].incorrect_answers[j]);
        };
        let sorted_answers = answer_of_question.sort();
        create_answers(sorted_answers, answers);
        next.style.display = "none";
        count++;
    });

    answers.addEventListener("click",(e)=>{
        const answer = e.target;
        for (let i = 0; i < questions.results.length; i++) {
            for (let j = 0; j < questions.results[i].incorrect_answers.length; j++) {
                if (answer.innerHTML == questions.results[i].correct_answer) {
                    answer.style.backgroundColor = "green";
                    if (count === questions.results.length) {
                        container.innerHTML = "";
                        container.innerHTML += `<div class='wins'>
                                                    <h2 class="win-msg">You Win's</h2>
                                                    <button class="play-again">Play Again</button>
                                                </div>`;
                        container.children[0].children[1].addEventListener("click", ()=>{
                            container.innerHTML = "";
                            play_again();
                        });
                    }else{
                        true_answer(next);
                    }
                }
                else if(answer.innerHTML == questions.results[i].incorrect_answers[j]){
                    answer.style.backgroundColor = "red";
                    false_answer();
                }
            }
        }
    });
    apply.appendChild(next)
    container.appendChild(the_question);
    container.appendChild(answers);
    container.appendChild(apply);
};
get_data();

function create_answers(question_answers, answers) {
    answers.innerHTML = "";
    question_answers.map(answer =>{
        answers.innerHTML  += `<div class="answer">${answer}</div>`;
    });
}
function true_answer(next){
    next.style.display = "block";
}
function false_answer(){
    container.innerHTML = "";
    container.innerHTML += `<h2 class="lose">You lose</h2>
                            <div class="get-started">
                                <button class="start">Play Again!</button>
                            </div>`;
    container.children[1].children[0].addEventListener("click", ()=>{
        container.innerHTML = "";
        play_again();
    })
}
function fetch_questions(questions, the_question, next, answers){
    the_question.innerHTML = "";
    the_question.innerHTML = `1 - ${questions.results[0].question}`;
    let answer_of_first_question = [];
    answer_of_first_question.push(questions.results[0].correct_answer);
    for (let j = 0; j < questions.results[0].incorrect_answers.length; j++) {
        answer_of_first_question.push(questions.results[0].incorrect_answers[j]);
    };
    let sorted_first_answers = answer_of_first_question.sort();
    create_answers(sorted_first_answers, answers);
    container.style.display = "block";
    get_started.style.display = "none";
    next.style.display = "none";
}
async function play_again(){
    let response = await fetch(url);
    let play_again_questions = await response.json();
    fetch_questions(play_again_questions, the_question, next, answers);

    let count = 1;
    next.addEventListener("click",()=>{
        the_question.innerHTML = "";
        the_question.innerHTML = `${count + 1} - ${play_again_questions.results[count].question}`;
        answers.innerHTML = "";
        let answer_of_question = [];
        answer_of_question.push(play_again_questions.results[count].correct_answer);
        for (let j = 0; j < play_again_questions.results[count].incorrect_answers.length; j++) {
            answer_of_question.push(play_again_questions.results[count].incorrect_answers[j]);
        };
        let sorted_answers = answer_of_question.sort();
        create_answers(sorted_answers, answers);
        count++;
        next.style.display = "none";
    });

    answers.addEventListener("click",(e)=>{
        const answer = e.target;
        for (let i = 0; i < play_again_questions.results.length; i++) {
            for (let j = 0; j < play_again_questions.results[i].incorrect_answers.length; j++) {
                if (answer.innerHTML == play_again_questions.results[i].correct_answer) {
                    answer.style.backgroundColor = "green";
                    if (count === play_again_questions.results.length) {
                        container.innerHTML = `<div class='wins'>
                                                    <h2 class="win-msg">You Win's</h2>
                                                    <button class="play-again">Play Again</button>
                                                </div>`;
                        container.children[0].children[1].addEventListener("click", ()=>{
                            container.innerHTML = "";
                            play_again();
                        });
                    }else{
                        true_answer(next);
                    }
                }
                else if(answer.innerHTML == play_again_questions.results[i].incorrect_answers[j]){
                    answer.style.backgroundColor = "red";
                    false_answer();
                }
            }
        }
    });
    apply.appendChild(next)
    container.appendChild(the_question);
    container.appendChild(answers);
    container.appendChild(apply);
}