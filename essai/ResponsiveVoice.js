if (typeof responsiveVoice != 'undefined') {
    console.log('ResponsiveVoice already loaded');
    console.log(responsiveVoice);
} else {

    var ResponsiveVoice = function () {

        var self = this;


        // Our own collection of voices
        self.responsivevoices = [
            {name: 'UK English Female', flag: 'gb'},
            {name: 'UK English Male', flag: 'gb'},
            {name: 'US English Female', flag: 'us'},
            {name: 'Arabic Male', flag: 'ar'},
            {name: 'Arabic Female', flag: 'ar'},
            {name: 'Armenian Male', flag: 'hy'},
            {name: 'Australian Female', flag: 'au'},
            {name: 'Brazilian Portuguese Female', flag: 'br'},
            {name: 'Chinese Female', flag: 'cn'},
            {name: 'Czech Female', flag: 'cz'},
            {name: 'Danish Female', flag: 'dk'},
            {name: 'Deutsch Female', flag: 'de'},
            {name: 'Dutch Female', flag: 'nl'},
            {name: 'Finnish Female', flag: 'fi'},
            {name: 'French Female', flag: 'fr'},
            {name: 'Greek Female', flag: 'gr'},
            {name: 'Hatian Creole Female', flag: 'ht'},
            {name: 'Hindi Female', flag: 'hi'},
            {name: 'Hungarian Female', flag: 'hu'},
            {name: 'Indonesian Female', flag: 'id'},
            {name: 'Italian Female', flag: 'it'},
            {name: 'Japanese Female', flag: 'jp'},
            {name: 'Korean Female', flag: 'kr'},
            {name: 'Latin Female', flag: 'va'},
            {name: 'Norwegian Female', flag: 'no'},
            {name: 'Polish Female', flag: 'pl'},
            {name: 'Portuguese Female', flag: 'br'},
            {name: 'Romanian Male', flag: 'ro'},
            {name: 'Russian Female', flag: 'ru'},
            {name: 'Slovak Female', flag: 'sk'},
            {name: 'Spanish Female', flag: 'es'},
            {name: 'Spanish Latin American Female', flag: 'es'},
            {name: 'Swedish Female', flag: 'sv'},
            {name: 'Tamil Male', flag: 'hi'},
            {name: 'Thai Female', flag: 'th'},
            {name: 'Turkish Female', flag: 'tr'},
            {name: 'Afrikaans Male', flag: 'af'},
            {name: 'Albanian Male', flag: 'sq'},
            {name: 'Bosnian Male', flag: 'bs'},
            {name: 'Catalan Male', flag: 'catalonia'},
            {name: 'Croatian Male', flag: 'hr'},
            {name: 'Czech Male', flag: 'cz'},	
            {name: 'Danish Male', flag: 'da'},   //DEPRECATED - NO LONGER SUPPORTED
            {name: 'Esperanto Male', flag: 'eo'},
            {name: 'Finnish Male', flag: 'fi'},   //DEPRECATED - NO LONGER SUPPORTED	
            {name: 'Greek Male', flag: 'gr'},   //DEPRECATED - NO LONGER SUPPORTED	
            {name: 'Hungarian Male', flag: 'hu'},	
            {name: 'Icelandic Male', flag: 'is'},
            {name: 'Latin Male', flag: 'va'},   //DEPRECATED - NO LONGER SUPPORTED	
            {name: 'Latvian Male', flag: 'lv'},
            {name: 'Macedonian Male', flag: 'mk'},
            {name: 'Moldavian Male', flag: 'md'},
            {name: 'Montenegrin Male', flag: 'me'},
            {name: 'Norwegian Male', flag: 'no'},	
            {name: 'Serbian Male', flag: 'sr'},
            {name: 'Serbo-Croatian Male', flag: 'hr'},
            {name: 'Slovak Male', flag: 'sk'},   //DEPRECATED - NO LONGER SUPPORTED	
            {name: 'Swahili Male', flag: 'sw'},
            {name: 'Swedish Male', flag: 'sv'},   //DEPRECATED - NO LONGER SUPPORTED
            {name: 'Vietnamese Male', flag: 'vi'},   //DEPRECATED - NO LONGER SUPPORTED
            {name: 'Welsh Male', flag: 'cy'},
            {name: 'US English Male', flag: 'us'},//[195,169]}, original service is (temporary?) down
            {name: 'Fallback UK Female', flag: 'gb'}

        ];
        
        self.fallbackServicePath = 'https://code.responsivevoice.org/' + (self.tstCompiled()?'':'develop/') + 'getvoice.php';


        self.init = function() {


        self.getVoices = function () {

            //Create voices array

            var v = [];

            for (var i = 0; i < self.responsivevoices.length; i++) {
                v.push({name: self.responsivevoices[i].name});
            }

            return v;

        }


    }
    var responsiveVoice = new ResponsiveVoice();
}