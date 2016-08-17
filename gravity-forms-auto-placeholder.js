// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;( function( $, window, document, undefined ) {

    "use strict";

        var pluginName = "gravityFormsPlaceholders",
            defaults = {
            };

        function Plugin( element, options, id )
        {
            this.id = id;
            this.element = element;
            this.settings = $.extend( {}, defaults, options );
            this._defaults = defaults;
            this._name = pluginName;

            this.init();
        }

        $.extend( Plugin.prototype, {

            init: function()
            {   
                // setup data
                this.$form = this.getForm();
                this.$fields = this.getFields();

                this.createPlaceholders();

                this.attachListeners();
            },

            createPlaceholders: function()
            {
                $.each(this.$fields, function(i, field) {
                    var $label = $( $(field).find('.gfield_label') );
                    var $input = $( $(field).find('.ginput_container input') );

                    $input.attr('placeholder', $label.text() );
                });
            },

            getForm: function()
            {
                return $(this.element).find('form');
            },

            getFields: function()
            {
                return $(this.element).find('.gfield');
            },

            attachListeners: function()
            {
                var self = this;
                
                $(document).on('gform_post_render', function(e, formId) {
                    self.init();
                });
            },
        } );

        // A really lightweight plugin wrapper around the constructor,
        // preventing against multiple instantiations
        $.fn[ pluginName ] = function( options ) {
            var id = 0;
            return this.each( function() {
                if ( !$.data( this, "plugin_" + pluginName ) ) {
                    $.data( this, "plugin_" +
                        pluginName, new Plugin( this, options, id ) );

                    id++;
                }
            } );
        };
} )( jQuery, window, document );
