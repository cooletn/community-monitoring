App = App || {};
(function (App,$) {

  // App.fixtures = App.url + "/fixtures.json";

  App.init = function(){

    console.log("Initializing Application...");

    var $wrapper = $('.wrapper-grid');

    var pictureList = new App.Collections.Pictures();
    var pictureListView = new App.Views.Picture.GridView( {collection:pictureList} );



    var tweetList = new App.Views.Picture.TweetListView();
    // console.log("----- TweetListView -----");
    // console.log(tweetList);

    $wrapper.append(pictureListView.$el);
    $wrapper.append(tweetList);

    console.log("Application Initialized.");


    window.LISTA = pictureListView;
  }
}(App, jQuery));

