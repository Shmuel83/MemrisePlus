function checkSession() {
	//Récupération Username (variable JSON : MEMRISE)
chrome.tabs.query(
		{
			url:"https://www.memrise.com/*" //Recherche de l'onglet memrise
		}, 
		function(result) {
			if(result.length) {
				chrome.tabs.executeScript(result[0].id,{code:"if(localStorage.getItem('username')){var myUser=(localStorage['username']); myUser }"}, function(UserAwser) {if(UserAwser) {localStorage.setItem("username",UserAwser)} });

			}
		});
		
}
//Système d'onglet dans le popup
$(function() { //Attendre que la page finisse de se charger avant d'effectuer les scripts
    checkSession();
	$( "#tabs" ).tabs();
	if (localStorage.getItem('username')) {
		var StorageUsername = (localStorage.getItem('username')).replace(/<[^>]*>?/g, '');
		$(".helloworld").text(chrome.i18n.getMessage('Welcome') + StorageUsername);
		if(StorageUsername=="undefined") {
			$("#chartdiv").html("<a href='#' id='clickici'>Click on</a> to reload extension. If don't working, don't panic, go to extension tab and click on reload, or close chrome and open it");
		$("#clickici").click(function() {
			OnloadStreakGraph(true);
			OnloadFancyGraph(true);
		});
		$("#clickici").click();
		}
	}
	else {
		$("#chartdiv").html("<h3>Hello, you must be connected on memrise for that extension run ! <a id='InitConnect' href='https://www.memrise.com'>https://www.memrise.com</a><hr><a href='#' id='clickici'>Click on</a> to reload extension. If don't working, don't panic, go to extension tab and click on reload, or close chrome and open it</h3>");
		 $("#InitConnect").click(function() {chrome.tabs.create({ url: "https://www.memrise.com/" })});
		$("#clickici").click(function() {
			OnloadStreakGraph(true);
			OnloadFancyGraph(true);
			OnloadCourses(true);
			//OnloadBadges();
			//getCourses();
			
		});
		$("#clickici").click();
	}
	
	
	//Traduction des onglets
	$('a[href="#tabs-1"]').text(chrome.i18n.getMessage('tabs_1'));
	$('a[href="#tabs-2"]').text(chrome.i18n.getMessage('tabs_2'));
	$('a[href="#tabs-3"]').text(chrome.i18n.getMessage('tabs_3'));
	$("img[src='images/refresh.png']").attr("title",chrome.i18n.getMessage('TitleImageUpdate'));
	$("img[src='images/config.png']").attr("title",chrome.i18n.getMessage('TitleImageOption'));
	$("img[src='images/fullScreen.png']").attr("title",chrome.i18n.getMessage('TitleImageFullScreen'));
	$("img[src='images/info.png']").attr("title",chrome.i18n.getMessage('TitleImageAbout'));
	document.getElementById('imgConfig').addEventListener('click', open_options);
	document.getElementById('fullScreen').addEventListener('click', openfullScreen_popup);
	document.getElementById('about').addEventListener('click', open_about);
	
	
 });

//Ne permettre qu'une seul requête par jour vers le serveur memrise pour ne pas saturer le seveur sur les API (outrepassé si demande d'upload de l'utilisateur)
function checkJetonGet() {
	var date = new Date();
	var thisDay = date.getDay();
	if ((!localStorage['jetonGet'])|(localStorage['jetonGet']!=thisDay))//le compte n'existe pas (première utilisation ou réinstallation)
	{
		var date = new Date();
		localStorage['jetonGet']=date.getDay();
		return true;
	}
	else
	{
		if(!localStorage['json']) return true;
		return false;
	}
}

function open_options() {
	chrome.tabs.create({url : 'options.html'});
}
function openfullScreen_popup() {
	chrome.tabs.create({url : 'popup_fullScreen.html'});
}
function open_about() {
	chrome.tabs.create({url : 'about.html'});
}
//-------------Include translate file to chart Amchart, else if is english language-----------------//
function include(file) {
    var oScript =  document.createElement("script");
    oScript.src = "amcharts/amcharts/lang/"+ file.replace(/<[^>]*>?/g, '') +".js";
    oScript.type = "text/javascript";
    document.body.appendChild(oScript);
}
try {
	chrome.storage.sync.get({
		Choice_lang: "en"
	}, function(objectStorage) {
		callback_storage_popup(objectStorage);
	});
}
catch(exception){
	chrome.storage.local.get({
		Choice_lang: "en"
	}, function(objectStorage) {
		callback_storage_popup(objectStorage);
	});
}
function callback_storage_popup(items) {
	// On l'utilise :
	if(items.Choice_lang!="en") {
		include((items.Choice_lang).replace(/<[^>]*>?/g, ''));
	}
}
//---------To inform user if he read console------------------//
console.log("MEMRISE run with MEMRISE+ extension. If you found a bug, want participate to extension\'s program  or to suggest an improvement, translation, go to https://github.com/Shmuel83/MemrisePlus ");