//Background, lancé au démarrage de Chrome en tâche de fond


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

//Lance toutes les requêtes utiles dès le démarage (depuis api.js)
OnloadCourses();
OnloadStreakGraph();
OnloadFancyGraph();
OnloadBadges();

console.log("MEMRISE run with MEMRISE+ extension. If you found a bug, want participate to extension\'s program  or to suggest an improvement, translation, go to https://github.com/Shmuel83/MemrisePlus ");