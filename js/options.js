// Saves options to chrome.storage
function save_options(e) {
	var get_autoPause = document.getElementById('autoPause').checked;
	var get_Configchrono = document.getElementById('Configchrono').checked;
	var get_openTab = document.getElementById('openTab').checked;
	var get_Rankoverlord = document.getElementById('Rankoverlord').checked;
	var get_open = $('[name="ActionOpen"]:checked').val();
	var get_lang = $('#lang').val();
	var get_PoliceHebrew = document.getElementById('cursiveHebrew').checked;
  var ChoiceId = e.target.id;

  chrome.storage.sync.set({
		Choice_autoPause: get_autoPause,
		Choice_manageChrono: get_Configchrono,
		Choice_openTab: get_openTab,
		Choice_fun: get_Rankoverlord,
		Choice_open: get_open,
		Choice_lang: get_lang,
		Choice_PoliceHebrew: get_PoliceHebrew
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
	Choice_PoliceHebrew: false
  }, function(items) {
    document.getElementById('autoPause').checked = items.Choice_autoPause;
	document.getElementById('Configchrono').checked = items.Choice_manageChrono;
	document.getElementById('openTab').checked = items.Choice_openTab;
	document.getElementById('Rankoverlord').checked = items.Choice_fun;
	$( '[value="'+items.Choice_open+'"]' ).prop( "checked", true );
	$('#lang [value="'+items.Choice_lang+'"]').prop('selected', true)
	document.getElementById('cursiveHebrew').checked = items.Choice_PoliceHebrew;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
$("input").click(function(e){
 save_options(e);
});
$("select").change(function(e){
 save_options(e);
});

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

//Get extension version. Write into footbar
$("#version").text("version "+(chrome.runtime.getManifest().version+ " "));

console.log("MEMRISE run with MEMRISE+ extension. If you found a bug, want participate to extension\'s program  or to suggest an improvement, translation, go to https://github.com/Shmuel83/MemrisePlus ");