
var App = App || {};

App.Renderer =  App.Renderer || {};
App.Templates =  App.Templates || {};

(function(App, $, Backbone){

    /* ## App Dispatcher ## ------------------------------------------------- */

    App.url = "/static/src/app";

    App.dispatcher = _.clone(Backbone.Events);

    App.getCookie = function (name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
                }
            }
        }
        return cookieValue;
    }

    App.sameOrigin = function (url) {
        // test that a given url is a same-origin URL
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
        (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
        // or any other URL that isn't scheme relative or absolute i.e relative.
        !(/^(\/\/|http:|https:).*/.test(url));
    }

    App.populate = function(collection, url, context){
        console.log("Populating...");
        $.getJSON( url, function( data ) {
            $.each( data, function( key, val ) {
                collection.add( val );
            });
        });
        console.log("Populate Finished.");
    }

/* ## Templates Renderer ## ------------------------------------------------- */

/**
 * Sintaxis for Use:  App.Renderer( template_name, json_object)
 * @function
 * @param {string} templateName - template name with hbs extension, placed on url location
 * @param {object} context - context where this function is aplicated.
*/
    var Renderer = function(templateName, context){
        /* #TODO   namespace is the name of the actual namespace */

        if(App.Templates[templateName]===undefined){
           $.ajax({
                url:   '/static/src/app/templates/' + templateName + '.hbs',
                success: function (body) {
                    console.info('Template:  ' + templateName + ' loaded ...');
                    App.Templates[templateName] = Handlebars.compile(body);
                },
                async: false
            });
        }
        return App.Templates[templateName](context);
    }

    App.Renderer = Renderer;

    function RemoteExecute( url, method, data, callback) {
        var options = {
             url: url,
             method: method,
             data:data,
             callback:callback
        }

        // To use current path as url.
        // $.Pursuits(method, data, callback)
        if ( jQuery.isFunction(data) ) {
            options = {
                 url: '',
                 method: url,
                 data: method,
                 callback:data
            }
        }

        // Using current path as url, and no data
        // $.Pursuits(method, callback)
        if ( jQuery.isFunction(method) ) {
            options = {
                 url: '',
                 method: url,
                 data: {},
                 callback:method
            }
        }

        return jQuery.ajax({
                url: options.url,
                type: 'post',
                dataType: 'json',
                data: JSON.stringify(
                    {
                         method: options.method,
                         payload: options.data
                    }),
                success: options.callback
        });
    };

    App.execute = RemoteExecute

    function Iterator(argument) {
        this.initialize(argument);
    }

    Iterator.prototype = _.extend( Iterator, {
        _tree: null,      // here we will store our collection passed in constructor
        _stack: [],       // our stack for DFS
        options: {
            // these are options you can pass if your collection uses key than 'parentId'
            id_name: 'id',
            parent_name: 'parent'
        },

        initialize: function(tree, options) {
            this._tree = tree;
            this.reset();
        },

        reset: function() {
            var root = this;
            root._stack = [];
            // store lvl 0 backpoints into stack
            _.each(this._tree.models, function(model, index) {
                if (! _.isNumber( model.get(root.options.parent_name) ) ||
                      model.get(root.options.parent_name) == 0) {
                    root._stack.push( root.getBackpoint(0, index) );
                }
            });
        },

        getBackpoint: function(level, index) {
            return {
                level: level,
                index: index
            };
        },

        // returns an array of indexes of first descendants of element in tree
        getDescendants: function(model) {
            var root = this;
            var output = [];
            this._tree.each(function(emodel, key) {
                if (emodel.get(root.options.parent_name) == model.get(root.options.id_name))
                    output.unshift(key);
            });
            return output;
        },

        next: function() {
            var root = this;

            // get the first element from stack
            var bpoint = this._stack.shift();
            if (_.isUndefined(bpoint)) return null;

            var model = this._tree.at(bpoint.index);
            // if(!model.get("parentId")) return null;
            var desc = this.getDescendants(model);
            // prepend descendants to array (if any)
            _.each(desc, function(item) {
                root._stack.unshift( root.getBackpoint( bpoint.level+1, item) );
            });

            return model;
        }
    });

/* ## View Base ## ---------------------------------------------------------- */

    App.ViewBase = Backbone.Epoxy.View.extend({
        viewThree : function(){
            if (this.collection) {
                var iterator = new Iterator(this.collection);
                while ((item = iterator.next()) != null) {
                    console.log("#" + item.get('id') + " " + item.get('title'));
                }
            }
            else{
                console.log('This view do not have a collection');
            }
        },
    });


/* ## Model Base ## --------------------------------------------------------- */

     App.ModelBase = Backbone.Model.extend({
        context: {},
        parse: function (resp, xhr) {
           resp = _.extend({id: resp.pk}, resp.fields);

          if (!!resp.created && !!resp.modified) {
            resp.created = new Date(resp.created);
            resp.modified = new Date(resp.modified);
          }

          return resp;
        }
    });

/* ## Collection Base ## ---------------------------------------------------- */

    App.CollectionBase = Backbone.Collection.extend({
        // parse: function(resp){
        //     return resp.results;
        // }
    });

/* ## App Utilities ## ---------------------------------------------------- */
App.encode_utf8 = function(s) {
  return unescape(encodeURIComponent(s));
}

App.decode_utf8 = function(s) {
  return decodeURIComponent(escape(s));
}

/* ## App CSFR token setting ## --------------------------------------------- */

$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!/^(GET|HEAD|OPTIONS|TRACE)$/.test(settings.type) && App.sameOrigin(settings.url)) {
        // Send the token to same-origin, relative URLs only.
        // Send the token only if the method warrants CSRF protection
        // Using the CSRFToken value acquired earlier
           xhr.setRequestHeader( "X-CSRFToken", App.getCookie('csrftoken') );
        }
    }
});

/* ## Backbone Sync CSFR ## ------------------------------------------------- */

// var oldSync = Backbone.sync;
// Backbone.sync = function(method, model, options) {
//     // console.log(model.url);

//     options.beforeSend = function(xhr){
//         xhr.setRequestHeader('X-CSRFToken', App.getCookie('csrftoken') );
//     };
//     return oldSync(method, model, options);
// };

}(App, jQuery, Backbone));

