requirejs.config({
    //By default load any module IDs from scripts
    baseUrl: 'scripts',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min',
        game: 'lib/game',
        domReady: 'lib/domReady',
        bootstrap: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min'
    }
});

// Start the main app logic.
requirejs(['jquery', 'domReady', 'game', 'bootstrap'],
function   ($, domReady, game, bootstrap) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
});