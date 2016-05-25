function click(e) {
	UpdateAllChart();
}
	
document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('#update');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});

//Load chart
ChartLoad();
ChartFancyLoad();

//Update by user request (click on image uder popup)
function UpdateAllChart() {
//Lancement des script API et récupération JSON
	OnloadCourses();
	OnloadBadges();
//if(OnloadStreakGraph()=="success") {
	UpdateLineChart();
//}
//if(OnloadFancyGraph()=="success") {
	OnloadFancyGraph();
	UpdateFancyChart();
//}
}

//Update text on badge (extension icon)
function OnloadBadges() {
	var courses = JSON.parse(localStorage['courses']).courses;
	var reviewCourse = 0;
	var difficultCourse = 0;
	for(var icourse=0; icourse<courses.length; icourse++) {
		reviewCourse = reviewCourse + courses[icourse].review;
		difficultCourse = difficultCourse + courses[icourse].difficult;
	}
	if(reviewCourse>0) {
		if(reviewCourse>900) {
			reviewCourse="+900";
		}
		chrome.browserAction.setBadgeText({
			text: reviewCourse.toString()
		});
		chrome.browserAction.setBadgeBackgroundColor({
            color: '#6ec8f9'
		});
		
	}
	else {
		chrome.browserAction.setBadgeText({
			text: ""
		});
	}
}