//Background, load when Chrome start

//Get options choices by user
var Choice_ListenHebrew = "false";
var Choice_ListenTTS = "false";
var SelectChoiceLang = "";
function getStorageListen() {
	Choice_ListenHebrew = localStorage.getItem('ListenChoiceHebrew');
	Choice_ListenTTS = localStorage.getItem('ListenChoiceTTS');
}  
getStorageListen(); 
//Messaging
chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "listening");
  port.onMessage.addListener(function(request) {
  
    SelectChoiceLang = localStorage.getItem("SelectChoiceLang"); 
    if (request.listen) {	//User selected text
	if((Choice_ListenHebrew=="true") & (SelectChoiceLang=="Hebrew")) {
		var textHebrew = request.listen;
		if (textHebrew!='') {
			queryAudio(textHebrew, calHash(textHebrew.trim()));
		var getFileServer = "http://www.almagu5.com/webreader.audio/cid_";
		var audioFileSuffix = "_n_sivan.mp3";
		var createFileServer = "http://www.almagu5.com/webreader";
		var curUrl = "https://he.wikipedia.org/wiki/%D7%A2%D7%9E%D7%95%D7%93_%D7%A8%D7%90%D7%A9%D7%99";
		createGUID();
		
		function createGUID() {
			if (!localStorage.guid) {
				localStorage.guid = guid_ganeral();
			}
		}

		function guid_ganeral() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8;
				return v.toString(16);
			});
		}
		
		function calHash(text) {
			return CryptoJS.SHA1(text).toString(CryptoJS.enc.Hex).toUpperCase();
		}
		

		function queryAudio(text, hash) {
			//dump old one;
			var getAudioUrl = "http://www.almagu5.com/webreader.audio/cid_" + hash + "_n_sivan.mp3";
			$.ajax({
				url: getAudioUrl,
				type: 'HEAD',
				error: function () {
					createAudioFile(text);
				},
				success: function () {
					port.postMessage({AudioURL: getAudioUrl});
          
				}
			});
		}
		
		function createAudioFile(selectedText) {
			$.ajax({
				url: createFileServer,
				method: "GET",
				data: {
				"referer": encodeURIComponent(curUrl),
				"cid": "CID",
				"markup": selectedText,
				"preferredOnly": true,
				"_": Date.now(),
				"guid": localStorage.guid || createGUID(),
				"expires": "24" }
			}).success(function (data) {
				var audioFile = getFileServer + data.PhraseHash + audioFileSuffix;
				port.postMessage({AudioURL: audioFile});
			});
		}
	}
	}
	if(Choice_ListenTTS=="true")
		var textTTS = request.listen;
		chrome.tts.speak(textTTS,{"voiceName":SelectChoiceLang});
	}
	if(request.getVoices) {
		getStorageListen(); //If user change option and reload page, modification changed
		var Voices = new Array();
		if(Choice_ListenTTS=="true") { //If user choice listenTTS
			chrome.tts.getVoices(
			function(voices) {
				for (var i = 0; i < voices.length; i++) {
				Voices[i] = voices[i].voiceName;		  
				}
				//If user choose TTS Hebrew, add that
				if(Choice_ListenHebrew=="true") {
					Voices[voices.length] = "Hebrew";
				}
				port.postMessage({OptionsVoices: Voices});	//Send all languages
			});
		}
		else {	//If user don't need listen, hidden select
			port.postMessage({OptionsVoices: false});
		}	 
	}
	//Get listen languages changed
	if(request.SelectChoiceLang) {
		localStorage.setItem("SelectChoiceLang",request.SelectChoiceLang);
	}
	});
});

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
OnloadCourses(false);
OnloadStreakGraph(false);
OnloadFancyGraph(false);
OnloadBadges();

console.log("MEMRISE run with MEMRISE+ extension. If you found a bug, want participate to extension\'s program  or to suggest an improvement, translation, go to https://github.com/Shmuel83/MemrisePlus ");