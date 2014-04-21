App = App || {};
App.Views = App.Views || {};

(function (App, $) {
    var Picture = {};

/*# ------- Pin single View ------- */
    Picture.PinView = App.ViewBase.extend({
        tagName : 'figure',
        template : 'pin',
        className: 'grid-item',

        initialize : function(){
            this.$container = $('body');
            this.render();
            this.listenTo(this.model, 'change', this.refresh);
        },
        events: {
            'click .image-holder': 'showDetail',
            'click .social-items .vamos-bien': 'addLike'
        },

        bindings: {
            // "span.count": "value:likes, events:['change']",
        },

        render: function(){
            var tmp = $( App.Renderer( this.template, this.model.toJSON()) );
            this.$el.append(tmp);
            this.$likes = this.$el.find('.vamos-bien .count');
            return this;
        },

        refresh:  function(){
            this.$likes.text( this.model.get('likes') );
        },

        showDetail: function() {
            this.modalView = new App.Views.Modals.PinDetailView( {model:this.model} );
            this.$container.append(this.modalView.$el);
            this.modalView.show();
        },

        addLike: function(e){
            e.preventDefault();
            e.stopPropagation();
            var computed_likes = parseInt(this.model.get('likes')) + 1;
            this.model.set( { "likes": computed_likes } );
            var data = {pk:this.model.id};
            App.execute("", "add_like", data, function(info){
                console.log(info);
            });
        }

    });

/*# ------- Grid View ------- */
    Picture.GridView = App.ViewBase.extend({
        tagName : 'section',
        className: 'dinamic-grid',
        events: {

        },

        initialize : function(){
            this.listenTo(this.collection,'add', this.addOne);
            var diary = new App.Collections.Diary();
            this.$diary = new App.Views.Diary.BoxView( {collection:diary} );
            this.$el.append(this.$diary.$el);
            this.render()
        },

        render: function(){
            this.collection.replenish();
            this.initGrid();
            this.initDiary()
            return this;
        },

        initDiary: function(){
            this.$diary.$area.show();
            this.$diary.$area.startslider({
                slideTransitionSpeed: 1000,
                slideTransitionEasing: "easeOutExpo",
                slidesDraggable: true,
                sliderResizable: true,
                showDots:false,
                slideTransitionDelay: 7000,
                sliderWidth: null,
                sliderHeight: '270px',
                showArrows: false,
                showPause: true,
                sliderKeepAspectRatio: false,
                sliderResizable: false
            });

        },

        initGrid: function(){
            this.$el.masonry({
              itemSelector: '.grid-item',
              gutter: 20,
              transitionDuration: '0s',
              isResizeBound:true,
              columnWidth: 'figure'
            });
            window.dispatchEvent(new Event('resize'));
        },

        addOne: function(pin){
            pin.view = new App.Views.Picture.PinView( {model:pin} );
            this.$el.append(pin.view.$el);
        }

    });

/*# ------- Twitter timeline View ------- */
    Picture.TweetListView = App.ViewBase.extend({
        tagName : 'footer',
        template : 'tweet_list',
        className: 'live-box',

        initialize : function(){
            this.render();
        },

        render: function(){
            var tmp = $( App.Renderer( 'tweet_list', {}) );
            this.$el.html(tmp);
            return this;
        },
    });

    Picture.Gallery = App.ViewBase.extend({
        tagName : 'li',
        template : 'todo',
        className: 'todo',
        events: {
            // 'click .edit-save': 'saveTodo',
            // 'change .toggle': 'toggleStatus',
            // 'click .edit': 'watch',
            // 'click .show-modal': 'activateModal',
            // 'click .delete': 'delete',
            // 'keypress .todo-title-edit': 'updateOnEnter'
        },

        initialize : function(){
        },

        render: function(){
            return this;
        }
    });

    App.Views.Picture = Picture;

}(App, jQuery));

