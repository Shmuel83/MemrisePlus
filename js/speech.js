//https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
var msg = new SpeechSynthesisUtterance('Hello World');
    window.speechSynthesis.speak(msg);