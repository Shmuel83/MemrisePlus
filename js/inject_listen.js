$("#left-area").append("<div><div id='Listening'><audio hidden id='audioHebrew' controls title='To listen, selected with your mouse an hebrew word or sentence(s), then you will can play !'><source src='' id='audioSrc' type='audio/mpeg'></audio></div><select hidden id='ChoiceLang'></select></div>"); //Add button
	//Get select text to translate 
var port = chrome.runtime.connect({name: "listening"});
var textSelected="";
//event when user up whith your mouclick
 $(document).mouseup(function(e) { 
    textSelected=getSelectedText();
    if (textSelected!='') {	//If user selected text
		port.postMessage({listen: textSelected}); //Request text to speech (to background.js)
	}
	});
//Return text selected
function getSelectedText() {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection) {
        return document.selection.createRange().text;
    }
    return '';
}
//---------------------LOAD----------------------------//
port.postMessage({getVoices: true}); //Request Voices TTS

port.onMessage.addListener(function(msg) {
		if(msg.OptionsVoices) {	//Receive Voices TTS
			if(msg.OptionsVoices==false) { //User don't need Voices
				document.getElementById('ChoiceLang').hidden = "hidden";
			}
			else {
				document.getElementById('ChoiceLang').hidden = "";
				AddOptionLanguage(msg.OptionsVoices);
			}
			
		}
		if(msg.AudioURL) {	//Receive url to speech hebrew
			createAudioPlayer(msg.AudioURL);
		}
});
function createAudioPlayer(audioLink) {
			var audioPlayer = '<audio controls><source src="' + audioLink + '" id="audioSrc" type="audio/mpeg"></audio>'+textSelected;
			$("#Listening").html(audioPlayer);

}
//--------------------Show languages TTS and selected last choice--------------------------------------//
function AddOptionLanguage(tabLanguages) {
	var selectedLanguage = localStorage.getItem("SelectChoiceLang") || false;
	var flagSelected = "";
	for (var i = 0; i < tabLanguages.length; i++) {	//List all languages supported by TTS
		flagSelected = "";
		if(selectedLanguage == tabLanguages[i]) {
			flagSelected = "selected";	//:selected last choice for that each exercice, user don't show native if is choose Google French by exemple
		}
        $("#ChoiceLang").append("<option value='"+tabLanguages[i]+"' "+flagSelected+">"+tabLanguages[i]+"</option>");	//Add language on select
		//------------Init-audio-widget--------//
		console.log(selectedLanguage);
		if(selectedLanguage=="Hebrew") {
			document.getElementById('audioHebrew').hidden = "";
		}
		else {
			document.getElementById('audioHebrew').hidden = "hidden";
		}
		  
    }
}
$("select").change(function(){
	port.postMessage({SelectChoiceLang: $("select").val()});
	localStorage.setItem("SelectChoiceLang",$("select").val());
	if($("select").val()=="Hebrew") {
		 document.getElementById('audioHebrew').hidden = "";
	}
	else {
		document.getElementById('audioHebrew').hidden = "hidden";
	}
});