// Saves options to chrome.storage
function save_options(e) {
	var get_autoPause = document.getElementById('autoPause').checked;
	var get_Configchrono = document.getElementById('Configchrono').checked;
	var get_openTab = document.getElementById('openTab').checked;
	var get_chat = document.getElementById('Chat').checked;
	var get_Rankoverlord = document.getElementById('Rankoverlord').checked;
	var get_open = ($('[name="ActionOpen"]:checked').val()).replace(/<[^>]*>?/g, '');
	var get_lang = ($('#lang').val()).replace(/<[^>]*>?/g, '');
	var get_PoliceHebrew = document.getElementById('cursiveHebrew').checked;
	var get_Choice_ListenTTS = document.getElementById('ListenChoiceTTS').checked;
	var get_Choice_ListenHebrew = document.getElementById('ListenChoiceHebrew').checked;
	var get_Choice_HelpMe = document.getElementById('HelpMe').checked;
	var get_Game = document.getElementById('Game').checked;
	
	localStorage.setItem('ListenChoiceTTS',get_Choice_ListenTTS);
	localStorage.setItem('ListenChoiceHebrew',get_Choice_ListenHebrew);
	
	try {
		chrome.storage.sync.set({
			Choice_autoPause: get_autoPause,
			Choice_manageChrono: get_Configchrono,
			Choice_openTab: get_openTab,
			Choice_chat : get_chat,
			Choice_fun: get_Rankoverlord,
			Choice_open: get_open,
			Choice_lang: get_lang,
			Choice_PoliceHebrew: get_PoliceHebrew,
			Choice_ListenTTS: get_Choice_ListenTTS,
			Choice_ListenHebrew: get_Choice_ListenHebrew,
			Choice_Help : get_Choice_HelpMe,
			Choice_Game : get_Game
		}, function() {
				callback_storage_optionSave();
		});
	}
	catch(exception){
		chrome.storage.local.set({
			Choice_autoPause: get_autoPause,
			Choice_manageChrono: get_Configchrono,
			Choice_openTab: get_openTab,
			Choice_chat : get_chat,
			Choice_fun: get_Rankoverlord,
			Choice_open: get_open,
			Choice_lang: get_lang,
			Choice_PoliceHebrew: get_PoliceHebrew,
			Choice_ListenTTS: get_Choice_ListenTTS,
			Choice_ListenHebrew: get_Choice_ListenHebrew,
			Choice_Help : get_Choice_HelpMe,
			Choice_Game : get_Game
		}, function() {
				callback_storage_optionSave();
		});
	}
	function callback_storage_optionSave() {
		// Update status to let user know options were saved.
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
			status.textContent = '';
		}, 750);
		if (chrome.runtime.error) {
			console.log("Runtime error.");
			status.textContent = 'Not save. Error '+chrome.runtime.lastError.message;
		}
	}
 
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default variable
	try {
		chrome.storage.sync.get({
		Choice_autoPause: true,
		Choice_manageChrono: false,
		Choice_openTab: false,
		Choice_fun: false,
		Choice_open: "openOptionPopup",
		Choice_lang:"en",
		Choice_chat:true,
		Choice_PoliceHebrew: false,
		Choice_ListenTTS: false,
		Choice_ListenHebrew: false,
		Choice_Help : false,
		Choice_Game : false
		}, function(objectStorage) {
			callback_storage_optionRestore(objectStorage);
		});
	}
	catch(exception){
		chrome.storage.local.get({
		Choice_autoPause: true,
		Choice_manageChrono: false,
		Choice_openTab: false,
		Choice_fun: false,
		Choice_open: "openOptionPopup",
		Choice_lang:"en",
		Choice_chat:true,
		Choice_PoliceHebrew: false,
		Choice_ListenTTS: false,
		Choice_ListenHebrew: false,
		Choice_Help : false,
		Choice_Game : false
		}, function(objectStorage) {
			callback_storage_optionRestore(objectStorage);
		});
	}
	function callback_storage_optionRestore(items) {
		document.getElementById('autoPause').checked = items.Choice_autoPause;
		document.getElementById('Configchrono').checked = items.Choice_manageChrono;
		document.getElementById('openTab').checked = items.Choice_openTab;
		document.getElementById('Chat').checked = items.Choice_chat;
		document.getElementById('Rankoverlord').checked = items.Choice_fun;
		document.getElementById('HelpMe').checked = items.Choice_Help;
		document.getElementById('Game').checked = items.Choice_Game;
		$( '[value="'+ (items.Choice_open).replace(/<[^>]*>?/g, '') + '"]' ).prop( "checked", true );
		$('#lang [value="'+ (items.Choice_lang).replace(/<[^>]*>?/g, '') +'"]').prop('selected', true)
		document.getElementById('cursiveHebrew').checked = items.Choice_PoliceHebrew;
		document.getElementById('ListenChoiceTTS').checked = items.Choice_ListenTTS;
		document.getElementById('ListenChoiceHebrew').checked = items.Choice_ListenHebrew;
		if(document.getElementById('ListenChoiceTTS').checked) {
			document.getElementById('ListenChoiceHebrew').disabled = false;
			document.getElementById('ListenHebrew').style.color = "";
		}
	}
  
}
document.addEventListener('DOMContentLoaded', restore_options);
$("input").click(function(e){
 
 if(document.getElementById('ListenChoiceTTS').checked) {
	 document.getElementById('ListenChoiceHebrew').disabled = false;
	 document.getElementById('ListenHebrew').style.color = "";
 }
 else {
	 document.getElementById('ListenChoiceHebrew').checked = false;
	 document.getElementById('ListenChoiceHebrew').disabled = "";
	 document.getElementById('ListenHebrew').style.color = "#dddddd";
 }
 save_options(e);
});
$("select").change(function(e){
 save_options(e);
});

