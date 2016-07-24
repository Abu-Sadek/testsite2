(function($)
{
	var Tap = {
		hasTouch : ('ontouchstart' in window),
		maxRange : 10,
		startX : null,
		startY : null,
		timer : null,
		target : null,

		start : function(e)
		{
			Tap.startX = (Tap.hasTouch ? e.originalEvent.touches[0] : e).pageX;
			Tap.startY = (Tap.hasTouch ? e.originalEvent.touches[0] : e).pageY;

			Tap.starthover(e);
		},

		stop : function(e)
		{
			var endX = (Tap.hasTouch ? e.originalEvent.changedTouches[0] : e).pageX;
			var endY = (Tap.hasTouch ? e.originalEvent.changedTouches[0] : e).pageY;

			Tap.stophover(e);

			if (Math.abs(endX - Tap.startX) < Tap.maxRange && Math.abs(endY - Tap.startY) < Tap.maxRange)
			{
				$.event.special.tap.handler.call(this, e);
			}
		},

		starthover : function(e)
		{
			var $self = $(e.target);

			Tap.timer = setTimeout(function()
			{
				$self.addClass('hover');
			}, 75);
		},

		stophover : function(e)
		{
			clearTimeout(Tap.timer);
			$(e.target).removeClass('hover');
		},
	};

	$.event.special.tap = {

		setup: function(data, namespaces, eventHandle)
		{
			$(this)
				.on(Tap.hasTouch?'touchstart':'mousedown', Tap.start)
				.on(Tap.hasTouch?'touchcancel touchend':'mouseup', Tap.stop)
				.on(Tap.hasTouch?'touchmove':'mousemove mouseleave', Tap.stophover);
		},

		teardown: function()
		{
			$(this)
				.off(Tap.hasTouch?'touchstart':'mousedown', Tap.start)
				.off(Tap.hasTouch?'touchcancel touchend':'mouseup', Tap.stop)
				.off(Tap.hasTouch?'touchmove':'mousemove mouseleave', Tap.stophover);
		},

		handler: function(e)
		{
			var typeBefore = e.type;
			e.type = 'tap';
			$.event.trigger.call(this, e, {}, this, true);
			e.type = typeBefore;
		}
	};

})(jQuery);