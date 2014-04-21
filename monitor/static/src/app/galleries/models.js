App = App || {};

(function (App) {
  'use strict';
    var Models = {};

/* ## DiaryEvent Model ## --------------------------------------------------------- */
    Models.DiaryEvent = App.ModelBase.extend({
        defaults : {
            "id": null,
            "date": "",
            "time": "",
            "location": "",
            "description": "",
            "url": "",
        }
    });

/* ## Picture Model ## --------------------------------------------------------- */
    Models.Picture = App.ModelBase.extend({
        idAttribute: "_id",
        defaults : {
            "_id": "",
            "title": "",
            "description": "",
            "location": "",
            "position": "",
            "photo": "",
            "datetime": "",
            "status": "",
            "likes": "",
            "owner": null
        }
    });

/* ## Gallery Model ## --------------------------------------------------------- */

    Models.Gallery = App.ModelBase.extend({
        defaults : {
            "id": null,
            "title": "",
            "description": "",
            "published": "",
            "owner": "",
            "pictures": "",
            "likes": 0
        }
    });

    Models.Picture.prototype.urlRoot = window.PINS.CollectionURL;
    App.Models = Models;

}(App));