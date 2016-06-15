// ==UserScript==
// @name           Memrise Auto-Pause
// @description    Pauses Memrise watering & gardening when the window loses focus
// @match          http://www.memrise.com/course/*/garden/*
// @match          http://www.memrise.com/garden/water/*
// @version        0.1
// @namespace      https://greasyfork.org/users/5238-carpiediem
// @grant          none
// @source		   https://github.com/carpiediem/memrise-enhancement-suite/blob/master/memrise-auto-pause.user.js
// ==/UserScript==

var is_CursiveHebrew = false;
var nb_click = 0;
 //Get things of course
 /*$('.header-exit').click( function() {
	 chrome.runtime.sendMessage({things: localStorage.getItem("sessionCourses")});
 });*/

$(document).click(function(event) {
  var theId =  $(event.target).context.className;
  //When user awnser at one test, change automaticaly cursive font, here for button
  if((theId=="next-icon")|(theId=="shiny-box choice clearfix incorrect")|(theId=="shiny-box choice clearfix correct")|(theId=="index")|(theId=="val")|(theId=="marking-icon cross")|(theId=="marking-icon tick")) {	//Event click Next button
	  if(is_CursiveHebrew = true) { //Mode Cursive button automaticaly if option=true
		  $("#changeHebrew").html("<button style='padding:5px 10px 5px 10px; font-family:\"\"' OnClick='SquarreHebrew()'>א</button>");
	  }
	  //Set Message only one shoot
	  if(nb_click==0) {
		chrome.runtime.sendMessage({things: localStorage.getItem("sessionCourses")});
	  }
	  nb_click++;
  }
});

var onLoad = function($) {
  $("div.garden-timer div.txt").bind("DOMSubtreeModified", function() {
    if (!document.hasFocus()) MEMRISE.garden.pause();
  });


};
var getThings = function($) {
	//Get things of course session
function getThings() {
	var getCourseId = MEMRISE.garden.getTrackedCourseId();
	var getThings = MEMRISE.garden.things;
	var setThings = new Array();
	var CourseObj = new Object();
	var boucle = 0;
	for(key in getThings) { 
		setThings[boucle] = parseInt(getThings[key].id);
		boucle++;
	}
	CourseObj.course = parseInt(getCourseId);
	CourseObj.things = setThings;
	localStorage.setItem("sessionCourses",JSON.stringify(CourseObj));
}
getThings();	
}

	

//@description    Change sqare hebrew to cursive hebrew
    function InjectClassCursiveHebrew() {
		var styleNode           = document.createElement ("style");
styleNode.type          = "text/css";
styleNode.textContent   = ".typing-wrapper .primary , .typing-wrapper  .shiny-box, .keyboard .shiny-box, .primary .row-value .primary-value, .choices .choice { font-family:'CursiveHebrew' }"
                        ;
document.head.appendChild (styleNode);
$("#timerControls").append("<div id='changeHebrew'><button style='padding:5px 10px 5px 10px; float; font-family:\"\"' OnClick='SquarreHebrew()'>א</button></div>"); //Add button        
	}
	var PoliceHebrewCursive = function CursiveHebrew(){
        var inputTest = $(".typing-wrapper .primary");
        var KeyboardTest = $(".typing-wrapper  .shiny-box");
		var Keyboard2Test = $(".keyboard .shiny-box");
        var ResponseTest = $(".primary .row-value .primary-value");
         var ChoiceTest = $(".choices .choice");
		 $("#changeHebrew").html("<button style='padding:5px 10px 5px 10px; font-family:false' OnClick='SquarreHebrew()'>א</button>");
        if(inputTest.length){
            inputTest.css("font-family","CursiveHebrew");
        }
        if(KeyboardTest.length){
            KeyboardTest.css("font-family","CursiveHebrew");
        }
		if(Keyboard2Test.length){
            Keyboard2Test.css("font-family","CursiveHebrew");
        };
        if(ResponseTest.length){
            ResponseTest.css("font-family","CursiveHebrew");
        }
        if(ChoiceTest.length){
            ChoiceTest.css("font-family","CursiveHebrew");
        }
    }
var PoliceHebrewSquarre =     function SquarreHebrew() { 
        var inputTest = $(".typing-wrapper .primary");
        var KeyboardTest = $(".typing-wrapper  .shiny-box");
		var Keyboard2Test = $(".keyboard .shiny-box");
        var ResponseTest = $(".primary .row-value .primary-value");
        var ChoiceTest = $(".choices .choice");
		$("#changeHebrew").html("<button style='padding:5px 10px 5px 10px; font-family:\"CursiveHebrew\"' OnClick='CursiveHebrew()'>א</button>");
        if(inputTest.length){
            inputTest.css("font-family",false);
        }
        if(KeyboardTest.length){
            KeyboardTest.css("font-family",false);
        };
		if(Keyboard2Test.length){
            Keyboard2Test.css("font-family",false);
        };
        if(ResponseTest.length){
            ResponseTest.css("font-family",false);
        }
        if(ChoiceTest.length){
            ChoiceTest.css("font-family",false);
        }
    };

