var chartFancyData;
var chartFancy;
function ChartFancyLoad() {
	
	if(localStorage.getItem('fancy')==null) {
		//document.write("<p>Vous n'avez pas de données</p>");
	}
	else {
			chartFancyData = JSON.parse(localStorage['fancy']).data;
   chartFancy = AmCharts.makeChart("chartdiv_fancy", {
     "type": "xy",
	 "pathToImages": "http://cdn.amcharts.com/lib/3/images/",
     "theme": "light",
	 "dataDateFormat": "HH:NN", //Axe x sous la forme heure:minute
	 "legend": {
    "useGraphSettings": true, //Afficher la légende
	"equalWidths": false, "autoMargins":false //Avoir la légende sur la même ligne
  },
     "dataProvider": chartFancyData,
     "valueAxes": [{
         "position": "bottom",
         "axisAlpha": 1,
		 "type":"date",
		 "title":chrome.i18n.getMessage('FancyValueAxesX'),
		 
     }, {
         "axisAlpha": 0,
         "position": "left",
		 "title":chrome.i18n.getMessage('FancyValueAxesY'),
		 "strictMinMax":true,
		 "minimum":1	 		 
		 
     }],
	 titles: [{
		text: chrome.i18n.getMessage('FancyTitle'),
	}],
     "graphs": [{
         "balloonText": "heure:<b>[[time]]</b> temps de réponse:<b>[[correct_resp_time]]</b><br>Nombre de bonnes réponses:<b>[[correct]]</b>",
         "bullet": "bubble",
         "lineAlpha": 0,
         "valueField": "correct",
		 "title": chrome.i18n.getMessage('LegendCorrect'), //Pour la légende
         "xField": "time",
         "yField": "correct_resp_time",
         "fillAlphas": 0,
         "bulletBorderAlpha": 0.2,
         "maxBulletSize": 80

     }, {
         "balloonText": "heure:<b>[[time]]</b> temps de réponse:<b>[[incorrect_resp_time]]</b><br>Nombre de mauvaises réponses:<b>[[incorrect]]</b>",
         "bullet": "bubble",
         "lineAlpha": 0,
         "valueField": "incorrect",
		 "title": chrome.i18n.getMessage('LegendIncorrect'),
         "xField": "time",
         "yField": "incorrect_resp_time",
         "fillAlphas": 0,
         "bulletBorderAlpha": 0.2,
         "maxBulletSize": 80

     },
     {
         "balloonText": "heure:<b>[[time]]</b> temps de réponse:<b>[[incorrect_resp_time]]</b><br>Nombre de réponses partiels:<b>[[partially_correct]]</b>",
         "bullet": "bubble",
         "lineAlpha": 0,
         "valueField": "partially_correct",
		 "title": chrome.i18n.getMessage('LegendPartial'),
         "xField": "time",
         "yField": "partially_correct_resp_time",
         "fillAlphas": 0,
         "bulletBorderAlpha": 0.2,
         "maxBulletSize": 80

     },
     ],
     "chartScrollbar": {},
     "chartCursor": {},
     "balloon":{
      "fixedPosition":true
     },
     "export": {
         "enabled": true
     }
 });
	}
 }
 function UpdateFancyChart() {
	 chartFancy.dataProvider = chartFancyData = JSON.parse(localStorage['fancy']).data;
	 chartFancy.validateData();
 }
 chrome.storage.sync.get({
	Choice_lang: "en"
  }, function(items) {
	// On l'utilise :
		langStorage = items.Choice_lang;
    if ('en' == langStorage)
        chartFancy.language = null;
    else
        chartFancy.language = langStorage;
    //chartFancy.validateData();
 }
);