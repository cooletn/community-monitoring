App = App || {};
App.Views = App.Views || {};

(function (App, $, Swiper) {
    var Diary = {};
/*# ------- Event View ------- */
    Diary.EventView = App.ViewBase.extend({
        tagName : 'div',
        template : 'diary_item',
        className: 'diary-item',

        initialize : function(){
            this.render();
        },

        render: function(){
            var tmp = $( App.Renderer( this.template, this.model.toJSON()) );
            this.$el.append(tmp);
            return this;
        }

    });

/*# ------- Diary View ------- */
    Diary.BoxView = App.ViewBase.extend({
        tagName : 'figure',
        className: 'grid-item diary diary-box',
        template: 'diary',

        initialize : function(){
            this.listenTo(this.collection,'add', this.addOne);
            this.render()
        },

        render: function(){
            var tmp = $( App.Renderer( this.template, {}) );
            this.$el.append(tmp);
            this.$area = this.$el.find('.diary-content');
            this.collection.replenish();
            return this;
        },

        addOne: function(evento){
            evento.view = new App.Views.Diary.EventView( {model:evento} );
            this.$area.append(evento.view.$el);
        }

    });

    App.Views.Diary = Diary;
}(App, jQuery, Swiper));