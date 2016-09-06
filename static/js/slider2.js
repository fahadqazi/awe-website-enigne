/**
 * Created by simba on 20/11/2014.
 */
$(document).ready(function () {
    var
        la,
        ld,
        lk,
        storage = $.localStorage,
        defaultamount = !storage.isEmpty('flf.amount') ? storage.get('flf.amount') : 1500,
        defaultduration = !storage.isEmpty('flf.duration') ? storage.get('flf.duration') : 6,
        setCookie = function (cname, cvalue, exdays) {
            var d = new Date();
            //d.setTime(d.getTime() + (exdays*24*60*60*1000));
            d.setTime(d.getTime() + (exdays * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            //console.log(expires);
            document.cookie = cname + "=" + cvalue + "; " + expires;
        },
        fillBowl = function (x) {

            if (x >= 0) {
                $("#slider-money-bowl").css("background-position", "0 0");
            }
            if (x >= 1000) {
                $("#slider-money-bowl").css("background-position", "0 -400px");
            }
            if (x >= 1500) {
                $("#slider-money-bowl").css("background-position", "0 -800px");
            }
            if (x >= 2000) {
                $("#slider-money-bowl").css("background-position", "0 -1200px");
            }
            if (x >= 2500) {
                $("#slider-money-bowl").css("background-position", "0 -1600px");
            }
            if (x >= 3000) {
                $("#slider-money-bowl").css("background-position", "0 -2000px");
            }
            if (x >= 3500) {
                $("#slider-money-bowl").css("background-position", "0 -2400px");
            }
            if (x >= 4000) {
                $("#slider-money-bowl").css("background-position", "0 -2800px");
            }
            if (x >= 4300) {
                $("#slider-money-bowl").css("background-position", "0 -3200px");
            }
            if (x >= 4500) {
                $("#slider-money-bowl").css("background-position", "0 -3600px");
            }
            if (x == 5000) {
                $("#slider-money-bowl").css("background-position", "0 -3600px");
            }
        },
        fillCapsule = function (x) {

            if (x >= 3) {
                $("#slider-capsule").css("background-position", "0 0");
            }
            if (x >= 6) {
                $("#slider-capsule").css("background-position", "0 -75px");
            }
            if (x >= 9) {
                $("#slider-capsule").css("background-position", "0 -150px");
            }
            if (x >= 12) {
                $("#slider-capsule").css("background-position", "0 -225px");
            }
            if (x >= 18) {
                $("#slider-capsule").css("background-position", "0 -300px");
            }
            if (x >= 24) {
                $("#slider-capsule").css("background-position", "0 -375px");
            }
            if (x >= 30) {
                $("#slider-capsule").css("background-position", "0 -450px");
            }
            if (x == 36) {
                $("#slider-capsule").css("background-position", "0 -600px");
            }
        };

    $("#amount").val("£" + defaultamount);
    $("#duration").val(defaultduration);

    //slider one
    $(".volume").slider({
        min: 100,
        max: 5000,
        value: defaultamount,
        //  value: 500,
        animate: true,
        range: 'min',
        step: 50,

        slide: function (event, ui) {
            $("#amount").val("£" + ui.value);
            //        la = $("#amount").val();
            la = ui.value;
            fillBowl(la);
            //  console.log(event);
            setCookie('la', la, 10);
            storage.set('flfamount', la);
            storage.set('ngStorage-amount', la);
        }
    });

//slider two
    $(".volume2").slider({
        min: 3,
        max: 36,
        value: defaultduration,
        //  value: 3,
        animate: true,
        range: 'min',
        step: 1,

        slide: function (event, ui) {
            $("#duration").val(ui.value + "");
            ld = ui.value;
            //     console.log(ld);
            fillCapsule(ld);
            //       la = $("#amount").val();
            setCookie('ldm', ld, 10);
            storage.set('flfduration', ld);
            storage.set('ngStorage-duration', ld);
        }
    });
});