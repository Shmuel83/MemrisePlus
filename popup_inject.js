$("#content").append('<hr /><div class="flex-container"><div class="helloworld"><header><h1>Extension MEMRISE<span class="leplus">+</span><div id="status"></div></h1></header></div><div class="update" id="update" style="align:\'right\'"><img style="width:20px;height:20px" src="'+chrome.extension.getURL('images/refresh.png')+'" title="'+ chrome.i18n.getMessage("update") +'"/></div><div id="fullScreen"><img style="width:20px;height:20px" src="'+chrome.extension.getURL('images/fullScreen.png')+'" title="Plein écran"/></div><div id="imgConfig"><img style="width:20px;height:20px" src="'+chrome.extension.getURL('images/config.png')+'" title="Options"/></div></div><div id="tabs"><ul><li><a href="#tabs-1">Evolution global</a></li><li><a href="#tabs-2">Performance dans la journée</a></li><li><a href="#tabs-3">Cours</a></li></ul><div id="tabs-1"><div id="chartdiv" style="width: 100%; height: 500px;"></div></div><div id="tabs-2"><div id="analyse">Analyse</div><div id="chartdiv_fancy" style="width: 100%; height: 400px;"></div></div><div id="tabs-3"><div id="divCourses" style="width: 700px;"></div></div></div>');
//
function checkSession() {
	//Récupération Username (variable JSON : MEMRISE)	
	if (localStorage.getItem('username')) {
		$(".helloworld").text(chrome.i18n.getMessage('Welcome') + localStorage.getItem('username'));
	}
}
//Système d'onglet dans le popup
$(function() { //Attendre que la page finisse de se charger avant d'effectuer les scripts
    $( "#tabs" ).tabs();
	//Traduction des onglets
	$('a[href="#tabs-1"]').text(chrome.i18n.getMessage('tabs_1'));
	$('a[href="#tabs-2"]').text(chrome.i18n.getMessage('tabs_2'));
	$('a[href="#tabs-3"]').text(chrome.i18n.getMessage('tabs_3'));
	
	checkSession();
	
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