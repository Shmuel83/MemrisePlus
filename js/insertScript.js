//$("body").append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script><link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css"></link>');
$("body").append('<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css"></link>');
chrome.storage.sync.get({
	Choice_fun: false
  }, function(items) {
		var script = document.createElement('script');
		script.appendChild(document.createTextNode('console.log("MEMRISE run with MEMRISE+ extension. If you found a bug, want participate to extension\'s program  or to suggest an improvement, go to https://github.com/Shmuel83/MemrisePlus "); function getMEMRISE() { if(MEMRISE!="undefined") {localStorage.setItem("username",(MEMRISE.user.username));}} getMEMRISE();'));

		if(items.Choice_fun) {
			script.appendChild(document.createTextNode("$(\".content-badges\").html(\"<span class='profile-badge rank overlord' data-toggle='tooltip' data-placement='bottom' data-html='true' data-original-title='Rank: <b>Overlord</b>'><span class='bg-image'></span></span><span class='profile-badge streak c1' data-toggle='tooltip' data-placement='bottom' data-html='true' data-original-title='Daily goal: <b>3771-day streak</b>'><span class='bg-image'>3771</span></span><span class='profile-badge premium c2' data-toggle='tooltip' data-placement='bottom' data-html='true' data-original-title='Maybe lock, but you are beautiful star'><span class='bg-image'></span></span><span class='profile-badge back-to-school c4' data-toggle='tooltip' data-placement='bottom' data-html='true' data-original-title='badge to come : Back to school'><span class='bg-image'></span></span>\");"));
		}
		(document.body || document.head || document.documentElement).appendChild(script);
		
  });