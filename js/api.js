//Recherche de tous les cours (ne répond à pas plus de 4 cours. Si il y en a plus, on ne les voient pas)
function OnloadCourses(is_popup) {
var url_courses = "http://www.memrise.com/ajax/courses/dashboard/?courses_filter=most_recent&limit=20";
        $.getJSON(url_courses, function (data) {
            localStorage.setItem("courses",(JSON.stringify(data)).replace(/<[^>]*>?/g, ''));
        })
 .done(function() {
	if(is_popup) {
		coursesView();
	}
	OnloadBadges();
	return "success";
  })
  .fail(function() {
	return "error";
  })
  .always(function() {
	return "complete";
  });
}
//Recherche détail d'un cours
function OnloadCourseDetail(courseId,ArrayThingsId) {
var url_courseDetail = "http://www.memrise.com/api/thing/stats/?course_id=" + courseId +"&thing_ids="+ArrayThingsId;
console.log(url_courseDetail);
        $.getJSON(url_courseDetail)
 .done(function(parserThings) {
	for(i=0;i<parserThings.things.length;i++) {
		var parse_course = parseInt(parserThings.things[i].course_id);
		var parse_thing = parseInt(parserThings.things[i].thing_id);
		var parse_difficult = (parserThings.things[i].is_difficult);
		var parse_worda = (parserThings.things[i].col_a).replace(/<[^>]*>?/g, '');
		var parse_wordb = (parserThings.things[i].col_b).replace(/<[^>]*>?/g, '');
		console.log(parse_course+","+ parse_thing+","+ parse_difficult+","+ parse_worda+","+ parse_wordb);
		if(!parse_difficult) {	
			deleteThing(parse_thing);
		}
		else { //is_difficult
			setThing(parse_course, parse_thing, parse_difficult, parse_worda, parse_wordb);
		}
		
	}
	return "success";
  })
  .fail(function() {
	return "error";
  })
  .always(function() {
	return "complete";
  });
}
//Récupération de tous les points cumulés
function OnloadStreakGraph(is_popup) {
var url_streakGraph = "http://www.memrise.com/ajax/metrics/learning_streak_graph/";
        $.getJSON(url_streakGraph, function (data) {
            localStorage.setItem("json",(JSON.stringify(data)).replace(/<[^>]*>?/g, ''));
        })
	.done(function() {
	if(is_popup) {
		ChartLoad();
	}
	return "success";
  })
  .fail(function() {
	return "error";
  })
  .always(function() {
	return "complete";
  });
}
//Récupération de tous les points cumulés
function OnloadFancyGraph(is_popup) {
var url_fancyGraph = "http://www.memrise.com/ajax/metrics/fancy_tests_graph/";
        $.getJSON(url_fancyGraph, function (data) {
            localStorage.setItem("fancy",(JSON.stringify(data)).replace(/<[^>]*>?/g, ''));
        })
	.done(function() {
	if(is_popup) {
		ChartFancyLoad();
	}
	return "success";
  })
  .fail(function() {
	return "error";
  })
  .always(function() {
	return "complete";
  });
}