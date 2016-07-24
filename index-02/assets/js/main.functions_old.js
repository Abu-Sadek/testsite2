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

		$.each(__pages, function(iPageNr, p)
		{
			var attr = [
				'class="page"',
				'id="page-'+iPageNr+'"',
				'data-page-nr="'+iPageNr+'"'
			];

			if (p.background) {
			    attr.push('style="background-image:url(\'' + p.background + '\'); position: absolute;"');
			}
			else
			    attr.push('style="position: absolute;"');

			sHtml += '	<div '+attr.join(' ')+'> \
							'+(p.html ? p.html.call() : '')+' \
						</div>';
				
		});

		$('#content').html(sHtml);
				
	},

	/**
	 *
	 *
	 */
	show: function(iPageNr)
	{
                //iPageNr =7;
                //alert(iPageNr);
                
                 
                
                
		
		var $current = $('div.page.active');
		var $target = $('div#page-'+iPageNr);
		var p = (__pages[iPageNr] || false);
		if (p && p.overlay)
		{
			page.showoverlay(iPageNr);
                        var scrollbox = null;
                        scrollbox = new IScroll('#overlay #overlay-inner .slide40_overlay .scrollbox', {
                        mouseWheel: true
                       , scrollbars: true
                        });
                               
			return;
		}
		else if (p == false || $target.length == 0)
		{
			console.log('Target does not exist');
			return;
		}
		else if ($current.data('page-nr') == iPageNr)
		{
			return;
		}

		page.prev = page.cur;
		page.cur = iPageNr;
		console.log('Switch from page '+page.prev+' to page '+page.cur);

		$target.add($current).toggleClass('active');
		$('body').attr('id','cur-page-'+iPageNr);

		/* set menu */
		if (p.menu)
		{
			menu.show(p.menu);
		}
		if (p.menu1)
		{
			menu1.show(p.menu1);
		}
		if (p.menu2)
		{
			menu2.show(p.menu2);
		}

		if (p.init && !p.initialized)
		{
			p.init.call($target);
			__pages[iPageNr].initialized = true;
		}

		if (p.activate)
		{
			p.activate.call($target);
		}

		if (page.prev && __pages[page.prev].deactivate)
		{
			__pages[page.prev].deactivate.call($current);
		}
			
			$('nav div.active').removeClass("active");
			if ( iPageNr > 3 && iPageNr < 8 ) 
			{
				$("#data-on-4").addClass("active");
			}
			if ( iPageNr == 8 ) 
			{
				$("#data-on-8").addClass("active");
			}
			if ( iPageNr > 8 && iPageNr < 16 ) 
			{
				$("#data-on-9").addClass("active");
			}
			if ( iPageNr > 15 && iPageNr < 22 ) 
			{
				$("#data-on-16").addClass("active");
			}
			if ( iPageNr > 21 && iPageNr < 24 ) 
			{
				$("#data-on-22").addClass("active");
			}
			if ( iPageNr == 25 ) 
			{
				$("#data-on-25").addClass("active");
			}
			if ( iPageNr == 26 ) 
			{
				$("#data-on-26").addClass("active");
			}
			if ( iPageNr == 27 ) 
			{
				$("#data-on-27").addClass("active");
			}
			if ( iPageNr == 28 ) 
			{
				$("#data-on-28").addClass("active");
			}
			if ( iPageNr == 29 ) 
			{
				$("#data-on-29").addClass("active");
			}
			if ( iPageNr == 34 ) 
			{
				$("#data-on-34").addClass("active");
			}
			if ( iPageNr == 35 ) 
			{
				$("#data-on-35").addClass("active");
			}
			if ( iPageNr > 35 && iPageNr < 38 ) 
			{
				$("#data-on-36").addClass("active");
			}
			if ( iPageNr == 38 || iPageNr == 381) 
			{
				$("#data-on-38").addClass("active");
			}
			if ( iPageNr == 39 ) 
			{
				$("#data-on-39").addClass("active");
			}
			if ( iPageNr == 40 ) 
			{
				$("#data-on-40").addClass("active");
			}
			if ( iPageNr == 41 ) 
			{
				$("#data-on-41").addClass("active");
			}
                        if (iPageNr >= 241 && iPageNr <= 243){
                                $("#data-on-241").addClass("active");
                        }
								
				/*
				$('#navigation div').removeClass("active");
				if ( iPageNr == 3 ) {
					$("#data-on-3").addClass("active");
				}
				if (iPageNr > 3 && iPageNr < 25) {
					$("#data-on-4").addClass("active");
				}
				if (iPageNr > 24 && iPageNr < 48) {
					$("#data-on-25").addClass("active");
				}
				if (iPageNr > 47 && iPageNr < 57) {
					$("#data-on-48").addClass("active");
				} */
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

		$('#overlay-close').on('tap', function()
		{
			$('div#overlay').remove();
			
		});
		
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
	}	
	
};

