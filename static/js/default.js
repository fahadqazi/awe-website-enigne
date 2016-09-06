/**
 * Created by simba on 30/09/15.
 */
/*
 Creditextracash (c) 2013-2014
 */
cache ={
    domain: '/',
    failure_destination: 'http://decline.quiddicompare.co.uk/offers',
    spinner_colour: '#1C63B5',
    server: {
        pending: {},
        completed: {}
    },
    postcode: {
    }
} ;
observations = {
    start: (new Date).getTime(),
} ;
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function start_spinner( name, args) {

    if ( cache[name] !== undefined ) {
        cache[name].play() ;
    } else {
        cache[name] = Spinners.create( name, args ).play();
    }

}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function getQueryStringParameters( url ) {
    if ( url == undefined ) {
        url = window.location.href ;
    }
    var vars = { } ;
    var p = url.replace( /[?&]+([^=&]+)=([^&]*)/gi,
        function( m, key, value ) {
            vars[key.toLowerCase()] = value ;
        } ) ;
    return vars ;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function postcodePopulate( postcode, prefix, el ) {
    formattedPostcode = postcode.replace( / /g, '' ).toUpperCase() ;
    var address = cache.postcode[formattedPostcode][el.val()] ;
    for ( var key in address ) {
        $( 'INPUT[name="'+ prefix +'_'+ key +'"]' ).val( address[key] ) ;
        $( '#'+ $( 'INPUT[name="'+ prefix +'_'+ key +'"]' ).attr( 'id' ) +'-error' ).hide() ;
    }
    postcodeHideList() ;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function postcodeHideList() {
    $( 'div[class$="postcodepicker"]' ).parent().hide() ;
    $( 'div[class$="postcodepickerholder"]' ).parent().show() ;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// show the dropdown list populated with the current properties for that postcode.
//
function postcodeDisplayList( postcode, prefix ) {

    // empty the dropdown
    $( '#field-value-'+prefix+'postcodepicker' )
        .empty()
        .prop( "onchange", null )
        .on( 'change', function() {
            postcodePopulate( postcode, prefix, $( '#field-value-'+prefix+'postcodepicker' ) ) ;
            $('input[readonly]').each( function() {
                $( '#field-value-'+prefix+'postcode-error' ).hide() ;
            } ) ;
        } ) ;

    $( '#field-value-'+prefix+'postcodepicker' ).append( '<option></option>' ) ;
    for ( var i = 0; i < cache.postcode[postcode].length; i++ ) {
        $( '#field-value-'+prefix+'postcodepicker' ).append( '<option value="'+i+'">'+cache.postcode[postcode][i].address+'</option>' ) ;
    }
    $( 'div[class$="postcodepicker"]' ).parent().show() ;
    $( '#field-value-applicantpostcodepicker').addClass( 'field-look-at-me-ht' ) ;
    $( 'div[class$="postcodepickerholder"]' ).parent().hide() ;

}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Blank address fields
//
function blankAddressFields( prefix ) {

    $('INPUT[id*="field-value-'+ prefix +'"]').each( function() {
        if ( $(this).attr( 'id' ) != 'field-value-'+ prefix +'postcode' ) {
            $(this).val('')  ;
        }
    } ) ;

}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Postcode look-up logic.
//
function postcodeLookup( el, prefix ) {
    postcode = $(el).val() ;
    formattedPostcode = postcode.replace( / /g, '' ).toUpperCase() ;

    if ( observations[el.attr( 'name' )] == undefined ) {
        observations[el.attr( 'name' )] = {
            history: new Array
        } ;
    }

    if ( cache.postcode[formattedPostcode] != undefined ) {
        blankAddressFields( prefix ) ;
        postcodeDisplayList( formattedPostcode, prefix ) ;
        cache['.field-postcode-spinner'].pause() ;
        $( '.field-postcode-spinner' ).hide() ;
    } else {
        blankAddressFields( prefix ) ;
        observations[el.attr( 'name' )].history.push( postcode ) ;
        $.ajax( {
            url: cache.domain +'v1.0/api/postcode',
            data: { postcode: formattedPostcode },
            dataType: 'json',
            error: function( jqXHR, status, error ) { console.log( jqXHR, status, error ) ; },
            complete: function() {
                cache['.field-postcode-spinner'].pause() ;
                $( '.field-postcode-spinner' ).hide() ;
            },
            success: function( data, status, jqXHR ) {
                if ( data.count == 0 ) {
                    if ( '.'+ $( $(el).attr( 'id' ) +'formError' ).length == 0 ) {
                        $( '#field-value-'+ $('.field-postcode-button').attr('postcode_prefix') +'postcode-error').show() ;
                        $( 'div[class$="postcodepicker"]' ).parent().hide() ;
                        $( 'div[class$="postcodepickerholder"]' ).parent().show() ;
                    }
                } else {
                    cache.postcode[formattedPostcode] = data.address ;
                    if ( data.status == 'success' ) {
                        postcodeDisplayList( formattedPostcode, prefix ) ;
                    }
                }
            }
        } ) ;
    }
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Generic server side data validation check
//
function validateInputData( el, action, data ) {
    /*
     Don't do a check if there is no data to validate
     */
    if (data == undefined || data.data == '') {
        return ;
    }
    if ( cache.server.pending[action] == undefined ) {
        cache.server.pending[action] = {} ;
    }
    if ( cache.server.completed[action] == undefined ) {
        cache.server.completed[action] = {} ;
    }
    if ( observations[el.attr( 'name' )] == undefined ) {
        observations[el.attr( 'name' )] = {
            history: new Array
        } ;
    }
    /*
     Check the cache to see if we already have a result or if the result is currently being processed.
     */
    if ( cache.server.pending[action][data] != undefined ) {
//	console.log( 'pending', action, data ) ;
        return ;
    }
    if ( cache.server.completed[action][data] != undefined ) {
//	console.log( 'completed', action, data ) ;
        return ;
    }
    observations[el.attr( 'name' )].history.push( data.data ) ;
    cache.server.pending[action][data] = true ;
    el.attr( 'server-check-failed', 1 ) ;
    $.ajax( {
        url: cache.domain +'v1.0/api/'+action,
        data: data,
        error: function( jqXHR, status, error ) {
//	    console.log( jqXHR, status, error ) ;
        },
        success: function( d, status, jqXHR ) {
            if ( d.is_valid ) {
                el.removeAttr( 'server-check-failed' ) ;
                if ( d.pretty != undefined ) { el.val( d.pretty ) ; }
                observations[el.attr( 'name' )].area = d.area ;
            } else {
                var error_msg = $(el).attr('data-errormessage-custom-error') ;
                if ( error_msg == undefined ) error_msg = $(el).attr('data-errormessage-value-missing') ;
                $( '#'+ $(el).attr( 'id' ) +'-error').show() ;
                //$(el).removeClass( 'field-error-ht' ).addClass( 'field-error-ht' ) ;
            }
        },
        complete: function( d, status, jqXHR ) {
            cache.server.pending[action][data] = undefined
//	    console.log( 'removed server pending marker for '+ action +' & '+ data ) ;
        }
    } ) ;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function runValidationRule( name, rule ) {
    $( '#'+ name +'-error' ).hide() ;
    switch( rule ) {
        case 'required':
            if ( $( '#'+ name ).attr( 'type' ) ) {
                if ( $( '#'+ name ).attr( 'type' ) == 'checkbox' ) {
                    if( !$( '#'+ name ).is( ':checked' ) ) {
                        $( '#'+ name +'-error' ).show() ;
                    }
                } else {
                    var value = $( '#'+ name ).val() ;
                    if ( value.replace(/^\s\s*/, '').replace(/\s\s*$/, '') == '') {
                        $( '#'+ name +'-error' ).show() ;
                    }
                }
            } else {
                var value = $( '#'+ name ).val() ;
                if ( value.replace(/^\s\s*/, '').replace(/\s\s*$/, '') == '') {
                    $( '#'+ name +'-error' ).show() ;
                }
            }
            break ;
        case 'required,int':
            var value = parseInt( $( '#'+ name ).val(), 10 ) ;
            if ( isNaN( value ) ) {
                $( '#'+ name +'-error' ).show() ;
            } else {
                $( '#'+ name ).val( value ) ;
            }
            break ;
    }
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function runCollectiveDateValidationRule( name, rule ) {
    $( '#field-value-'+ rule +'-error' ).hide() ;
    if ( $( '#field-value-'+ rule +'-yyyy' ).val() == '' ||
        $( '#field-value-'+ rule +'-mm' ).val() == '' ||
        $( '#field-value-'+ rule +'-dd' ).val() == '' ) {
        return ;
    }
    test = new Date( $( '#field-value-'+ rule +'-yyyy' ).val(), $( '#field-value-'+ rule +'-mm' ).val() - 1, $( '#field-value-'+ rule +'-dd' ).val() ) ;
    if ( test.getDate() != $( '#field-value-'+ rule +'-dd' ).val() ||
        test.getMonth()+1 != $( '#field-value-'+ rule +'-mm' ).val() ||
        test.getFullYear() != $( '#field-value-'+ rule +'-yyyy' ).val() ) {
        $( '#field-value-'+ rule +'-error' ).show() ;
    }
    /* If working-day is set then make sure it is a working day*/
    working_day = $( '#'+ name +'[working-day]' ) ;
    if ( working_day.length > 0 ) {
        if ( test.getDay() == 0 || test.getDay() == 6 ) {
            $( '#field-value-'+ rule +'-error' ).show() ;
            return false ;
        }
    }
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function runValidationRegEx( name, rule ) {
    $( '#'+ name +'-error' ).hide() ;
    var pattern = new RegExp( rule, 'i');
    if ( !pattern.test( $( '#'+ name ).val() ) ) {
        $( '#'+ name +'-error' ).show() ;
    }
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Load actions against the various form elements
//
function loadForm() {
    /*
     Get the language parameter value form the query string of the javascript link
     */
    var scriptQueryString = {
        lang: 'en',
        params: 'sw='+ window.innerWidth
    } ;

    if ( typeof qqstr == 'string' ) {
        if ( qqstr != '' ) {
            scriptQueryString['params'] = scriptQueryString['params'] +'&'+ qqstr ;
        }
    }

    var scripts = document.getElementsByTagName( 'script' );
    for( var i=0, script; script=scripts[i]; i++ ) {
        if ( script.src.indexOf( 'default.js' ) !== -1 ) {
            $.extend( scriptQueryString, getQueryStringParameters( script.src ) ) ;
        }
    }
    // Get the parameters from the query string as we might need to load affiliate Id and tracking id information
    var queryString = getQueryStringParameters() ;
    // populate the form form the server
    $.ajaxSetup( { cache: true } ) ;
    $.ajax( {
        url: cache.domain +'default.html?lang='+ scriptQueryString['lang'].toLowerCase() +'&'+ scriptQueryString['params'],
        success: function( data, textStatus, jqXHR ) {
            // add the css and the validation engine css file
            $("head").append( '<link rel="stylesheet" type="text/css" href="'+ cache.domain +'css/default.css" media="all">' ) ;
            //add the formdata passed back by the server to the div with the ID populate-form-container
            $('.populate-form-container').hide().html( data ) ;
            // add the validation script for the specific language
            $.getScript( cache.domain +'js/spinners.min.js' ).done( function() {
                // turn the place holder on and the dropdown off
                $('div[class$="postcodepicker"]').change( ).parent().hide() ;
                $('div[class$="postcodepickerholder"]').parent().show() ;
                $('.populate-form-container').show() ;
                // ensure the validation processing fires when the user clicks submit
                $('#application-form').submit( function() {

                    $('[validation-rule]').trigger( 'blur' ) ;
                    $('[validation-regex]').trigger( 'blur' ) ;
                    $('[collective-date-validation-rule]').trigger( 'blur' ) ;
                    var errors = $('.field-error').filter(':visible') ;
                    if ( errors.length > 0 ) {
                        console.log( 'scrolling to '+ $( errors[0] ).position().top ) ;
                        $( 'body' ).scrollTop( $( errors[0] ).position().top );
                        return false ;
                    }

                    //$('input').removeClass( 'field-error-ht' ) ;
                    observations.duration = (new Date).getTime() - observations.start ;
                    $.ajax( {
                        url: '/submit',
                        dataType: 'json',
                        timeout: 360000,
                        type: 'POST',
                        contentType: 'text/plain',
                        data: JSON.stringify( {
                            form: $('#application-form').serializeArray(),
                            observations: observations,
                            tracking: queryString['said'] || queryString['t'] || scriptQueryString['t'],
                            affiliate: scriptQueryString['a']
                        } ),
                        success: function( data, textStatus, jqXHR ) {
//			    console.log( data ) ;
                            if ( data.success ) {
                                if ( data.redirect_url != undefined ) {
                                    if ( data.price < 0 ) {
                                        $(document.body).append( '<iframe src="/wp-content/tracking_decline.html"></iframe>') ;
                                    } else {
                                        $(document.body).append( '<iframe src="/wp-content/tracking_accept.html?p='+ data.price +'"></iframe>') ;
                                    }
                                    setTimeout( function() {
                                        window.location = data.redirect_url ;
                                    }, 5000 ) ;
                                }
                            } else {
                                window.location = cache.failure_destination ;
                            }
                        },
                        error: function( jqXHR, textStatus, errorThrown ) {
                            console.log( 'error', jqXHR, textStatus, errorThrown ) ;
                            window.location = cache.failure_destination ;
                        },
                        complete: function( jqXHR, textStatus, errorThrown ) {
                            console.log( 'complete', jqXHR, textStatus, errorThrown ) ;
//			    window.location = cache.failure_destination ;
                        },
                        beforeSend: function() {
                            start_spinner( '#r-spinner', {
                                radius: 34,
                                height: 15,
                                width: 8,
                                dashes: 15,
                                opacity: 1,
                                padding: 1,
                                rotation: 1550,
                                color: cache.spinner_colour
                            } ) ;
                            $('#r-redirecting').show() ;
                        }
                    } ) ;
                    return false ;
                } ) ;

                // add a call to any element that has a validation-rule attribute
                $( '[data-cleanse]' ).blur( function() {
                    val = $( this ) .val() ;
                    rx = new RegExp( $( this ).attr( 'data-cleanse' ), 'ig' ) ;
                    $( this ).val( val.replace( rx, '') ) ;
                } ) ;
                $( '[validation-rule]').blur( function() {
                    runValidationRule( $( this ).attr( 'id' ), $( this ).attr( 'validation-rule' ) ) ;
                } ) ;
                $( '[validation-regex]' ).blur( function() {
                    runValidationRegEx( $( this ).attr( 'id' ), $( this ).attr( 'validation-regex' ) ) ;
                } ) ;
                $( '[collective-date-validation-rule]' ).blur( function() {
                    runCollectiveDateValidationRule( $( this ).attr( 'id' ), $( this ).attr( 'collective-date-validation-rule' ) ) ;
                } ) ;
                // add a generic ajax call to any element that has a service-validation attribute
                $('input[server-validation]').blur( function() {
                    var data = {
                        data: $(this).val(),
                        cc: $(this).attr( 'cc' )
                    } ;
                    if ( $(this).val() != '' ) {
                        $( '#'+ $(this).attr( 'id' ) +'-error' ).hide() ;
                        validateInputData( $(this), $(this).attr('server-validation'), data ) ;
                    }
                } ) ;
                // add a call to the postcode look-up button
                $('#field-value-applicantpostcode').blur( function() {
                    //sparkle( '.field-postcode-button' )
                    $('.field-postcode-button').addClass( 'field-look-at-me-ht' ) ;
                } ) ;
                // if someone changes the pastcode afterwards then clear the fields down
                $('#field-value-applicantpostcode').change( function() {
                    //sparkle( '.field-postcode-button' )
                    var prefix = $('.field-postcode-button').attr('postcode_prefix') ;
                    blankAddressFields( prefix ) ;
                    postcodeHideList() ;
                } ) ;
                // add a call to the postcode look-up button
                $('.field-postcode-button').click( function() {
                    $('.field-postcode-button').removeClass( 'field-look-at-me-ht' ) ;
                    var prefix = $('.field-postcode-button').attr('postcode_prefix') ;
                    var pc = $('input[name="'+prefix+'_postcode"]') ;
                    if ( $(pc).val() == '') {
                        postcodeHideList() ;
                    } else {
                        start_spinner( '.field-postcode-spinner', {
                            radius: 6,
                            height: 3,
                            width: 3,
                            dashes: 10,
                            opacity: 1,
                            padding: 1,
                            rotation: 750,
                            color: cache.spinner_colour
                        } ) ;
                        $( '.field-postcode-spinner' ).show() ;
                        postcodeLookup( $(pc), prefix ) ;
                    }
                } ) ;
            } ) ;

        }
    }) ;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// initialise
$ = window.jQuery ;
$( document ).ready( function() {
    if ( $('.populate-form-container').length > 0 ) {
        loadForm() ;
    }
} ) ;