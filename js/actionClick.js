//Ouverture ou sélection de l'onglet
var IdTabs = null;
chrome.browserAction.onClicked.addListener(function(tab){
try {
	chrome.storage.sync.get({
	Choice_open: "openOptionPopup",
	Choice_openTab: false
	}, function(objectStorage) {
		callback_storage_actionClick(objectStorage);		
	});
}
catch(exception){
	chrome.storage.local.get({
	Choice_open: "openOptionPopup",
	Choice_openTab: false
	}, function(objectStorage) {
		callback_storage_actionClick(objectStorage);		
	});
}
function callback_storage_actionClick(items) {
	//Ouverture de MEMRISE si activé dans l'option
	if(items.Choice_openTab) {
		chrome.tabs.query(
		{
			url:"http://www.memrise.com/*" //Recherche de l'onglet memrise
		}, 
		function(result) {
			if(result.length==0) {	//Si l'onglet n'existe pas
				var newURL = "http://www.memrise.com/";
				chrome.tabs.create({ url: newURL }); //Créer l'onglet
				//chrome.tabs.create({url: 'popup.html'});
				IdTabs = null;
			} else {
				chrome.tabs.update(	//Sinon aller sur l'onglet existant (si il y a plusieurs onglets memrise, choisir le premier trouvé)
					result[0].id, 
					{
						highlighted:true
					}
				);
				IdTabs = result[0].id;
			}
		});
	}
	//Ouverture de l'extension dans
	//Un nouvel onglet
	if(items.Choice_open=="openOptionTab") {
	var check_tab=false;
		chrome.tabs.create({ url: "popup_fullScreen.html" });
	}
	//Dans un popup
	if(items.Choice_open=="openOptionPopup") {
		chrome.browserAction.setPopup({ tabId:tab.id, popup: "popup.html" });
	}
}
 
});