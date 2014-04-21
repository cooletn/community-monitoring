App = App || {};

(function (App, $) {
  'use strict';

    var Collections = {};

/* ## Pictures Collection ## ------------------------------------------------ */
    Collections.Pictures = App.CollectionBase.extend({
        model : App.Models.Picture,
        initialize: function(){
            // this.replenish();
        },
        replenish:  function(){
            self = this;
            if (window.PINS) {
                $.each( window.PINS, function( index, pin ) {
                    var params = {
                        _id: pin.id,
                        title: pin.title,
                        description: pin.description,
                        location: pin.location,
                        position: pin.position,
                        photo: pin.photo,
                        photo_ldpi: pin.photo_ldpi,
                        photo_mdpi: pin.photo_mdpi,
                        photo_hdpi: pin.photo_hdpi,
                        photo_xhdpi: pin.photo_xhdpi,
                        photo_xxhdpi: pin.photo_xxhdpi,
                        datetime: pin.datetime,
                        status: pin.status,
                        likes: pin.likes,
                        owner: pin.owner
                    };
                    self.add( new App.Models.Picture(params) );
                });
            } else {
                console.error("Not have the PINS definition for the replenish");
            }
        }

    });

/* ## Diary Event Collection ## -------------------------------------------------- */
    Collections.Diary = App.CollectionBase.extend({
        model : App.Models.DiaryEvent,
        initialize: function(){
            // thi.populate();
        },

        populate: function(){
            App.populate(this, App.url + "/galleries/fixtures/diary.json");
        },

        replenish:  function(){
            self = this;
            if (window.EVENTS) {
                moment.lang('es_BO');
                $.each( window.EVENTS, function( index, ev ) {
                    var params = {
                        _id: ev.id,
                        date: App.decode_utf8(moment(ev.date, "YYYYMMDD").fromNow()),
                        time: ev.time,
                        location: ev.location,
                        description: ev.description,
                        url: ev.url
                    };
                    self.add( new App.Models.DiaryEvent(params) );
                });
            } else {
                console.error("Not have the EVENTS definition for the replenish");
            }
        }
    });


/* ## Galleries Collection ## -------------------------------------------------- */
    Collections.Galleries = App.CollectionBase.extend({
        model : App.Models.Gallery
    });

    Collections.Pictures.prototype.url = window.PINS.CollectionURL;

    App.Collections = Collections;

}(App, jQuery));