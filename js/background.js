//Background, load when Chrome start
function getListTTSlanguage() {
        this.responsivevoices = [
            {name: 'UK English Female', flag: 'en-GB'},
            {name: 'US English Female', flag: 'en-US'},
			{name: 'Afrikaans Male', flag: 'af'},
			{name: 'Albanian Male', flag: 'sq'},
            {name: 'Arabic Female', flag: 'ar-SA'},
            {name: 'Armenian Male', flag: 'hy'},
            {name: 'Australian Female', flag: 'en-AU'},
			{name: 'Bosnian Male', flag: 'bs'},
            {name: 'Brazilian Portuguese Female', flag: 'pt-BR'},
			{name: 'Catalan Male', flag: 'ca'},
            {name: 'Chinese Female', flag: 'zh-CN'},
			{name: 'Croatian Male', flag: 'hr'},
			{name: 'Czech Male', flag: 'cs-CZ'},
            {name: 'Danish Female', flag: 'da'},
            {name: 'Deutsch Female', flag: 'de'},
            {name: 'Dutch Female', flag: 'nl'},
			{name: 'Esperanto Male', flag: 'eo'},
            {name: 'Finnish Female', flag: 'fi'},
            {name: 'French Female', flag: 'fr-FR'},
            {name: 'Greek Female', flag: 'el'},
            {name: 'Hindi Female', flag: 'hi'},
            {name: 'Hungarian Female', flag: 'hu'},
			{name: 'Icelandic Male', flag: 'is'},
            {name: 'Indonesian Female', flag: 'id'},
            {name: 'Italian Female', flag: 'it'},
            {name: 'Japanese Female', flag: 'ja'},
            {name: 'Korean Female', flag: 'ko'},
			{name: 'Latin Male', flag: 'la'},
			{name: 'Latvian Male', flag: 'lv'},
			{name: 'Macedonian Male', flag: 'mk'},
			{name: 'Montenegrin Male', flag: 'sr-ME'},
            {name: 'Norwegian Female', flag: 'no'},
            {name: 'Polish Female', flag: 'pl'},
            {name: 'Portuguese Female', flag: 'pt-PT'},
            {name: 'Romanian Male', flag: 'ro'},
            {name: 'Russian Female', flag: 'ru'},
			{name: 'Serbian Male', flag: 'sr'},
			{name: 'Slovak Male', flag: 'sk'},
            {name: 'Spanish Female', flag: 'es'},
            {name: 'Spanish Latin American Female', flag: 'es-419'},
			{name: 'Swahili Male', flag: 'sw'},
            {name: 'Swedish Female', flag: 'sv'},
            {name: 'Tamil Female', flag: 'hi'},
            {name: 'Thai Female', flag: 'th'},
            {name: 'Turkish Female', flag: 'tr'},
			{name: 'Vietnamese Female', flag: 'vi'},
			{name: 'Welsh Male', flag: 'cy'}			

        ];
		return this.responsivevoices;
}

//Get options choices by user
var Choice_ListenHebrew = "false";
var Choice_ListenTTS = "false";
var SelectChoiceLang = "";
function getStorageListen() {
	if(localStorage.getItem('ListenChoiceHebrew')) {
		Choice_ListenHebrew = (localStorage.getItem('ListenChoiceHebrew')).replace(/<[^>]*>?/g, '');
	}
	if(localStorage.getItem('ListenChoiceTTS')) {
		Choice_ListenTTS = (localStorage.getItem('ListenChoiceTTS')).replace(/<[^>]*>?/g, '');
	}
}  
getStorageListen();

//Exeption to Opera Chrome.TTS exist, but only native language
function ExceptionLanguage(portListener) {
	var listTTS = getListTTSlanguage();
	var Voices = new Array();
	for (var i = 0; i < listTTS.length; i++) {
		Voices[i] = listTTS[i].name;				
	}
	//If user choose TTS Hebrew, add that
	if(Choice_ListenHebrew=="true") {
		Voices[Voices.length] = "Hebrew";
	}
	portListener.postMessage({OptionsVoices: Voices});	//Send all languages	
}
 
