# Memrise+
Extension Chrome for memrise.com (charts, fonts modify, timer control)

* File "manifest.json" : Root file. When Chrome is open, background.html is loaded
When you are on memrise.com, a script is injected on memrise with the file "js/insertScript.js"

* File "background.html" : Memrise API requests and configure action when user click on icon (extension on a popup or new tab)

* File "popup.html" : Is visible when user click on icon. 2 charts with amcharts library with data got by memrise API, format JSON and courses for show % of progress and difficult courses

* File "option.html" To activate the options that the user wants.

* Files "amcharts.js", "fancy_tests_graph.js" : To show charts.

* File "hackTimerUserAction.js"  : To inject javascript code on memrise website. Control timer, font hebrew with its button, help me button

* Directory "_locales" : English and French translation.

Link store for :
* [Chome](https://chrome.google.com/webstore/detail/memrise%2B/hmpiegnknhdokbhnifbpgbbfkeddbdfh)
* [Opera](https://addons.opera.com/fr/extensions/details/memrise/) : Same code
* Firefox : Step moderation : Same code except manifest.json
