// Saves options to chrome.storage
function save_options(e) {
	var get_autoPause = document.getElementById('autoPause').checked;
	var get_Configchrono = document.getElementById('Configchrono').checked;
	var get_openTab = document.getElementById('openTab').checked;
	var get_chat = document.getElementById('Chat').checked;
	var get_Rankoverlord = document.getElementById('Rankoverlord').checked;
	var get_open = $('[name="ActionOpen"]:checked').val();
	var get_lang = $('#lang').val();
	var get_PoliceHebrew = document.getElementById('cursiveHebrew').checked;
	var get_Choice_ListenTTS = document.getElementById('ListenChoiceTTS').checked;
	var get_Choice_ListenHebrew = document.getElementById('ListenChoiceHebrew').checked;
	var ChoiceId = e.target.id;
	
	localStorage.setItem('ListenChoiceTTS',get_Choice_ListenTTS);
	localStorage.setItem('ListenChoiceHebrew',get_Choice_ListenHebrew);
	
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
		Choice_ListenHebrew: get_Choice_ListenHebrew
  }, function() {
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
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default variable
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
	Choice_ListenHebrew: false
  }, function(items) {
    document.getElementById('autoPause').checked = items.Choice_autoPause;
	document.getElementById('Configchrono').checked = items.Choice_manageChrono;
	document.getElementById('openTab').checked = items.Choice_openTab;
	document.getElementById('Chat').checked = items.Choice_chat;
	document.getElementById('Rankoverlord').checked = items.Choice_fun;
	$( '[value="'+items.Choice_open+'"]' ).prop( "checked", true );
	$('#lang [value="'+items.Choice_lang+'"]').prop('selected', true)
	document.getElementById('cursiveHebrew').checked = items.Choice_PoliceHebrew;
	document.getElementById('ListenChoiceTTS').checked = items.Choice_ListenTTS;
	document.getElementById('ListenChoiceHebrew').checked = items.Choice_ListenHebrew;
	if(document.getElementById('ListenChoiceTTS').checked) {
		document.getElementById('ListenChoiceHebrew').disabled = false;
		document.getElementById('ListenChoiceHebrew').style.color = "#dddddd";
	}
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
$("input").click(function(e){
 
 if(document.getElementById('ListenChoiceTTS').checked) {
	 document.getElementById('ListenChoiceHebrew').disabled = false;
	 document.getElementById('ListenChoiceHebrew').style.color = "#dddddd";
 }
 else {
	 document.getElementById('ListenChoiceHebrew').checked = false;
	 document.getElementById('ListenChoiceHebrew').disabled = "";
	 document.getElementById('ListenChoiceHebrew').style.color = "";
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

//Get extension version. Write into footbar
$("#version").text("version "+(chrome.runtime.getManifest().version+ " "));

var Voices = "Native";
chrome.tts.getVoices(
          function(voices) {
            for (var i = 1; i < voices.length; i++) {
              Voices = Voices + "," + (voices[i].voiceName).split("Google")[1];              
            }
			$("#listeLanguage").append("<i><small>"+Voices+"</small></i>");
          });
		  
//Init disabled checkboxif(document.getElementById('ListenChoiceTTS').checked) {

console.log("MEMRISE run with MEMRISE+ extension. If you found a bug, want participate to extension\'s program  or to suggest an improvement, translation, go to https://github.com/Shmuel83/MemrisePlus ");