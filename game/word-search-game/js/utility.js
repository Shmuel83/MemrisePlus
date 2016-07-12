/**
 * Returns a random integer between min and max
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
if (typeof Math.rangeInt != 'function') {
  Math.rangeInt = function(min, max){
  	if (max == undefined) {
  		max = min;
  		min = 0;
  	}
  	return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

/**
 * Mege two objects
 *
 * @param {Object} o1 Object 1
 * @param {Object} o2 Object 2
 * @return {Object}
 */
if (typeof Object.merge != 'function') {
  Object.merge = function(o1, o2) {
    for (var i in o1) {
      o2[i] = o1[i];
    }
    return o2;
  }
}

function initGame(_course) {
	var gameAreaEl = document.getElementById('ws-area');
	var difficultCourse = localStorage["game_"+_course+""];
	var ArraydifficultCourse = difficultCourse.split(",");
	var words = "";
	for(i=0;i<ArraydifficultCourse.length;i++) {
		words = words + "'" + ArraydifficultCourse.split(" : ")[0]  + "'";
		if(ArraydifficultCourse.length<i+1) {
			words = words + ","
		}
	}
    var gameobj = gameAreaEl.wordSearch(words);

      // Put words into `.ws-words`
      var words = gameobj.settings.wordsList,
        wordsWrap = document.querySelector('.ws-words');
      for (i in words) {
        var liEl = document.createElement('li');
        liEl.setAttribute('class', 'ws-word');
        liEl.innerText = words[i];
        wordsWrap.appendChild(liEl);
      }
}

$("document").click(function(event) {
	console.log("click");
	var theId =  $(event.target).context.id; 
	var Arrayid = theId.split("game_");
	if(Arrayid.length==2) {
		initGame(Arrayid[1]);
	}
});