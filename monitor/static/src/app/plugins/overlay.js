(function($) {
    var $container = $( 'body' ),
        $triggerBttn = $( 'figure.grid' ),
        $overlay = $( '.overlay' ),
        $closeBttn = $overlay.find( 'button.overlay-close' );
        transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        },
        transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
        support = { transitions : Modernizr.csstransitions };

    function toggleOverlay() {

        if( $overlay.hasClass( 'open' )) {
            console.log("Abierto");
            $overlay.removeClass( 'open' );
            $container.removeClass( 'overlay-open' );
            var onEndTransitionFn = function( ev ) {
                if( support.transitions ) {
                    if( ev.propertyName !== 'visibility' ) return;
                    this.off( transEndEventName, onEndTransitionFn );
                }
                $overlay.removeClass( 'close' );
            };
            if( support.transitions ) {
                $overlay.on( transEndEventName, onEndTransitionFn );
            }
            else {
                onEndTransitionFn();
            }
        }
        else if( !$overlay.hasClass( 'close' ) ) {
            console.log("cerrado");
            $overlay.addClass( 'open' );
            $container.addClass( 'overlay-open' );
        }
    }

    $triggerBttn.on( 'click', toggleOverlay );
    $closeBttn.on( 'click', toggleOverlay );
})(jQuery);