//@source		 https://github.com/carpiediem/memrise-enhancement-suite/blob/master/memrise-timer-controls.user.js
var setCountdown = function setCountdown(currentSetting) {
    switch (currentSetting) {
        case "normal":
            //Change button color & tooltip
            $('#timerToggle').css('background-color',"green").attr("title","Answer timer is set to normal.\nClick to slow the timer.");
            //Change website functionality
            MEMRISE.garden.timer.paused = false;
            MEMRISE.garden.timer.unpause();
            break;
            
        case "slow":
            //Change button color & tooltip
            $('#timerToggle').css("background-color","yellow").attr("title","Answer timer is set to slow.\nClick to disable the timer.");
            //Change website functionality
            MEMRISE.garden.timer.activate = function (a,b){
                MEMRISE.garden.timer.cancel();
                MEMRISE.garden.timer.active=true;
                MEMRISE.garden.timer.howlong=3*a;
                MEMRISE.garden.timer.time_remaining=3*a;
                if(b) {MEMRISE.garden.timer.callback=b;}
                MEMRISE.garden.timer.draw();
                MEMRISE.garden.$centralarea.imagesLoaded(function(){MEMRISE.garden.timer.start();});
            };
            MEMRISE.garden.timer.activate(MEMRISE.garden.timer.howlong);
            break;

        case "disabled":
            //Change button color & tooltip
            $('#timerToggle').css('background-color',"red").attr("title","Answer timer is disabled.\nClick to enable the timer.");
            //Change website functionality
            MEMRISE.garden.timer.activate = function (a,b){
                MEMRISE.garden.timer.cancel();
                MEMRISE.garden.timer.active=true;
                MEMRISE.garden.timer.howlong=a;
                MEMRISE.garden.timer.time_remaining=a;
                if(b) {MEMRISE.garden.timer.callback=b;}
                MEMRISE.garden.timer.draw();
                MEMRISE.garden.$centralarea.imagesLoaded(function(){MEMRISE.garden.timer.start();});
            };
            MEMRISE.garden.timer.activate(MEMRISE.garden.timer.howlong/3);
            MEMRISE.garden.timer.paused = true;
            break;
        }
}

var setDelay = function setDelay(currentSetting) {
    if (currentSetting) {
        //Change button color & tooltip
        $('#delayToggle').css('background-color',"green").attr("title","Delay between questions is set to normal.\nClick to eliminate the delay.");
        //Enable the delay
        MEMRISE.garden.feedback.start = function (a){ oldstart(a); };
    }else{
        //Change button color & tooltip
        $('#delayToggle').css('background-color',"red").attr("title","No time between questions.\nClick to add a delay.");
        //Disable the delay
        MEMRISE.garden.feedback.start = function (a){ MEMRISE.garden.box.next_press(); };
    }
}

var UserAction = function ProgramTimer() {
oldstart = MEMRISE.garden.feedback.start;
var timerSetting = "normal";
var delayEnabled = true;

//Create buttons
$('#timerControls').css('width','100px');
$('#timerControls div').css({width:'32px',height:'32px',margin:'8px',"background-image":"url('http://www.rslc.us/images/timer-controls.png')",'background-color':'grey'}).attr("title","The timer control script did not load correctly.");
$('#timerToggle').css({float:'left', 'background-position':'32px 0px'});
$('#delayToggle').css({float:'right','background-position':'0px 0px' });

//setCountdown(timerSetting);
$('#timerToggle').css('background-color',"green").attr("title","Answer timer is set to normal.\nClick to slow the timer.");
//setDelay(delayEnabled);

$('#timerToggle').click(function() {
  switch (timerSetting) {
    case "normal":   timerSetting = "slow";     break;
    case "slow":     timerSetting = "disabled"; break;
    case "disabled": timerSetting = "normal";   break;
  }
  setCountdown(timerSetting);
});

$('#delayToggle').click(function() {
  delayEnabled = !delayEnabled;
  setDelay(delayEnabled);
});
}

