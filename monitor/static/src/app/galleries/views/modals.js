App = App || {};
App.Views = App.Views || {};

(function (App, $, Swiper) {
    var Modals = {};

/*# ------- Pin Detail View ------- */
    Modals.PinDetailView = App.ViewBase.extend({
        tagName : 'div',
        template : 'pin_detail',
        className: 'overlay overlay-contentscale',

        initialize : function(){
            this.render();
            this.$likes = this.$el.find('.go-good .count');
            this.listenTo(this.model, 'change', this.refresh);
        },

        events: {
            'click .overlay-close': 'hidden',
            'click .go-good': 'addLike'
        },

        refresh:  function(){
            this.$likes.text( this.model.get('likes') );
        },

        render: function(){
            var tmp = $( App.Renderer( this.template, this.model.toJSON()) );
            this.$el.append(tmp);
            return this;
        },
        show: function(){
            this.$el.removeClass('close');
            this.$el.addClass('open');
            this.$carousel = this.$el.find('.picture-tiles-container');
            this.$carousel.carouFredSel({
                circular: true,
                infinite: true,
                responsive: false,
                direction: "left",
                width: '100%',
                height: null,
                align: "center",
                padding: null,
                synchronise: null,
                cookie: false,
                onCreate: null,
                onTouch: true,
                scroll : {
                    items           : 2,
                    easing          : "linear",
                    duration        : 1000,
                    pauseOnHover    : true
                }
            });

        },

        hidden: function(){
            this.$el.removeClass('open');
            this.$el.addClass('close');
            this.remove();
        },

        addLike: function(e){
            e.preventDefault();
            e.stopPropagation();
            var computed_likes = parseInt(this.model.get('likes')) + 1;
            this.model.set( { "likes": computed_likes } );
            console.log(this.model.get('likes'));
        }

    });
    App.Views.Modals = Modals;
}(App, jQuery, Swiper));