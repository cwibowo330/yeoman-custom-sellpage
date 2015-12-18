$(function() {

    // TFN functionality
    thisProductName = 'mhc';

    if(beachbodyGlobal.isAffiliatePage()) {
        $('div.phn').hide();
        thisPhoneNum = 'none';
    } else {
        thisPhoneNum = "1 (800) 573-7316";

        $(window).on('load resize', function() {
            var phoneSection = $('.phoneSection');
            $(phoneSection).empty();
            if ( $(window).width() < 960)  {
                $(phoneSection).html('<strong class="prdPhone">To order call <a href="tel:' + thisPhoneNum + '">' + thisPhoneNum + '</a></strong>');
            } else {
                $(phoneSection).html('To order call: <strong class="prdPhone"><a href="tel:' + thisPhoneNum + '">' + thisPhoneNum + '</a></strong>');
            }
            $(phoneSection).show();
        });
    }


    //** Handle of our social medial set ups

    var vanityUrl = "https://www.facebook.com/TheMastersHammerandChisel",
        socialImage = window.location.protocol + "//" + "img1.beachbodyimages.com/beachbody/image/upload/bbweb/hammerchisel/mhc-social-share.jpg",
        fbT = "The Master's Hammer and Chisel",
        fbD = "Sculpt The Ultimate Physique",
        twUrl = "https://twitter.com/TheHammerChisel",
        twText = "#",
        mhcObj = {

            fbLikeColorScheme: 'dark',
            fbUrl: vanityUrl,
            fbTitle:fbT,
            fbsSummary:fbD,
            fbsImage:socialImage,

            twUrl:twUrl,
            twText:twText,

            poUrl:"https://plus.google.com/111683004387943839485/about",

            piUrl:"http://pinterest.com/beachbody",
            piDescription:fbD,
            piImage: socialImage,

            ytChannel:"BeachbodyVideo",

            insURL:"http://instagram.com/TheHammerChisel"

        };


    beachbodyGlobal.buildSocialIcons("socialIcons",mhcObj);

    var socialToggle = $('#socialToggle'),
        socialIcons = $('#socialIcons'),
        socialList = $('#socialIcons ul');

    // Set right position of socialToggle to align with right side of container
    $(window).on("load resize", function() {
        if ($(window).width() >= 960) {
            var rightSpace = ( ($(window).width() - 960) / 2);
            $(socialList).css('right', rightSpace + 'px');

        } else {
            $(socialList).css('right', '0');
            $(socialList).removeClass('show');
        }
    });

    // Toggle social icons for >768
    $(socialToggle).click( function(e) {
        console.log('social click');
        e.stopPropagation();
        $(socialIcons).toggleClass('show');
    });

    //video playing
    var bc_params = {},
        vidThumb = $('#mhcVideo-watch');

    bc_params["id"] = "myExperience3";
    bc_params["bgcolor"] = "#000000";
    bc_params["width"] = vidThumb.width();
    bc_params["height"] = vidThumb.height();
    bc_params["playerId"] = 803641409001;// 61732233001;
    bc_params["@videoPlayer"] = 4642787033001;
    bc_params["dynamicStreaming"] = true;
    bc_params["autoStart"] = true;
    bc_params["replayable"] = true;
    beachbodyGlobal.playBrightcoveVideo("player", bc_params, "mhcVideo-watch");

    $(vidThumb).click(function() {
        console.log('video');
        var vidThumb = $('#mhcVideo-watch');
        $('#myExperience3').css('height', vidThumb.height());
        $('#player').css('height', vidThumb.height());
    });

    //SLIDER
    simpleSlider({
        slideTemplate: '#slide-template',
        sliderViewport: '#slider-viewport',
        allSlides: '#all-sliders',
        leftNav: '.left-button',
        rightNav: '.right-button',
        jsonURL: '/text/us/products/programs/hammerchisel/display/control/js/mhc-success-stories.json'
    });
	
    function replaceimages(){
        mywindow = $(window).width();
        console.log(mywindow);
        $('.carousel-slide img').each(
            function() {
                if(mywindow >= 768){
                    mysrc = this.src.split('_');
                    this.src = this.src.replace(mysrc[1],'960.png');
                }
                if(mywindow <= 767){
                    mysrc = this.src.split('_');
                    console.log(mysrc);
                    this.src = this.src.replace(mysrc[1],'667.png');
                }
                if(mywindow < 480){
                    mysrc = this.src.split('_');
                    this.src = this.src.replace(mysrc[1],'375.png');
                }
            });
    }

    function respImg(isWidth, toWidth) {
        $('img.w' + isWidth).each(function() {
            var fileExt = $(this).attr('src').split('.').pop(),
                rootSrc = $(this).attr('src').slice(0, -8);
            console.log(rootSrc);
            $(this).attr('src', rootSrc + '-' + toWidth + '.' + fileExt).removeClass('w' + isWidth).addClass('w' + toWidth);
        });
    }

    function setRespImg() {
		
        if ( $(window).width() >= 480 ) {
            respImg(375,667);
        }
        if ( $(window).width() >= 736 ) {
            respImg(667,960);
        }
        if ( $(window).width() <= 479 ) {
            respImg(960,375);
            respImg(667,375);
        }
    }

    $(window).on('load resize', function() {
        setRespImg();
		replaceimages();
        if ( $(window).width() >= 736 ) {
            setTimeout(function () {
                $('.hero-trainers').fadeIn()
            }, 50);
        }
    });

    //Modals

    var modalBG = $('#modal-bg'),
        modalTrigger = $('.modal'),
        modal = $('#modal-container'),
        modalClose = $('.modal-close');

    function showmodalBG(selector) {
        console.log('show modalBG');
        $(modalBG).show();
        $(modalBG).css({height:$(document).height()});
    }

    var topSpace = $(function() {
        if ( $(window).width() <= 959 ) {
            topSpace = 45;
        } else {
            topSpace = 100;
        }
    });

    function buildContentmodal(selector) {
        $('div[id="' + selector + '"]').show();
        modal.show().css({top: $(document).scrollTop() + topSpace});
    }

    function closemodal() {
        modalBG.hide();
        modal.hide();
        modal.children('div').hide();
    }

    $(modalBG).click(function(e) {
        e.preventDefault();
        closemodal();
    });

    $(modalClose).click(function(e) {
        e.preventDefault();
        closemodal();
    });

    $(modalTrigger).click(function(e) {
        var selector = $(this).attr('data-trigger');
        console.log('modal click');
        console.log(selector);
        e.preventDefault();
        showmodalBG();
        buildContentmodal(selector);
    });

    // Switch Free Shipping Banner based on date
    function switchBanner() {

        /*
        // USE THESE VARIABLES TO TEST BANNER SWITCHING
         var today = new Date(),
         dd = 1,
         mm = 1,
         yyyy = 2016,
         banner = $('#shipping-banner .container');
        */

        var today = new Date(),
            dd = today.getDate(),
            mm = today.getMonth()+1,
            yyyy = today.getFullYear(),
            banner = $('#shipping-banner .container');

        console.log('dd is ' + dd + ', mm is ' + mm + ', yyyy is ' + yyyy);

        if ( dd >= 1 && mm===12 && yyyy===2015) {
            banner.html('Order By 12/14 <span>For Delivery Before Christmas!<sup>&Dagger;</sup></span>');
        }

        if ( dd >= 15 && dd < 22 && mm===12 && yyyy===2015) {
            banner.html('Order By 12/21 <span>For Delivery Before The New Year!<sup>&Dagger;</sup></span>');
        }

        if ( dd >= 22 && mm===12 && yyyy===2015) {
            banner.html('Free Shipping*&mdash;<span>For A Limited Time Only!</span>');
        }

        if ( mm===1 && yyyy===2016) {
            banner.html('Free Shipping*&mdash;<span>For A Limited Time Only!</span>');
        }

    }

    switchBanner();

    // Lazy load inline and background images
    $(".lazyLoad").lazyload({
        effect : "fadeIn",
        skip_invisible : false,
        placeholder: "//img1.beachbodyimages.com/beachbody/image/upload/bbweb/common/emptypixel.png",
        threshold: 50
    });

});