var listTTSlanguage = function getListTTSlanguage() {
	
	var listLangTTS = [
            {name: 'UK English Female', flag: 'en-GB'},
            {name: 'US English Female', flag: 'en-US'},
			{name: 'Afrikaans Male', flag: 'af'},
			{name: 'Albanian Male', flag: 'sq'},
            {name: 'Arabic Female', flag: 'ar-SA'},
            {name: 'Armenian Male', flag: 'hy'},
            {name: 'Australian Female', flag: 'en-AU'},
			{name: 'Bosnian Male', flag: 'bs'},
            {name: 'Brazilian Portuguese Female', flag: 'pt-BR'},
			{name: 'Catalan Male', flag: 'ca'},
            {name: 'Chinese Female', flag: 'zh-CN'},
			{name: 'Croatian Male', flag: 'hr'},
			{name: 'Czech Male', flag: 'cs-CZ'},
            {name: 'Danish Female', flag: 'da'},
            {name: 'Deutsch Female', flag: 'de'},
            {name: 'Dutch Female', flag: 'nl'},
			{name: 'Esperanto Male', flag: 'eo'},
            {name: 'Finnish Female', flag: 'fi'},
            {name: 'French Female', flag: 'fr-FR'},
            {name: 'Greek Female', flag: 'el'},
            {name: 'Hindi Female', flag: 'hi'},
            {name: 'Hungarian Female', flag: 'hu'},
			{name: 'Icelandic Male', flag: 'is'},
            {name: 'Indonesian Female', flag: 'id'},
            {name: 'Italian Female', flag: 'it'},
            {name: 'Japanese Female', flag: 'ja'},
            {name: 'Korean Female', flag: 'ko'},
			{name: 'Latin Male', flag: 'la'},
			{name: 'Latvian Male', flag: 'lv'},
			{name: 'Macedonian Male', flag: 'mk'},
			{name: 'Montenegrin Male', flag: 'sr-ME'},
            {name: 'Norwegian Female', flag: 'no'},
            {name: 'Polish Female', flag: 'pl'},
            {name: 'Portuguese Female', flag: 'pt-PT'},
            {name: 'Romanian Male', flag: 'ro'},
            {name: 'Russian Female', flag: 'ru'},
			{name: 'Serbian Male', flag: 'sr'},
			{name: 'Slovak Male', flag: 'sk'},
            {name: 'Spanish Female', flag: 'es'},
            {name: 'Spanish Latin American Female', flag: 'es-419'},
			{name: 'Swahili Male', flag: 'sw'},
            {name: 'Swedish Female', flag: 'sv'},
            {name: 'Tamil Female', flag: 'hi'},
            {name: 'Thai Female', flag: 'th'},
            {name: 'Turkish Female', flag: 'tr'},
			{name: 'Vietnamese Female', flag: 'vi'},
			{name: 'Welsh Male', flag: 'cy'}

        ];
		
		return listLangTTS;
	
	
}

//Fonction pour injecter du script dans le site web
var injectWithJQOnLoad = function(f) {
	var script = document.createElement('script');
	script.textContent = '$(' + f.toString() + '($));';
	document.body.appendChild(script);
};
var injectWithJQ = function(f) {
    var script = document.createElement('script');
    script.textContent = f.toString();
    document.body.appendChild(script);
};

var styleNode           = document.createElement ("style");
styleNode.type          = "text/css";
styleNode.textContent   = "@font-face { font-family: 'CursiveHebrew'; src: url('"
                        + chrome.extension.getURL ("DorianCLM-BookItalic.TTF")
                        + "') format('truetype'); }"
                        ;
document.head.appendChild (styleNode);


//Lancement des injections (si option à true)
injectWithJQ('$(\'<div id="timerControls" style="background-color:#ddd"><div id="timerToggle"></div><div id="delayToggle"></div></div>\').insertBefore( ".streak" )');
//injectWithJQ("$(document).click(function() {console.log('document'); if(MEMRISE.garden.session_ended) {console.log('EndOfSession');}}); $('.header-exit').click( function() {var difficultItems =''; if(1){ difficultItems = JSON.stringify(MEMRISE.garden.things); console.log('.header-exit ,  MEMRISE.garden.session_ended : '+MEMRISE.garden.session_ended); chrome.runtime.sendMessage('bjpplnaceahfdaadniohphlfidijifdg',{things: difficultItems});}})");

try {
chrome.storage.sync.get({
	Choice_autoPause: true,
	Choice_manageChrono: false,
    Choice_PoliceHebrew: false,
	Choice_ListenTTS: false
  }, function(objectStorage) {
		callback_storage_hackTimerUserAction(objectStorage);
  });
  console.log("try sync");
}
catch(exception){ //To firefox. sync not compatible
	chrome.storage.local.get({
	Choice_autoPause: true,
	Choice_manageChrono: false,
    Choice_PoliceHebrew: false,
	Choice_ListenTTS: false
  }, function(objectStorage) {
		callback_storage_hackTimerUserAction(objectStorage);
  });
  console.log("catch !sync");
}
function callback_storage_hackTimerUserAction(items) {
		if(items.Choice_autoPause) {
			injectWithJQOnLoad(onLoad);
		}
		if(items.Choice_manageChrono) {
            injectWithJQ(setCountdown);
            injectWithJQ(setDelay);
			injectWithJQ(UserAction);
			injectWithJQ("ProgramTimer();");
		}
        if(items.Choice_PoliceHebrew) {
            injectWithJQ(PoliceHebrewCursive);
            injectWithJQ(PoliceHebrewSquarre);
            InjectClassCursiveHebrew();
			is_CursiveHebrew = true;
        }
		if(items.Choice_ListenTTS) {
			injectWithJQ(listTTSlanguage);
		}
		injectWithJQOnLoad(getThings);
}