//---------------Translate------------------------------//
$("#settings").text(chrome.i18n.getMessage('settings'));
$("#_autoPause").text(chrome.i18n.getMessage('autoPause'));
$("#_Configchrono").text(chrome.i18n.getMessage('Configchrono'));
$("#_Rankoverlord").text(chrome.i18n.getMessage('Rankoverlord'));
$("#actionIcon").text(chrome.i18n.getMessage('actionIcon'));
$("#_openTab").text(chrome.i18n.getMessage('openTab'));
$("#actionExtension").text(chrome.i18n.getMessage('actionExtension'));
$("#_openOptionPopup").text(chrome.i18n.getMessage('openOptionPopup'));
$("#_openOptionTab").text(chrome.i18n.getMessage('openOptionTab'));
$("#formatDate").text(chrome.i18n.getMessage('formatDate'));
$("#textDate").text(chrome.i18n.getMessage('textDate'));
$("#languages").text(chrome.i18n.getMessage('languages'));
$("#textHebrew").text(chrome.i18n.getMessage('textHebrew'));
$("#Thanks").text(chrome.i18n.getMessage('Thanks'));
$("#info").text(chrome.i18n.getMessage('info'));
$("#_Chat").text(chrome.i18n.getMessage('chat'));
$("#ListenHebrew").text(chrome.i18n.getMessage('ListenHebrew'));
$("#ListenTTS").text(chrome.i18n.getMessage('ListenTTS'));
$("#_HelpMe").text(chrome.i18n.getMessage('HelpMe'));
$("#_Game").text(chrome.i18n.getMessage('Game'));

//Get extension version. Write into footbar
$("#version").text("version "+(chrome.runtime.getManifest().version+ " "));

//------------------------------------Options Languages TTS Google, TTS ResponsiveVoice and TTS Hebrew-------------------------//
//TTS ResponsiveVoice
function getListTTSlanguage() {
        this.responsivevoices = [
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
		return this.responsivevoices;
}
var Voices = "Native"; //To TTS Google
//Exeption to Opera Chrome.TTS exist, but only native language
function ExceptionLanguage() {
	/*var listTTS = getListTTSlanguage();
	Voices = "UK English Female"; //Delete Native and add first language
	for (var i = 1; i < listTTS.length; i++) {
		Voices = Voices + "," + listTTS[i].name;				
	}
	$("#listeLanguage").append("<i><small>"+Voices+"</small></i>");*/
	$("#listeLanguage").append("<b><small>Not available on Opera for now</small></b>"); //TODO fix for OPERA
	document.getElementById('ListenChoiceTTS').checked = false;
	document.getElementById('ListenChoiceTTS').disabled = "disabled";
	document.getElementById('ListenTTS').style.color = "#dddddd";
}

try { //To Chrome
chrome.tts.getVoices(
    function(voices) {
		if(voices.length<=1) {	//Generate exeption if only Native language (for Opera)
			throw new ExceptionLanguage();
		}
		else {
            for (var i = 1; i < voices.length; i++) {
				Voices = Voices + "," + (voices[i].voiceName).split("Google")[1];              
            }
			$("#listeLanguage").append("<i><small>"+Voices+"</small></i>");
		}
    });		  
}
catch(exception){ //To Firefox (and Opera in exeption function)
				var listTTS = getListTTSlanguage();
				Voices = "UK English Female"; //Delete Native and add first language
				for (var i = 1; i < listTTS.length; i++) {
					Voices = Voices + "," + listTTS[i].name;				
				}
				$("#listeLanguage").append("<i><small>"+Voices+"</small></i>");
}		  
//Init disabled checkboxif(document.getElementById('ListenChoiceTTS').checked) {

console.log("MEMRISE run with MEMRISE+ extension. If you found a bug, want participate to extension\'s program  or to suggest an improvement, translation, go to https://github.com/Shmuel83/MemrisePlus ");