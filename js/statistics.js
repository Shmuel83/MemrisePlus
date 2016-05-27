function sortByXAxis(key1, key2){  
   return key1.x_axis - key2.x_axis;  
}
function round2Dec(intDec){  
   return Math.round(intDec*100)/100;  
}
//Statistiques du meilleurs moments à apprendre/du moment à ne pas apprendre
if(localStorage.getItem('fancy')==null) {
	//to do something
}
else {
			var bestHour;
			var worstHour;
			var bestTaux=0;
			var worstTaux=100;
			var tempIncorrect;
			var tempCorrect;
			var tempTaux = Array();
			var testMoyennage=0;
			var MoyenneSur1Heure;
			var JSONFancyData = JSON.parse((localStorage['fancy']).replace(/<[^>]*>?/g, '')).data;
//-----------------Algorithme de calcul de l'heure où le taux de réussite est la plus grande (à 15minute près)-----------------------------------------//
			
			//Tri des résultats JSON par ordre horaire de 0:00 à 24:00 sous format décimal
			JSONFancyData = JSONFancyData.sort(sortByXAxis);
			
			var loop=0;
			while(JSONFancyData[loop]) {
				tempIncorrect = JSONFancyData[loop].incorrect;
				tempCorrect = JSONFancyData[loop].correct;
				tempTaux[loop] = round2Dec(tempCorrect*100/(tempCorrect+tempIncorrect)); //Calcul du pourcentage de correct et on arrondi à 2 décimal
				if(loop>=3) {
					MoyenneSur1Heure = round2Dec((tempTaux[loop]+tempTaux[(loop-1)]+tempTaux[(loop-2)]+tempTaux[(loop-3)])/4);
					if(MoyenneSur1Heure>bestTaux) {
						bestTaux = MoyenneSur1Heure;
						bestHour = JSONFancyData[(loop-3)].time+" -> "+JSONFancyData[loop].time;
					}
					if(MoyenneSur1Heure<worstTaux) {
						worstTaux = MoyenneSur1Heure;
						worstHour = JSONFancyData[(loop-3)].time+" -> "+JSONFancyData[loop].time;
					}
					//console.log(JSONFancyData[loop].time+" MoyenneSur1Heure= "+MoyenneSur1Heure);
				}
				testMoyennage += tempTaux*(JSONFancyData[loop].x_axis)/100;
				loop++;
			}
			$("#analyse").html("<ul><li>"+chrome.i18n.getMessage('bestResult')+" "+bestHour+ " : "+bestTaux+"% "+chrome.i18n.getMessage('success')+".</li><li>"+chrome.i18n.getMessage('unsuccess')+" : "+worstHour+ " : "+worstTaux+"% "+chrome.i18n.getMessage('success')+".</li></ul>");
			
}
