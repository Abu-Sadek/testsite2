$(document).ready(function()
{
        $( ".pdfclick" ).click(function() {
             $(".abs").toggleClass("green");
             $(".pdfclick").toggleClass("colorG");
          });
	window.resizeTo(1024, 768+(window.outerHeight-window.innerHeight));
        
	$(document).on('touchmove',function(e)
	{
		e.preventDefault();
	});

	$(document).on('touchstart', '.scroller', function(e)
	{
		this.startScrollY = e.originalEvent.touches[0].screenY;
		this.mayScroll = false;
	});

	$(document).on('touchmove', '.scroller', function(e)
	{
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
	$('footer').on('tap', 'img', function()
	{
		var iPageNr = $(this).data('page-nr');
		page.show(iPageNr);
	});

	/* dummy buttons tap */
	$('div#content').on('tap', '.btn-dummy[data-page-nr]', function(e)
	{
		e.stopPropagation();

		var iPageNr = $(this).data('page-nr');
		page.show(iPageNr);
	});
        
	page.init();
	//page.show(3);
	page.show(3);
	
	$(".various").fancybox({
                    maxWidth	: 900,
                    maxHeight	: 700,
                    fitToView	: false,
                    width		: '80%',
                    height		: '80%',
                    autoSize	: false,
                    closeClick	: false,
                    openEffect	: 'none',
                    closeEffect	: 'none'
            });
        
        
            $("body").swipe({
                        swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                                var r = $('body').attr("id");
                                var c = r.split("-");
                                var current = c[2];
                                alert(current);
                                switch (direction) {
                                        case "left":
                                        if((current > 1)  )
                                        {
                                                var to = parseInt(current) + 1;
                                        }
									
                                        page.show(to); 
                                break;

                              case "right":
                                        if((current > 2) && (current < 244))
                                        {
                                        var to = parseInt(current) - 1;
                                        }
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
        
	
});