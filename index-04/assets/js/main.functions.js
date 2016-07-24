var page = {

	cur: 0,
	prev: 0,

	/**
	 *
	 *
	 */
	init: function()
	{
		var sHtml = '';
		var first = true;
	},

	/**
	 *
	 *
	 */
	show: function(iPageNr){
	    var gc = function() {
	        var r = $('body').attr("id");
	        if (!r)
	            return null;
	        var c = r.split("-");
	        var current = c[2];
	        return parseInt(current) ;
	    }
	    var curr = gc();
	    if (curr) {
	        var icurr = parseInt(curr);
	        var inew = parseInt(iPageNr);
	        if (icurr == inew)
	            return;
	        if (inew < 1 || inew > 9)
	            return;
	        var $current = $('div.page.active');
	        var $target = $('div#page-' + iPageNr);

	        var currLeft, currAnimate, newLeft, newAnimate;

	        if (icurr < inew)
	        {
	            //console.log('moving to next');
	            currAnimate = '-1024px';
	            currLeft = '0px';
	            newLeft = '1024px';
	            newAnimate = '0px';
	            for(var i=curr+1;i<inew;++i)
	                $('div#page-' + i + '').css({ display: 'block', left: currAnimate });
	        }
	        else
	        {
	            //console.log('moving to prev');
	            currAnimate = '1024px';
	            currLeft = '0px';
	            newLeft = '-1024px';
	            newAnimate = '0px';
	            for (var i = inew+1; i < curr; ++i)
	                $('div#page-' + i + '').css({ display: 'block', left: '' + currAnimate });
            }

	        $('div#page-' + inew + '').css({ 'display': 'block', left: ''+newLeft });
	        $('div#page-' + curr + '').css({ 'display': 'block', left: ''+currLeft });
	        $('div#page-' + iPageNr + '').animate({ left: newAnimate }, 1000);


	        $('div#page-' + curr + '').animate({ left: currAnimate }, {
	            duration: 1000,
	            complete: function () {
	                $('body').attr('id', 'cur-page-' + iPageNr);

	                var p = (__pages[iPageNr] || false);

	                $('div#page-' + curr + '').css({ 'display': 'none' });

	                page.prev = page.cur;
	                page.cur = iPageNr;
	                //console.log('Switch from page ' + page.prev + ' to page ' + page.cur);
	                $('body').attr('id', 'cur-page-' + iPageNr);
	            }
	        });
	        return;
	    } // if curr
	    $('body').attr('id', 'cur-page-' + iPageNr);


		/* set menu */
	}, 

	/**
	 *
	 *
	 */
	showoverlay: function(iPageNr)
	{
            
		var htmlString = $( "#page-"+iPageNr ).html();
                
		var sHtml = '<div id="overlay" class="overlay-page-'+iPageNr+'"> \
						<div id="overlay-inner">'+htmlString+' \
							<div id="overlay-close"></div> \
						</div> \
					</div>';
                                      
		$('body').append(sHtml);

		var p = (__pages[iPageNr] || false);

		if (p && p.background)
		{
			$('div#overlay-inner').css('background-image','url(\''+p.background+'\')');
		}

		$('#overlay-close').on('tap', function(e){
			e.stopPropagation();
			$('div#overlay').remove();
			$('#p14_ov_img2, #p14_ov_img3').hide();			
		});

		//Hides the overlay...
		$('nav').on('tap', function(e){			
			$('div#overlay').remove();					
		});

		//animation in overlay
		$('#overlay').on('tap', function(){
			
			if($(this).attr('class') == 'overlay-page-14'){			
				$('div#p14_ov_img2').animate({width: 'show'}, 2500);

				setTimeout(function(){
					$('img#p14_ov_img3').show(500);
				}, 1700);				
			}

		});
		$('#p8_i2').show();
				
	}

};

var menu = {
	cur: '',
	init: function()
	{
                
		$('div#contentWrapper > nav').on('tap', 'div:not(.active)', function()
		{
			var iPageNr = $(this).data('page-nr');
			
			if (iPageNr > 0)
			{
				page.show(iPageNr);
                $('#contentWrapper nav div').removeClass('active');
                $('#data-on-'+iPageNr).addClass('active');
				//$(this).siblings('.active').andSelf().toggleClass('active');
			}
		});
                $('body').on('tap', function(){
                    var tra = $('#content>.active').data('page-nr');
                    $('#data-on-'+tra).addClass('active');
                });
               
	},

	show: function(sMenuID)
	{
		if (sMenuID == menu.cur || typeof(__menus[sMenuID]) == 'undefined')
		{
			return;
		}

		var sHtml = '';
		$.each(__menus[sMenuID], function(i,m)
		{
			sHtml += '<div id="data-on-'+m.page+'" data-page-nr="'+m.page+'">'+m.name+'</div>';
                        
		});

		$('#contentWrapper > nav').html(sHtml);
		//$('#contentWrapper > nav > div:eq(1)').addClass('active');

		$('#data-on-n').click(function(){
			$('.p4_submenu').slideToggle(500);
		});

		// if ($('div.active').attr('id') == 'page-24'){			
  //       	$('div.p4_submenu').slideDown(500);
  //       }
	}	
	
};

var toggleTeq1_i = -1 ;
var toggleTeq1 = function(a,b,c,d)
{
	var r = [ a, b, c, d] ;
	var ci = toggleTeq1_i + 1;
	if(ci >= 4)
		return ;
	var cid = '#'+r[ci] ;
	var pos = $(cid).data('pos').split(',') ;
	$('#'+r[ci]).css({position: 'absolute', left: pos[0]+'px', top: pos[1]+'px', display:'block'}) ;
	for(var i=0;i<ci;++i)
		$('#'+r[i]).css({display:'none'}) ;
	toggleTeq1_i = ci ;
} ;

var viewArea_t = [] ;
var viewArea = function(aid)
{
	if(viewArea_t[aid])
		return ;
	var cid = '#'+aid ;
	var pos = $(cid).data('pos').split(',') ;
	pos[0] = parseInt(pos[0]) ;
	pos[1] = parseInt(pos[1]) ;
	$('#'+aid).css({position: 'absolute', left: pos[0]+'px', top: pos[1]+'px', display:'block'}) ;	
	if($(cid).data('close-pos')) {
		var cpos = $(cid).data('close-pos').split(',') ;
		cpos[0] = parseInt(cpos[0]) ;
		cpos[1] = parseInt(cpos[1]) ;
		var cx = cpos[0] + pos[0] ;
		var cy = cpos[1] + pos[1] ;
		var caid = aid, ccaid = aid+'-close';
		$('#'+ccaid).css({position: 'absolute', left: cx+'px', top: cy+'px', display:'block'}) ;	
		$('#'+ccaid).on('click', function() {
			$('#'+caid).css({display:'none'}) ;	
			$('#'+ccaid).css({display:'none'}) ;	
			viewArea_t[caid] = false ;
		}) ;
	}
	viewArea_t[aid] = true ;
}