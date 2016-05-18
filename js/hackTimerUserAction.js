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
var onLoad = function($) {
  $("div.garden-timer div.txt").bind("DOMSubtreeModified", function() {
    if (!document.hasFocus()) MEMRISE.garden.pause();
  });

};
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
/*
//To delete vocalise
function highlight($el, word) {
        var text = $el.html();
        text = text.replace(new RegExp(word,'g'), '');
        $el.html(text);
    }
     
    $.fn.highlight = function(word) {
        return this.each(function() {
            highlight($(this), word);
        });
    };

$('body').highlight("ֲ");



*/

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
chrome.storage.sync.get({
	Choice_autoPause: true,
	Choice_manageChrono: false,
    Choice_PoliceHebrew: false
  }, function(items) {
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
        }
  });