//Manage Indexed DB to Things of courses
//Header function :
//	setThing(int course, int thing, string difficult, string word_a, string word_b)
//	deleteThing(int thing)
//	getThings(int course)
//	getDifficulties(callback)
const DB_NAME = "bdd-Memrise-Add";
const DB_VERSION = 1; // Use a long long for this value (don't use a float)
const DB_STORE_NAME = "Things";
const DB_KEY_COURSE = "course";
const DB_KEY_THING = "thing";
const DB_KEY_DIFFICULT = "difficult";
const DB_KEY_WORDA = "word_a";
const DB_KEY_WORDB = "word_b";
const DB_KEY_ID = "id";
  
var baseMemrise = window.indexedDB.open(DB_NAME, DB_VERSION);
baseMemrise.onupgradeneeded = function (event) {

  // Nous récupérons l'instance de notre base de données

  var db = event.target.result;
  //console.log("Create DB");
  //First creation
  var objectStore = db.createObjectStore(DB_STORE_NAME, { keyPath: DB_KEY_ID, autoIncrement: true });  
  objectStore.createIndex(DB_KEY_COURSE, DB_KEY_COURSE, { unique: false });
  objectStore.createIndex(DB_KEY_THING, DB_KEY_THING, { unique: true });
  objectStore.createIndex(DB_KEY_DIFFICULT, DB_KEY_DIFFICULT, { unique: false });
  objectStore.createIndex(DB_KEY_WORDA, DB_KEY_WORDA, { unique: false });
  objectStore.createIndex(DB_KEY_WORDB, DB_KEY_WORDB, { unique: false });

  // Nous pouvons récupérer l'ancienne version et la nouvelle pour faire des tests suivant les versions

  var ancienneVersion = event.oldVersion;
  var nouvelleVersion = event.newVersion;

  switch (ancienneVersion) {
    case 0:
      // Nous ajoutons ici tout ce qu'il faut pour mettre la structure de la base de données à jour vers la version 1

      // Nous fabriquons un ObjectStore, l'équivalent d'une table, qui contiendra nos clés => valeurs
      // Nous lui définissons son nom, puis ses paramètres, qui seront automatiquement ajoutés à toutes les valeurs de données
      // Ici, nous ajoutons le paramètre id qui sera incrémenté automatiquement pour chaque valeur

      //db.createObjectStore('utilisateurs', { keyPath: 'id', autoIncrement: true });

    case 1:
      // Nous ajoutons ici tout ce qu'il faut pour mettre la structure de la base de données à jour vers la version 2

      // etc.

      break;
  }
};
baseMemrise.onsuccess = function() {
	
	//console.log("openDB DONE");
	callback_openDB();

}
function callback_openDB() { //Update BDD (get all things and delete thing not difficult or modify thing information)
	getCourses();
}
//---------Put thing------------------------------------------------------------//
//Resume : If thing exist, used putThing with its Id
//function putThing(int course, int thing, string difficult)
//Input : int course (Id of course)
//		  int thing (Id of thing)
//		  string difficult ("","True","False")
//		  int id (Id of DB of thing)
//Ouput: 
function putThing(_id,_course,_thing,_difficult,_worda,_wordb) {
	var baseActive = baseMemrise.result;
	var transaction = baseActive.transaction(DB_STORE_NAME, 'readwrite');
	var ajout = transaction.objectStore(DB_STORE_NAME).put(
    {
      id: _id,
	  course: _course,
      thing: _thing,
	  difficult: _difficult,
	  word_a: _worda,
	  word_b: _wordb	  	  
    }
  );

  // Et enfin, comme l'ajout est asynchrone, nous attendons son retour

  ajout.onsuccess = function() {

    // Notre valeur a bien été insérée
    // Elle aura en plus une propriété id automatiquement ajoutée
	//console.log("Put thing openDB");

  };
  
}
//---------add thing------------------------------------------------------------//
//Resume : If thing exist, used putThing with its Id
//function addThing(int course, int thing, string difficult)
//Input : int course (Id of course)
//		  int thing (Id of thing)
//		  string difficult ("","True","False")
//Ouput: 
function addThing(_course,_thing,_difficult,_worda,_wordb) {
	var baseActive = baseMemrise.result;
	var transaction = baseActive.transaction(DB_STORE_NAME, 'readwrite');
	var ajout = transaction.objectStore(DB_STORE_NAME).add(
    {
      course: _course,
      thing: _thing,
	  difficult: _difficult,
	  word_a: _worda,
	  word_b: _wordb	  
    }
  );

  // Et enfin, comme l'ajout est asynchrone, nous attendons son retour

  ajout.onsuccess = function() {

    // Notre valeur a bien été insérée
    // Elle aura en plus une propriété id automatiquement ajoutée
	//console.log("Add thing openDB");

  };
  
}
//------------Get thing-------------------------------------------------------//
//Resume : Research if thing existing on DB (calles by setThing, deleteThing)
//Function getThing(int thing, callback)
//Input : int thing (Id of thing)
//		  function callback_getThing
//		  object Tab to return with callback. Need to function callback, not here
//Output : function callback(is_thingExisting, tabObject)
function getThing(_thing,callback_getThing,tabObject) {
	var baseActive = baseMemrise.result;
	var transactionLecture = baseActive.transaction(DB_STORE_NAME, 'readonly');
 
  // Nous récupérons l'index que nous avions nommé « indexPrenom » sur notre table utilisateurs
  // Il nous permet de naviguer rapidement dans la table

  var index = transactionLecture.objectStore(DB_STORE_NAME).index(DB_KEY_THING);

  // Puis on utilise get() de la même manière qu'avec la récupération d'une valeur avec sa clé

  var lecture = index.get(_thing);

  // On attend bien évidemment la récupération des données de manière asynchrone

  lecture.onsuccess = function(event) {
 
    // Et nous récupérons notre valeur

    var notreValeur = event.target.result || false;
	if(notreValeur) { //Thing exist. Only 1 result possible
		//console.log("get thing openDB : "+notreValeur.id);
		callback_getThing(notreValeur.id,tabObject);
	}
	else { //If thing not exist
		//console.log("get thing openDB : no thing existed "+notreValeur);
		callback_getThing(false,tabObject);
	}

  };
  
  lecture.onerror = function (evt) {
      console.error("openDb:", evt.target.errorCode);
	  callback_getThing(false,tabObject);
   };
	
	
}
//------------Set thing-------------------------------------------------------------------------//
//Function setThing(int course, int thing, string difficult)
//Resume : If thing exist : put(with Id), else add(Id autoincrement)
//Input : int course (Id of course)
//		  int thing (Id of thing)
//		  string difficult ("","True","False")
//Response : callback_setThing
function setThing(_course,_thing,_difficult,_worda,_wordb) {
	var tabInput = [_course,_thing,_difficult,_worda,_wordb];
	getThing(_thing,callback_setThing,tabInput); //Search if thing exist on DB;
}
//Response og getThing after called by setThing
//Need callback function because IndexedBD run asynchrone mode
function callback_setThing(is_existThing,tabObject) {
	//console.log("callback_setThing "+is_existThing);
	_course = tabObject[0];
	_thing = tabObject[1];
	_difficult = tabObject[2];
	_worda = tabObject[3];
	_wordb = tabObject[4];
	if(is_existThing==false) {
		addThing(_course,_thing,_difficult,_worda,_wordb);
	}
	else {
		//console.log("is_existThing "+is_existThing)
		putThing(is_existThing,_course,_thing,_difficult,_worda,_wordb);
	}
}
//---------Delete thing------------------------------------------------------------//
//Resume : If thing exist, delete this
//function deleteThing(int thing)
//Input : int course (Id of course)
//		  int thing (Id of thing)
//		  string difficult ("","True","False")
//		  int id (Id of DB of thing)
//Ouput: 
function deleteThing(_thing) {

	getThing(_thing,callback_deleteThing);

}
//Response og getThing after called by deleteThing
//Need callback function because IndexedBD run asynchrone mode
function callback_deleteThing(is_existThing,tabObject) {
	var baseActive = baseMemrise.result;
	var transaction = baseActive.transaction(DB_STORE_NAME, 'readwrite');
	//console.log("callback_deleteThing "+is_existThing);
	if(is_existThing != false) {
		var deleteThing = transaction.objectStore(DB_STORE_NAME).delete( is_existThing );
	
	// Et enfin, comme l'ajout est asynchrone, nous attendons son retour

		deleteThing.onsuccess = function() {

		// Notre valeur a bien été insérée
		// Elle aura en plus une propriété id automatiquement ajoutée
		//console.log("Delete thing openDB");
	
		};
	}
}
//------------Get Id-------------------------------------------------------//
//Resume : Research Things of course
//Function getId(int course, int key of DB, callback)
//Input : int course (Id of course)
//Output : int id (Id of DB) false if don't exist
function getId(id_key_range,db_key,callbackMe) {
	var baseActive = baseMemrise.result;
	var transactionLecture = baseActive.transaction(DB_STORE_NAME, 'readonly');
	var tabWordsThings = new Array();
	var tabIdThings = new Array();
	var i_boucle = 0;
  var index = transactionLecture.objectStore(DB_STORE_NAME).index(db_key);
  var keyRangeValue = IDBKeyRange.only(id_key_range); //Research only course for cursor


  var lecture = index.openCursor(keyRangeValue);

  // On attend bien évidemment la récupération des données de manière asynchrone

  lecture.onsuccess = function(event) {
 
    // Et nous récupérons notre valeur

    var cursor = event.target.result;
	
	if(cursor) { //Thing exist. Infinity result possible
		//console.log("get things openDB : "+cursor.value.course+":"+cursor.value.id);
		if((cursor.value.word_a) && (cursor.value.word_b) && cursor.value.difficult) {
			tabWordsThings[i_boucle] = cursor.value.word_a +" : "+ cursor.value.word_b;
		}
		tabIdThings[i_boucle] = cursor.value.thing;
		i_boucle++;
		cursor.continue();
	}
	else { //If thing not exist
		//console.log("get things openDB : all things get ");
		if(db_key==DB_KEY_COURSE) {
			callbackMe(id_key_range,tabWordsThings,tabIdThings);
		}
	}

  };
  
  lecture.onerror = function (evt) {
      console.error("openDb:", evt.target.errorCode);
	  return false;
   };
	
	
}
//------------Get things-------------------------------------------------------//
//Resume : Research Things of course
//Function getThings(int course, callback)
//Input : int course (Id of course)
//Output : int id (Id of DB) false if don't exist
function getThings(_course,callbackUser) {
	getId(_course,DB_KEY_COURSE,callbackUser);
}
function callback_getThings(_course,tabObject,tabId) {
	var optionHTML = "";
	for(i=0;i<tabObject.length;i++) {
		if(tabObject[i] || false) {
			optionHTML = optionHTML + "<option>"+tabObject[i]+"</option>";
		}
	}
	$("#difficultWords_"+_course).append(optionHTML); //Page option of popup
}
//------------Get things-------------------------------------------------------//
//Resume : Research Things of course
//Function getDifficulties(callback)
//Input : int course (Id of course)
//Output : int id (Id of DB) false if don't exist
function getDifficulties(callbackUser) {
	getId("True",DB_KEY_DIFFICULT,callbackUser);	
}
//------------Get courses-------------------------------------------------------//
//Resume : Research all courses
//Function getCourses(void)
//Input : \
//Output : callback_getCourses
function getCourses() {
	var baseActive = baseMemrise.result;
	var transactionLecture = baseActive.transaction(DB_STORE_NAME, 'readonly');
	var tabThings = new Array();
	var i_boucle = 0;
  var index = transactionLecture.objectStore(DB_STORE_NAME).index(DB_KEY_COURSE);


  var lecture = index.openCursor(IDBKeyRange.lowerBound(0),'nextunique'); //Search courses disctinct

  // On attend bien évidemment la récupération des données de manière asynchrone

  lecture.onsuccess = function(event) {
 
    // Et nous récupérons notre valeur

    var cursor = event.target.result;
	
	if(cursor) { //Thing exist. Infinity result possible
		//console.log("get courses openDB : "+cursor.value.course);
		getThings(cursor.value.course,callback_getThings_API);
		cursor.continue();
	}
	else { //If thing not exist
		//console.log("get course openDB : all courses get");
	}

  };
  
  lecture.onerror = function (evt) {
      console.error("openDb:", evt.target.errorCode);
	  return false;
   };	
}
function callback_getThings_API(_course,_tabObject,_tabIdT) {
	OnloadCourseDetail(_course,JSON.stringify(_tabIdT));
}