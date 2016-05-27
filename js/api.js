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
function OnloadCourseDetail(courseId) {
var url_courseDetail = "http://www.memrise.com/api/course/get/?course_id=" + courseId +"&session_slug=review_course";
        $.getJSON(url_courseDetail, function (data) {
            localStorage.setItem("courseDetail",(JSON.stringify(data)).replace(/<[^>]*>?/g, ''));
        })
 .done(function() {
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