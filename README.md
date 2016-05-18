# Memrise+
Extension Chrome for memrise.com (charts, fonts modify, timer control)

File "manifest.json" : Root file. When Chrome is open, background.html is loaded
When you are on memrise.com, a script is injected on memrise with the file "js/insertScript.js"

File "background.html" : Memrise API requests https://github.com/carpiediem/memrise-enhancement-suite/wiki/Unofficial-Documentation-for-the-Memrise-API and configure action when user click on icon (extension on a popup or new tab)

File "popup.html" : Is visible when user click on icon. 2 charts developed by amcharts.com with data got by memrise API, format JSON.

File "option.html" To activate the options that the user wants.

Files "amcharts.js", "fancy_tests_graph.js" : To show charts.

File "hackTimerUserAction.js"  : To inject javascript code on memrise website. Control timer, font hebrew with its button.

Directory "_locales" : English and French translation.

Future developments
Add Audio : https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
Tab "courses" of my extension : Courses contain a maximum of 4 classes because memrise API is limited. I have to find all the courses and show the difficult words for each course.
At Opera (same Chrome because chromium): Awaiting moderation
At Firefox : To do
An idea ?