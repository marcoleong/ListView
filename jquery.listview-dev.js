(function(){
	$.fn.extend({
		listView: function() {
			//putting add left property for all ul
			//when an children li is clicked, left -=100px, animated
			this.initialize();
		},

		initialize: function(){
			$(this).wrap('<div class="nestable-container"></div>');
			//initialize left property
			$(this).addClass('nestable-view');
			var lvl = 0;
			this.addLeftProperty($(this), lvl);

			this.bindClickEvents($(this));
		},

		addLeftProperty: function(ele,lvl){

			//check if it have element to work with
			if(ele.length > 0){
				ele.each(function(i,ele){
					// li
					$(ele).attr('data-level', lvl);
				});

				// all left except the first layer.
				if(lvl !== 0){
					$(ele).css({'left':'100px'});
				}else{
					$(ele).css({'left':'0px'});
				}
				lvl += 1;

				// recursively add for every ul element
				this.addLeftProperty($(ele).children().children(),lvl);
			}else{
				return false;
			}
		},

		bindClickEvents: function(ele){
			var root = $(this);
			//check is there any node need to bind.
			if(ele.children().length > 0){

				// add a "Parent" button.
				$(ele).each(function(i,ele){
					$(ele).children().first().before('<li class="parent-btn">Parent</li>');
					var pbtn = $(ele).children().first();

					if($(pbtn).parent().data('level') !== 0) {
						$(pbtn).click(function(e){
							$(root).animate({'left':'+=100px'});
							$(pbtn).parent().css({'z-index': '1'});

							e.stopPropagation();
						});
					}
					
				});

				//for each children of an ul, means the li
				$(ele).children().each(function(i,ele){

					$(ele).click(function(e){
						if($(ele).children().length > 0 && !$(ele).is('.parent-btn') ){
							$(root).animate({'left':'-=100px'});
							$(ele).children().css({'z-index':'1'});
							$(ele).siblings().children().css({'z-index':'-1'});
						}
						e.stopPropagation();
					});

				});

				// recursively bind click event.
				this.bindClickEvents($(ele).children().children());
			}else{
				return false;
			}

		}
	});
})