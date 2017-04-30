var questionNumber = 0;
var points = 0;
var userAnswers= [];
var json;
var count;
var counter;

function timer() {
	 var min = Math.floor(count / 60);
	 var second = Math.floor(count % 60);
  count = count-1;
  if (count === -2) {
			correctAnswers();
			document.getElementById('introduction').style.display = 'none';
//			if(document.getElementById('scoresContainer').style.display == 'none')
//			document.getElementById('congratulation').innerHTML = "Niestety skończył Ci się czas";
    }
	 if(min<10)
			min = "0" + min;
	 if(second<10)
			second = "0" + second;
  document.getElementById('timer').innerHTML = min + ":"+second;
}
function displayQuiz(){
	counter = setInterval(timer, 1000);
	count = json.time_seconds;
	timer();
	points = 0;
	questionNumber = 0;
	userAnswers = [];
	loadJSON();
	document.getElementById('introduction').style.display = 'none';
	document.getElementById('scoresContainer').style.display = 'none';
	document.getElementById('questions').style.display = 'block';
}

function loadJSON(){
		var data_file = "https://cdn.rawgit.com/kdzwinel/cd08d08002995675f10d065985257416/raw/f681999d414a85f081c52424605151cc8f93313d/quiz-data.json";
		var http_request = new XMLHttpRequest();
		try{
					// Opera 8.0+, Firefox, Chrome, Safari
					http_request = new XMLHttpRequest();
		}catch (e){
					// Internet Explorer Browsers
					try{
								http_request = new ActiveXObject("Msxml2.XMLHTTP");
					}catch (e) {
								try{
											http_request = new ActiveXObject("Microsoft.XMLHTTP");
								}catch (e){
											// Something went wrong
											alert("Your browser broke!");
											return false;
								}
					}
		 }

		http_request.onreadystatechange = function(){
					if (http_request.readyState == 4  ){
								// Javascript function JSON.parse to parse JSON data
								var jsonObj = JSON.parse(http_request.responseText);
        json = jsonObj;
								// jsonObj variable now contains the data structure and can
								// be accessed as jsonObj.name and jsonObj.country.
								document.getElementById("Id").innerHTML = "Pytanie nr: " + jsonObj.questions[questionNumber].id;
								document.getElementById("Question").innerHTML = jsonObj.questions[questionNumber].question;
								document.getElementById("Answer0").innerHTML = jsonObj.questions[questionNumber].answers[0].answer;
								document.getElementById("Answer1").innerHTML = jsonObj.questions[questionNumber].answers[1].answer;
								document.getElementById("Answer2").innerHTML = jsonObj.questions[questionNumber].answers[2].answer;
								document.getElementById("Answer3").innerHTML = jsonObj.questions[questionNumber].answers[3].answer;
				     
								var answers_list = document.getElementsByClassName('answers');

								switch(userAnswers[questionNumber]) {
									case 0:
														answers_list[0].checked = true;
														break;
									case 1: 
														answers_list[1].checked = true;
														break;
									case 2:
														answers_list[2].checked = true;
														break;
									case 3:
														answers_list[3].checked = true;
														break;
									default: for (var i = 0; i < answers_list.length; i++) { answers_list[i].checked = false; }
								}		
								if(questionNumber==jsonObj.questions.length-1) {
									document.getElementById("next").style.display = 'none';
									document.getElementById("finish").style.display = 'block';
								}
								else {
									document.getElementById("next").style.display = 'block';
									document.getElementById("finish").style.display = 'none';
								}
								if	(questionNumber==0)
									document.getElementById("prev").style.display = 'none';
								} else 
									document.getElementById("prev").style.display = 'block';
		}

		http_request.open("GET", data_file, true);
		http_request.send();
}

function next() {
	
	 var answer0 = document.getElementById("value0").checked;
	 var answer1 = document.getElementById("value1").checked;
	 var answer2= document.getElementById("value2").checked;
	 var answer3 = document.getElementById("value3").checked;

	//if(answer0==true || answer1==true || answer2==true || answer3==true){
	/*are all answers wanted? */	
		if(answer0==true)
		{
			userAnswers[questionNumber]=0;
		} else if(answer1==true){
			userAnswers[questionNumber]=1;
		} else if(answer2==true){
			userAnswers[questionNumber]=2;
		} else if(answer3==true){
			userAnswers[questionNumber]=3;
		} else {
			userAnswers[questionNumber]=-1;
		}
		questionNumber++;
//}

}
function prev() {
	if(questionNumber!=0) {
	 questionNumber--;
	 loadJSON();
	}
}
function correctAnswers() {
	next();
	var correctAnswers=[];
	var amountOfQuestions = json.questions.length;
	for(var i = 0; i<amountOfQuestions; i++)
		{ var j = 0;
			while(json.questions[i].answers[j].correct!=true){
				j++;
			}
			correctAnswers[i] = j;
		}
	for(var k = 0; k<amountOfQuestions; k++)
		{
			if(correctAnswers[k]===userAnswers[k])
				points++;
		}
	//023122302 correct
	if(count ==-2)
	 document.getElementById('congratulation').innerHTML = "Niestety skończył Ci się czas";
	
	document.getElementById('questions').style.display = 'none';
	document.getElementById('scoresContainer').style.display = 'block';
	if(points === 1)
	 document.getElementById('scoreUser').innerHTML = "Zdobyłeś " + points + " punkt!"; // dolozyc pyrzpadek dla 1 punktu
	else if(points <=4 && points != 0)
	 document.getElementById('scoreUser').innerHTML = "Zdobyłeś " + points + " punkty!";
	else
	 document.getElementById('scoreUser').innerHTML = "Zdobyłeś " + points + " punktów!";

var descriptions = ['Następnym razem na pewno pójdzie Ci lepiej - na teraz otrzymujesz rangę szczur laboratoryjny.', 'Dobry wynik, widać że ciągle zdobywasz wiedzę - otrzymujesz rangę ucznia', 'Świetnie Ci poszło - można powiedzieć, że jesteś brainly'];

if(points < amountOfQuestions/3){document.getElementById('userDescription').innerHTML=descriptions[0];
														 document.getElementById('userImage').src = "images/rat.png";
														}
	              
else if (points >= amountOfQuestions/3 && points <= (amountOfQuestions/3)*2) 
{document.getElementById('userDescription').innerHTML=descriptions[1]
document.getElementById('userImage').src = "images/student.png";}
	
	else{document.getElementById('userDescription').innerHTML=descriptions[2]
					document.getElementById('userImage').src = "images/brain.png";}

	clearInterval(counter);
}
