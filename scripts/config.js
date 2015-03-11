requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'scripts/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min',
        game: 'game'
    }
});

// Start the main app logic.
requirejs(['jquery', 'domReady', 'game'],
function   ($, domReady, game) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
});