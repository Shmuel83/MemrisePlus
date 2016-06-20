$("#left-area").append("<div><div id='Listening'><audio hidden id='audioHebrew' controls title='To listen, selected with your mouse an hebrew word or sentence(s), then you will can play !'><source id='srcTTS' src='' type='audio/mpeg'></audio><span id='ListenToSpeech'></span></div><select hidden id='ChoiceLang'></select></div>"); //Add button
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
			createAudioPlayer((msg.AudioURL).replace(/<[^>]*>?/g, ''));
		}
});
function createAudioPlayer(audioLink) {
			
			var audio = document.getElementById('audioHebrew');
			var source = document.getElementById('srcTTS');
			document.getElementById('audioHebrew').hidden = "";
			source.setAttribute("src", audioLink);
			audio.load();
			audio.play();
			$("#ListenToSpeech").text(textSelected);

}
//--------------------Show languages TTS and selected last choice--------------------------------------//
function AddOptionLanguage(tabLanguages) {
	var selectedLanguage = "";
	if(localStorage.getItem("SelectChoiceLang")) { //Select last language choice by user
		selectedLanguage = (localStorage.getItem("SelectChoiceLang")).replace(/<[^>]*>?/g, '') ;
	}
	var flagSelected = "";
	$("#Listening").html("");
	for (var i = 0; i < tabLanguages.length; i++) {	//List all languages supported by TTS
		flagSelected = "";
		if(selectedLanguage == tabLanguages[i]) {
			flagSelected = "selected";	//:selected last choice for that each exercice, user don't show native if is choose Google French by exemple
			if(selectedLanguage=="Hebrew") {
				$("#Listening").html("<audio id='audioHebrew' controls title='To listen, selected with your mouse an hebrew word or sentence(s), then you will can play !'><source id='srcTTS' src='' type='audio/mpeg'></audio><span id='ListenToSpeech'></span>");
			}
		}
        $("#ChoiceLang").append("<option value='"+tabLanguages[i]+"' "+flagSelected+">"+tabLanguages[i]+"</option>");	//Add language on select
		  
    }
}
$("select").change(function(){
	port.postMessage({SelectChoiceLang: ($("select").val()).replace(/<[^>]*>?/g, '')});
	localStorage.setItem("SelectChoiceLang",($("select").val()).replace(/<[^>]*>?/g, ''));
	if(($("select").val()=="native")|($("select").val().substring(0, 6)=="Google")) {
		$("#Listening").html("");
	}
	else {
		$("#Listening").html("<audio id='audioHebrew' controls title='To listen, selected with your mouse an hebrew word or sentence(s), then you will can play !'><source id='srcTTS' src='' type='audio/mpeg'></audio><span id='ListenToSpeech'></span>");
	}
});