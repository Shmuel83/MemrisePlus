//Ouverture ou sélection de l'onglet
var IdTabs = null;
chrome.browserAction.onClicked.addListener(function(tab){
chrome.storage.sync.get({
	Choice_open: "openOptionPopup",
	Choice_openTab: false
  }, function(items) {
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
		/*chrome.tabs.query( 
		function(result) {
			for(var iboucle=0; iboucle<result.length;iboucle++) {
				if(result[iboucle].id==tab.id) {
				check_tab = true;
					chrome.tabs.update(	//Sinon aller sur l'onglet existant (si il y a plusieurs onglets memrise, choisir le premier trouvé)
					result[iboucle].id, 
					{
						highlighted:true
					}
				);
				}
			}
			if(!check_tab) {
				*/chrome.tabs.create({ url: "popup_fullScreen.html" });/*
			}
		});*/
		}
		//Dans un popup
		if(items.Choice_open=="openOptionPopup") {
				chrome.browserAction.setPopup({ tabId:tab.id, popup: "popup.html" });
		}
		/*if(items.Choice_open=="openOptionWeb") {
			chrome.tabs.insertCSS(IdTabs, {file: "css/flex.css"});
			chrome.tabs.executeScript(IdTabs, {code: "localStorage['courses']="+JSON.stringify(localStorage['courses'])});
			chrome.tabs.executeScript(IdTabs, {file: "jquery-ui-1.11.4/jquery-ui.min.js"});
			chrome.tabs.executeScript(IdTabs, {file: "amcharts/amcharts/amcharts.js"});
			chrome.tabs.executeScript(IdTabs, {file: "amcharts/amcharts/serial.js"});
			chrome.tabs.executeScript(IdTabs, {file: "amcharts/amcharts/xy.js"});
			chrome.tabs.executeScript(IdTabs, {file: "amcharts/amcharts/themes/light.js"});
			chrome.tabs.executeScript(IdTabs, {file: "js/amcharts.js"});
			chrome.tabs.executeScript(IdTabs, {file: "js/fancy_tests_graph.js"});
			chrome.tabs.executeScript(IdTabs, {file: "js/api.js"});
			chrome.tabs.executeScript(IdTabs, {file: "popup_inject.js"});
			chrome.tabs.executeScript(IdTabs, {file: "js/get.js"});
			chrome.tabs.executeScript(IdTabs, {file: "js/raphael-2.1.4.min.js"});
			chrome.tabs.executeScript(IdTabs, {file: "js/justgage.js"});
			chrome.tabs.executeScript(IdTabs, {file: "js/courses.js"});
			chrome.tabs.executeScript(IdTabs, {file: "js/statistics.js"});
		}*/		
		
  });
  
});