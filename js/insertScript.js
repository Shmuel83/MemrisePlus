try {
	chrome.storage.sync.get({
		Choice_fun: false,
		Choice_chat: true
	}, function(objectStorage) {
			callback_storage_insertScript(objectStorage);
	});
}
catch(exception){
	chrome.storage.local.get({
		Choice_fun: false,
		Choice_chat: true
	}, function(objectStorage) {
			callback_storage_insertScript(objectStorage);
		}
	);
}
function callback_storage_insertScript(items) {
	var script = document.createElement('script');
		script.appendChild(document.createTextNode('console.log("MEMRISE run with MEMRISE+ extension. If you found a bug, want participate to extension\'s program  or to suggest an improvement, go to https://github.com/Shmuel83/MemrisePlus "); if(MEMRISE!="undefined") {localStorage.setItem("username",(MEMRISE.user.username)); }'));

		if(items.Choice_fun) {
			//script.appendChild(document.createTextNode("MEMRISE.user.is_premium=true;"));
			$(".content-badges").html("<span class='profile-badge rank overlord' data-toggle='tooltip' data-placement='bottom' data-html='true' data-original-title='Rank: <b>Overlord</b>'><span class='bg-image'></span></span><span class='profile-badge streak c1' data-toggle='tooltip' data-placement='bottom' data-html='true' data-original-title='Daily goal: <b>3771-day streak</b>'><span class='bg-image'>3771</span></span><span class='profile-badge premium c2' data-toggle='tooltip' data-placement='bottom' data-html='true' data-original-title='Maybe lock, but you are beautiful star'><span class='bg-image'></span></span><span class='profile-badge back-to-school c4' data-toggle='tooltip' data-placement='bottom' data-html='true' data-original-title='badge to come : Back to school'><span class='bg-image'></span></span>");
			$('li.premium').html('<a href="/premium/?hook=header&offer=OLIVER" class="nav-item-btn"><span class="ico"></span><span class="nav-item-btn-text">Go Pro 50%</span></a>');
		}
		
		
		(document.body || document.head || document.documentElement).appendChild(script);
		
		
		if(items.Choice_chat) {
			$(".sidebar-profile").append('<div id="tlkio" data-channel="memrise" data-nickname="'+ (localStorage.getItem("username")).replace(/<[^>]*>?/g, '') +'" data-theme="theme--day" style="width:100%;height:400px;"><script>function tlkio(t, e){var i=function(){var t=e.getElementById("tlkio"),i=t.getAttribute("data-env")||"production",n=t.getAttribute("data-channel"),a=t.getAttribute("data-theme"),o=t.getAttribute("data-custom-css"),s=t.getAttribute("data-nickname"),l=e.createElement("iframe"),r="//embed.tlk.io/"+n,m=[];"dev"==i&&(r="http://embed.lvh.me:3000/"+n),o&&o.length&&m.push("custom_css_path="+o),s&&s.length&&m.push("nickname="+s),a&&a.length&&m.push("theme="+a),m.length&&(r+="?"+m.join("&")),l.setAttribute("src",r),l.setAttribute("width","100%"),l.setAttribute("height","100%"),l.setAttribute("frameborder","0"),l.setAttribute("style","margin-bottom: -8px;");var u=t.getAttribute("style");t.setAttribute("style","overflow: auto; -webkit-overflow-scrolling: touch;"+u),t.textContent="",t.appendChild(l)},n=function(){var n=e.getElementById("tlkio"),a=e.createElement("style"),o=e.createElement("img");a.textContent=".tlkio-pulse{width:70px;margin:-27px 0 0 -35px;position:absolute;top:50%;left:50%;animation: tlkio-pulse 1.5s ease-in 0s infinite;}@keyframes tlkio-pulse{0%{transform:scale(1)}10%{transform:scale(1.15)}18%{transform:scale(0.95)}24%{transform:scale(1)}}",o.src="//tlk.io/images/logo.png",o.className="tlkio-pulse","static"==t.getComputedStyle(n).position&&(n.style.position="relative"),n.appendChild(a),n.appendChild(o),t.setTimeout(i,3e3)};n();}tlkio(window,document);</script></div>');
		}

	var g = 
	"var flagloadMoreCourses = 0; var iCoursesGame=0;"+
	"MEMRISE.dashboard.cardsComponent.vm.coursesGame =  MEMRISE.dashboard.cardsComponent.vm.courses;"+
	"MEMRISE.dashboard.cardsComponent.vm.courses = function() {"+
	"var thegames = MEMRISE.dashboard.cardsComponent.vm.coursesGame();"+
	"for(var i in localStorage) {"+
	"var ArrayLocalStorage = i.split('game_');"+
	"if(ArrayLocalStorage.length==2) { iCoursesGame++;"+
		"var course = parseInt(ArrayLocalStorage[1]);"+
		"if(!$('#game_'+course+'').html()) {"+
		"$('#course-'+course+' .course-actions').prepend('<a class=\"button pink\" id=\"game_'+course+'\" href=\"#game\">Game +</a>');"+
		"}"+
	"}"+
	
"}"+
"return thegames; };"+
"MEMRISE.dashboard.cardsComponent.vm.hasMoreCoursesGame = MEMRISE.dashboard.cardsComponent.vm.hasMoreCourses;\n"+
"MEMRISE.dashboard.cardsComponent.vm.hasMoreCourses = function() {\n"+
"var thegamesReload = MEMRISE.dashboard.cardsComponent.vm.hasMoreCoursesGame();\n"+
"MEMRISE.dashboard.cardsComponent.vm.courses();\n"+
"return thegamesReload;};";
	
	var script = document.createElement('script');
    script.textContent = g.toString();
    document.body.appendChild(script);

	chrome.runtime.sendMessage({game : true});

	
		
}