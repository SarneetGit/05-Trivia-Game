
//Initialize score variables
var correct = 0,
wrong = 0,
timeup = 0,
time = 15,
intervalHold,
currentQuestion = {};

//Initialize questions that hold answers, options and more
var originialQuestions = [{
    qNum: 1,
    q: "If you are a teenager living on Elm Street, what should you never do?",
    a: "Go to sleep",
    options: ["Go to sleep", "Play with dolls", "Go to the prom", "Have sex"],
    isAsked: false,
    img: ""
},
{
    qNum: 2,
    q: "If you are up on your movie lore, then you also know that you should never accept what job on Halloween?",
    a: "Baby sitter",
    options: ["Hotel clerk", "Baby sitter", "Camp counselor", "Traveling salesman"],
    isAsked: false,
    img: ""
},
{   
    qNum: 3,
    q: "What should tip you off to a bad motel to check in to?",
    a: "The door is already unlocked",
    options: ["No one else has checked in for weeks", "There are strange smell in the air", "The door is already unlocked", "The TV cable is working"],
    isAsked: false,
    img: ""
}, 
{
    qNum: 4,
    q: "If you are looking for a job on Crystal Lake what offer should you not accept?",
    a: "Camp counselor",
    options: ["Mailman", "Truck driver", "Camp cook", "Camp counselor"],
    isAsked: false,
    img: ""
},
{
    qNum: 5,
    q: "British actor Boris Karloff created a cinematic icon when he played the role of what monster?",
    a: "Frankenstein",
    options: ["Dracula", "Werewolf", "Frankenstein", "Alien"],
    isAsked: false,
    img: ""
},
{
    qNum: 6,
    q: "Bela Lugosi was a Hungarian/American actor best known for his portrayal of what monster?",
    a: "Dracula",
    options: ["Dracula", "Werewolf", "Frankenstein", "Alien"],
    isAsked: false,
    img: ""
},
{
    qNum: 7,
    q: "In this 1970s book and novel, a mother believes her child (played by Linda Blair in the movie) is what?",
    a: "Possessed by a demon",
    options: ["An alien", "The devil", "Possessed by a demon", "Bearing the devil's baby"],
    isAsked: false,
    img: ""
},
{
    qNum: 8,
    q: "In a horror movie, you should worry if you encounter a doll named what?",
    a: "Chucky",
    options: ["Smiley", "Bonnie", "Chucky", "Dolly"],
    isAsked: false,
    img: ""
},
{
    qNum: 9,
    q: "In this movie people were sent to the sunken place, ready to be transplanted after being hypnotized.",
    a: "Get Out",
    options: ["The Collector", "The Saw", "Get Out", "Good Girls go to Heaven"],
    isAsked: false,
    img: ""
},
{
    qNum: 10,
    q: "In I am Legend, Will Smith finally losses it after the death of the following:",
    a: "His dog",
    options: ["His wife", "His side chick", "his children", "His dog"],
    isAsked: false,
    img: ""
}]

//In game questions to manipulate at global scope
var questions = []

function resetQuestions() {
    for (let i in originialQuestions) {
        questions.push(originialQuestions[i])
    }
}

function randomInt(array) {
    return Math.floor(Math.random() * array.length)
}


// function startGame() {
//     //Clear start button
//     $("#startButton").hide();
    
//     //Populate next question 
//     nextQuestion();      
// }

function timeStart() {
    time = 15;
    intervalHold = setInterval(function(){
        time --
        $("#time").text("Time Remaining: "+time)
        if (time === 0) {
            clearInterval(intervalHold);
            $("#time").text("TIMES UP FOOL")
            //add timeup counter
            timeup ++
            //Execute function after 3 seconds
            setTimeout(function(){
                nextQuestion();
                checkAnswer();
            },3000)
        }
    },1000)
}

function checkAnswer() {
    $(".option").click(function(){
        //Clear interval once selection has been made
        clearInterval(intervalHold)

        if (time > 0 && $(this)[0].innerText === currentQuestion["a"]) {
            $("#time").text("You are Correct!")
            //console.log("You are correct");
            correct ++;
            setTimeout(function(){
                $("#time").text("Time Remaining: 15")
                nextQuestion();
                checkAnswer();
            }, 1500)
        }
        else if (time > 0 && $(this)[0].innerText !== currentQuestion["a"]) {
            $("#time").text("You are Incorrect!")
            wrong ++;
            setTimeout(function(){
                $("#time").text("Time Remaining: 15")
                nextQuestion();
                checkAnswer();
            }, 1500)
        }
    })
}

function nextQuestion() {
    console.log("Questions remaining is:"+questions.length)
    if (questions.length > 0) {
        //Clear questions & options
        $("#question").empty();
        $(".options").empty();
        //get question and set is asked to true
        let index = randomInt(questions);
        //console.log(index)
        currentQuestion = questions[index]
        //console.log(questions[index])
         //Append questions
        $("#question").append('<h4>'+questions[index].q+'</h4>')
    
        //Append options
        for (let i in questions[index].options) {
            $(".options").append('<p class="option rounded">'+questions[index].options[i]+'</p>')   
        }        
        //Delete questions
        questions.splice(index,1);
        //Start time
        timeStart();
    }
    else {
        score();
    }
}

function playAgain() {
    $("#playAgain").click(function(){
        $("#playRow").empty();
        $("#playRow").remove();
        $("#time").empty();
        $("#question").empty();
        $(".options").empty();        
        //$("#playAgain").unbind();
        $("#startButton").show();        
        $("#startButton").unbind();
        startGame();    
    })
}

function score() {
    $("#time").text("-----------------")
    $("#question").empty();
    $(".options").empty();
    $("#question").append('<h4 style="text-align: center;">Your Score:</h4>');
    $("#question").append('<p class="rounded" style="color: green; background-color: white; text-align: center; font-weight: bolder; padding: 7px;">Correct: '+correct+'</p>');
    $("#question").append('<p class="rounded" style="color: red; background-color: white; text-align: center; font-weight: bolder; padding: 7px;">Incorrect: '+wrong+'</p>');
    $("#question").append('<p class="rounded" style="color: red; background-color: white; text-align: center; font-weight: bolder; padding: 7px;">Not Answered: '+timeup+'</p>');
    $("#bg").append(`<div class="row justify-content-md-center" id="playRow">
                        <div class="col-md-auto"><button type="button" class="btn btn-primary" id="playAgain">Play Again?</button></div>
                    </div>`)
    playAgain();
}

//Start Game! This is so that we hopefully do not have to refresh browser
function startGame() {
    correct = 0
    wrong = 0
    timeup = 0
    //Push Original questions into the in game questions 
    resetQuestions()
    
    //Start the game on click
    $("#startButton").on("click", function(){
        //Hide Start button
        $("#startButton").hide();
        //HC Time LUL
        $("#time").text("Time Remaining: 15")
        //Populate next question 
        nextQuestion();      
        //Once populated listen for option click events
        checkAnswer();
        
    });
}

//Start the Game BOII

startGame();



