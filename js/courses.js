//{courses:[category:{"photo": "https://d1..."}, "ignored": 1, "percent_complete": 49, "description": "Basic...", "url": "http://www...", "photo": "http://d2rhek...", "goal": {"course_id": 450, "streak": 5, "points": 1266, "goal": 1500}, "audio_mode": false, "ltm": 164, "review": 8, "learned": 172, "difficult": 19, "id": 450, "num_things": 349, "name": "Bas..."},
function coursesView() {
	console.log("courseView()");
var courses = JSON.parse((localStorage['courses']).replace(/<[^>]*>?/g, '')).courses;
$('#divCourses').html("");
//var things = JSON.parse(localStorage["CourseThings"]);
for(var icourse=0; icourse<courses.length; icourse++) {
	var nameCourse = (courses[icourse].name).replace(/<[^>]*>?/g, '');
	var completed = parseInt(courses[icourse].percent_complete);
	var idCourse = parseInt(courses[icourse].id);
	var textThings = "";
	/*if(parseInt(things.course)==idCourse) {
		textThings = things.things;
	}*/
	getThings(idCourse);
	$('#divCourses').append("<div id='header' class='flex-courses'>"+ nameCourse +" "+chrome.i18n.getMessage('CourseDo')+" :<div id='g_"+ idCourse +"' class='gauge'></div><select id='difficultWords_"+idCourse+"'><option>difficults words</option></select></div>");


var g1;

        g1 = new JustGage({
            id: "g_"+ idCourse,
            value: completed,
            min: 0,
            max: 100,
            donut: true,
            gaugeWidthScale: 0.6,
            counter: true,
            hideInnerShadow: true
        });
}
};
$( document ).ready(function() {
	var flag = true;
	$('a[href="#tabs-3"]').click(function() { 
		if(flag) { 
			coursesView(); 
			flag = false;
		} 
	});

});