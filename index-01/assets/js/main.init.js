$(document).ready(function(){


    $( ".pdfclick" ).click(function() {
         $(".abs").toggleClass("green");
         $(".pdfclick").toggleClass("colorG");
    });

    window.resizeTo(1024, 768+(window.outerHeight-window.innerHeight));
        
    $(document).on('touchmove',function(e){
        e.preventDefault();
    });

    $(document).on('touchstart', '.scroller', function(e){
        this.startScrollY = e.originalEvent.touches[0].screenY;
        this.mayScroll = false;
    });

    $(document).on('touchmove', '.scroller', function(e){
        if (this.mayScroll == false)
        {
            var iDelta = (this.startScrollY - e.originalEvent.touches[0].screenY);

            if (this.scrollTop == 0 && iDelta < 0) /* allready on top */
            {
                return;
            }
            else if ((this.scrollTop+this.clientHeight) == this.scrollHeight && iDelta > 0) /* allready on bottom */
            {
                return;
            }
            else
            {
                this.mayScroll = true;
            }
        }

        e.stopPropagation();
    });

    /* nav buttons tap */
    menu.init();

    /* footer buttons tap */
    $('footer').on('tap', 'img', function(){
        var iPageNr = $(this).data('page-nr');
        page.show(iPageNr);
    });

    /* dummy buttons tap */
    $('div#content').on('tap', '.btn-dummy[data-page-nr]', function(e){
        e.stopPropagation();

        var iPageNr = $(this).data('page-nr');
        page.show(iPageNr);
    });
        
    page.init();
    //page.show(3);
    page.show(1);

    /*$(".various").fancybox({
            maxWidth    : 900,
            maxHeight   : 700,
            fitToView   : false,
            width       : '80%',
            height      : '80%',
            autoSize    : false,
            closeClick  : false,
            openEffect  : 'none',
            closeEffect : 'none'
    });*/

    function getCurrent() {
        var r = $('body').attr("id");
        var c = r.split("-");
        var current = c[2];
        return int.Parse(current);
    }

    $("body").swipe({
        swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
            //var current = $(".active").attr("data-page-nr");
                var r = $('body').attr("id");
                var c = r.split("-");
                var current = c[2];
                var to;

                switch (direction) {
                        case "left":
                            to = parseInt(current) + 1;
                            
                            //alert(current+" "+to+" ");
                            page.show(to);                            
                            break;

                          case "right":
                              to = parseInt(current) - 1;
                              //alert(current + " " + to + " " );

                                page.show(to);  
                                break;

                          case "up":
                          case "down":
//                                var current = Simponi.navigator.current;
//                                current.main_menu_active || $(".main_menu, .footer").toggleClass("hidden");
            }
        },

        excludedElements: $.fn.swipe.defaults.excludedElements + ", .noswipe, #highcharts-container, .overview_container, .scrollbox, #overlay",
        treshold: "50px",

    });

    $('body').on('swipe', function(){
        //console.log($('div.page.active').attr('id'));
        
        if($('div.page.active').attr('id') == 'page-4'){
            $('div#sl4_yellow').animate({width: 'show'}, 1500);

        }else{            
            $('#sl4_yellow, .sl6_arrows, #sl4_geen').hide();
            $('#sl4_arrow1').css({'top' : '187px', 'left' : '200px'});
            $('#sl4_arrow2').css({'top' : '170px', 'left' : '280px'});
            $('#sl4_arrow3').css({'top' : '167px', 'left' : '540px'});
            $('#sl4_arrow4').css({'top' : '172px', 'left' : '430px'});
            $('#sl4_arrow5').css({'top' : '170px', 'left' : '660px'});
            $('#sl4_arrow6').css({'top' : '170px', 'left' : '770px'});
        }

        if($('div.page.active').attr('id') != 'page-3'){
            $('#p4_green p').animate({'color' : '#af171a'}, 1);
            $('.p4_arrows img, .p4_middle, #p4_green').hide();
        }

        $('.p4_submenu').hide();
    });

    $('#content div#page-4').on('tap', function(){
        $('.p4_arrows img').slideDown(1000);

        setTimeout(function(){          
            $('.p4_middle').fadeIn(700);
            $('#p4_green').fadeIn(1200);
        } , 500);

        setTimeout(function(){
            $('#p4_green p').animate({          
                'color' : '#008d70'
            }, 1000);
        }, 1000);
    });

    $('#content div#page-6').on('tap', function(){
        $('#sl4_geen').animate({width: 'show'}, 3000);        
        setTimeout(function(){ $('#sl4_arrow1').animate({'top' : '130px', 'left' : '150px'}, 900); }, 800);
        setTimeout(function(){ $('#sl4_arrow2').animate({'top' : '210px', 'left' : '170px'}, 900); }, 1200);
        setTimeout(function(){ $('#sl4_arrow3').animate({'top' : '250px', 'left' : '230px'}, 900); }, 1800);
        setTimeout(function(){ $('#sl4_arrow4').animate({'top' : '290px', 'left' : '380px'}, 900); }, 2200);
        setTimeout(function(){ $('#sl4_arrow5').animate({'top' : '290px', 'left' : '510px'}, 900); }, 2600);
        setTimeout(function(){ $('#sl4_arrow6').animate({'top' : '265px', 'left' : '680px'}, 900); }, 3000);
        
    });

    $('#content div#page-8').on('tap', function(){
        $('#p8_i2').animate({width: 'show'}, 2000);
    });
               
});
