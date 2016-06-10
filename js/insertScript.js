chrome.storage.sync.get({
	Choice_fun: false,
	Choice_chat: true
  }, function(items) {
		var script = document.createElement('script');
		script.appendChild(document.createTextNode('console.log("MEMRISE run with MEMRISE+ extension. If you found a bug, want participate to extension\'s program  or to suggest an improvement, go to https://github.com/Shmuel83/MemrisePlus "); if(MEMRISE!="undefined") {localStorage.setItem("username",(MEMRISE.user.username)); }'));

		if(items.Choice_fun) {
			script.appendChild(document.createTextNode(" /*MEMRISE.CONSTANTS.DISCOUNT_CODES[100] = 'OLIVER';*/ /*MEMRISE.user.is_premium = true; */$(\".content-badges\").html(\"<span class='profile-badge rank overlord' data-toggle='tooltip' data-placement='bottom' data-html='true' data-original-title='Rank: <b>Overlord</b>'><span class='bg-image'></span></span><span class='profile-badge streak c1' data-toggle='tooltip' data-placement='bottom' data-html='true' data-original-title='Daily goal: <b>3771-day streak</b>'><span class='bg-image'>3771</span></span><span class='profile-badge premium c2' data-toggle='tooltip' data-placement='bottom' data-html='true' data-original-title='Maybe lock, but you are beautiful star'><span class='bg-image'></span></span><span class='profile-badge back-to-school c4' data-toggle='tooltip' data-placement='bottom' data-html='true' data-original-title='badge to come : Back to school'><span class='bg-image'></span></span>\");"));
		}
		(document.body || document.head || document.documentElement).appendChild(script);
		
		if(items.Choice_chat) {
			$(".sidebar-profile").append('<div id="tlkio" data-channel="memrise" data-nickname="'+ (localStorage.getItem("username")).replace(/<[^>]*>?/g, '') +'" data-theme="theme--day" style="width:100%;height:400px;"></div><script async src="http://tlk.io/embed.js" type="text/javascript"></script>');
		}
		
  });
  