//Messaging
chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "listening");
  port.onMessage.addListener(function(request) {
  
    if(localStorage.getItem("SelectChoiceLang"))
	{
		SelectChoiceLang = (localStorage.getItem("SelectChoiceLang")).replace(/<[^>]*>?/g, ''); 
	}
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
					createAudioFile(text.replace(/<[^>]*>?/g, ''));
				},
				success: function () {
					port.postMessage({AudioURL: getAudioUrl.replace(/<[^>]*>?/g, '')});
          
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
				"markup": selectedText.replace(/<[^>]*>?/g, ''),
				"preferredOnly": true,
				"_": Date.now(),
				"guid": localStorage.guid || createGUID(),
				"expires": "24" }
			}).success(function (data) {
				var audioFile = getFileServer + data.PhraseHash + audioFileSuffix;
				port.postMessage({AudioURL: audioFile.replace(/<[^>]*>?/g, '')});
			});
		}
	}
	}
	if(Choice_ListenTTS=="true") {
		var textTTS = (request.listen).replace(/<[^>]*>?/g, '');
		
		if(SelectChoiceLang.substring(0, 6)=="Google") { //TTS Speech Google
			chrome.tts.speak(textTTS,{"voiceName":SelectChoiceLang.replace(/<[^>]*>?/g, '')});
		}
		else {
			var urlTTS = 'https://code.responsivevoice.org/develop/getvoice.php/?t=' + textTTS;
			var langueChoice = "en-US"; //By default, English language
			var listTTS = getListTTSlanguage();
			for (var i = 0; i < listTTS.length; i++) {
				if(SelectChoiceLang==listTTS[i].name)	{
					langueChoice = listTTS[i].flag;
					break;
				}	  
			}
			urlTTS = urlTTS + '&tl=' + langueChoice;
			port.postMessage({AudioURL: urlTTS});
		}
	}
	}
	if(request.getVoices) {
		getStorageListen(); //If user change option and reload page, modification changed
		var Voices = new Array();
		if(Choice_ListenTTS=="true") { //If user choice listenTTS
			try {	//TTS exist (Not exit on Firefox and OPERA, only of Chrome)
				chrome.tts.getVoices(
				function(voices) {
					if(voices.length<=1) {	//Generate exeption if only Native language (for Opera)
						throw new ExceptionLanguage(port);
					}
					else {
						for (var i = 0; i < voices.length; i++) {
							Voices[i] = voices[i].voiceName;		  
						}
						//If user choose TTS Hebrew, add that
						if(Choice_ListenHebrew=="true") {
							Voices[voices.length] = "Hebrew";
						}
						port.postMessage({OptionsVoices: Voices});	//Send all languages
					}	
				});
			}
			catch(exception){
				var listTTS = getListTTSlanguage();
				for (var i = 0; i < listTTS.length; i++) {
					Voices[i] = listTTS[i].name;				
				}
				//If user choose TTS Hebrew, add that
				if(Choice_ListenHebrew=="true") {
					Voices[Voices.length] = "Hebrew";
				}
				port.postMessage({OptionsVoices: Voices});	//Send all languages			
			}

		}
		else {	//If user don't need listen, hidden select
			port.postMessage({OptionsVoices: false});
		}	 
	}
	//Get listen languages changed
	if(request.SelectChoiceLang) {
		localStorage.setItem("SelectChoiceLang",(request.SelectChoiceLang).replace(/<[^>]*>?/g, ''));
	}
	});
});

//Update text on badge (extension icon)
function OnloadBadges() {
	var courses = "{}";
	if(localStorage['courses']) {
		courses = JSON.parse((localStorage['courses']).replace(/<[^>]*>?/g, '')).courses;
	}
	var reviewCourse = 0;
	var difficultCourse = 0;
	for(var icourse=0; icourse<courses.length; icourse++) {
		reviewCourse = reviewCourse + parseInt(courses[icourse].review);
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

chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
	if(request.things) {
		 var parseRequest = JSON.parse(request.things);
		 var course = parseInt(parseRequest.course);
		 var things = parseRequest.things;
		 for(i=0;i<things.length;i++) {
			 setThing(course, parseInt(things[i]));
			 console.log("add thing on DB");
		 }
	}

  });

//Lance toutes les requêtes utiles dès le démarage (depuis api.js)
OnloadCourses(false);
OnloadStreakGraph(false);
OnloadFancyGraph(false);
OnloadBadges();

console.log("MEMRISE run with MEMRISE+ extension. If you found a bug, want participate to extension\'s program  or to suggest an improvement, translation, go to https://github.com/Shmuel83/MemrisePlus ");