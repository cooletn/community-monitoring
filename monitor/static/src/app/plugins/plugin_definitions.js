 $(document).ready(function() {
    // Loading ready
    $("#loading").css('display','none');

    // /*Grid dinamics */
    // $(window).load( function() {
    //     $('.dinamic-grid').BlocksIt({
    //         numOfCol: 4,
    //         offsetX: 8,
    //         offsetY: 8,
    //         blockElement: 'figure'
    //     });
    //     $(window).resize();
    // });

    // //Window resize for Blocksit
    // var currentWidth = 1100;
    // $(window).resize(function() {
    //     var winWidth = $(window).width();
    //     var conWidth;
    //     var myMenu;
    //     var menuSlidesPerView;
    //     if(winWidth < 480) {
    //         conWidth = 460;
    //         col = 1;
    //     } else if(winWidth >= 480 && winWidth < 520) {
    //         conWidth = 500;
    //         col = 1;
    //     } else if(winWidth >= 520 && winWidth < 560) {
    //         conWidth = 540;
    //         col = 1;
    //     } else if(winWidth >= 560 && winWidth < 600) {
    //         conWidth = 580;
    //         col = 1;
    //     } else if(winWidth >= 600 && winWidth < 640) {
    //         conWidth = 620;
    //         col = 1;
    //     } else if(winWidth >= 640 && winWidth < 680) {
    //         conWidth = 660;
    //         col = 2;
    //     } else if(winWidth >= 680 && winWidth < 720) {
    //         conWidth = 700;
    //         col = 2;
    //     } else if(winWidth >= 720 && winWidth < 760) {
    //         conWidth = 740;
    //         col = 2;
    //     } else if(winWidth >= 760 && winWidth < 800) {
    //         conWidth = 780;
    //         col = 2;
    //     } else if(winWidth >= 800 && winWidth < 840) {
    //         conWidth = 820;
    //         col = 2;
    //     } else if(winWidth >= 840 && winWidth < 880) {
    //         conWidth = 860;
    //         col = 3;
    //     } else if(winWidth >= 880 && winWidth < 920){
    //         conWidth = 900;
    //         col = 3;
    //     } else if(winWidth >= 920 && winWidth < 960){
    //         conWidth = 940;
    //         col = 3;
    //     } else if(winWidth >= 960 && winWidth < 1000){
    //         conWidth = 980;
    //         col = 3;
    //     } else if(winWidth >= 1000 && winWidth < 1040){
    //         conWidth = 1020;
    //         col = 3;
    //     } else if(winWidth >= 1040 && winWidth < 1080){
    //         conWidth = 1060;
    //         col = 4;
    //     } else if(winWidth >= 1080 && winWidth < 1120){
    //         conWidth = 1100;
    //         col = 4;
    //     } else if(winWidth >= 1120 && winWidth < 1160){
    //         conWidth = 11;
    //         col = 4;
    //     } else if(winWidth >= 1160 && winWidth < 1200){
    //         conWidth = 1180;
    //         col = 4;
    //     } else if(winWidth >= 1200 && winWidth < 1240){
    //         conWidth = 1220;
    //         col = 4;
    //     } else if(winWidth >= 1240 && winWidth < 1280){
    //         conWidth = 1260;
    //         col = 5;
    //     } else if(winWidth >= 1280 && winWidth < 1320){
    //         conWidth = 1300;
    //         col = 5;
    //     }  else if(winWidth >= 1320 && winWidth < 1360){
    //         conWidth = 1340;
    //         col = 5;
    //     } else if(winWidth >= 1360 && winWidth < 1400){
    //         conWidth = 1380;
    //         col = 5;
    //     } else if(winWidth >= 1400 && winWidth < 1440){
    //         conWidth = 1420;
    //         col = 5;
    //     } else if(winWidth >= 1440 && winWidth < 1480){
    //         conWidth = 1460;
    //         col = 5;
    //     } else if(winWidth >= 1480 && winWidth < 1520){
    //         conWidth = 1500;
    //         col = 5;
    //     } else if(winWidth >= 1500){
    //         conWidth = 1500;
    //         col = 5;
    //     }

    //     if(conWidth != currentWidth) {
    //         currentWidth = conWidth;
    //         $('.dinamic-grid').width(conWidth);
    //         $('.dinamic-grid').BlocksIt({
    //             numOfCol: col,
    //             offsetX: 8,
    //             offsetY: 8
    //         });
    //     }
    // });
    myMenu = new Swiper('.tab-menubar',{
        pagination: '.pagination',
        paginationClickable: true,
        slidesPerView: 6,
        loop: true
    });

    // Dropzone Init
    var dropZone = $('.upload-box');

    // Camera Button Click event
    var cameraButton = $('.camera-button');
    cameraButton.on("click", function(e){
        e.preventDefault();
        dropZone.toggleClass('visible');
    });

    // Swiper Definitions
    var mySwiper = new Swiper('.swiper-container',{
        pagination: '.pagination',
        paginationClickable: true,
        loop: true,
        speed:500,
        autoplay: 5000,
        autoplayDisableOnInteraction:true
    });

    // var myDiary = new Swiper('.diary-content',{
    //     mode: 'vertical',
    //     loop: true,
    //     slidesPerView: 1,
    //     autoplay: 3000,
    //     speed: 1000
    // });

    var myPictureTiles = new Swiper('.picture-tiles-container',{
        paginationClickable: true,
        loop: true,
        slidesPerView: 5,
        autoplay: 3000,
        speed: 1000
    });

    // // GMap Definition
    // $('.map-box .map').gmap3({
    //     marker:{
    //         latLng:[48.8620722, 2.352047],
    //         data:"Algun Lugar"
    //     },
    //     map:{
    //         options:{
    //           zoom: 14
    //         }
    //     }
    // });

    // Toastr init Definition
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "positionClass": "toast-top-right",
        "onclick": null,
        "showDuration": "500",
        "hideDuration": "2000",
        "timeOut": "1000",
        "extendedTimeOut": "300",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    var $pluSlider = $(".plus-slider");
    $pluSlider.show();;
    $pluSlider.startslider({
        slideTransitionSpeed: 500,
        slideTransitionEasing: "easeOutExpo",
        slidesDraggable: true,
        sliderResizable: true,
        showDots:false,
        sliderWidth: '100%',
        showArrows: true,
        sliderResizable: false,
        sliderKeepAspectRatio: false,
        sliderHeight: '580px'
    });

    jQuery.fn.reset = function () {
      $(this).each (function() { this.reset(); });
    }


});