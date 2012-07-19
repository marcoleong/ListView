/**
 * jQuery ListView plugin v1.0 beta
 *
 * Copyright 2012, Marco Leong
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */


(function(){
	$.fn.extend({
		settings: {
			"formHiddenInputField" : '<input type="hidden" name="parent" value="" id="listview-selected-hidden-field" />'
		},

		listView: function() {
			this.initialize();
		},

		initialize: function(options){

			jQuery.extend(this.settings, options);

			$(this).wrap('<div class="nestable-container"></div>');
			//initialize left property
			$(this).addClass('nestable-view');

			$(this).before('<input style="width:100%;"type="text" id="listview-search-field" />');
			$(this).after(this.settings.formHiddenInputField);

			var _this = this;
			$("#listview-search-field").keyup(function(event){
				if (event.which == 13) {
					event.preventDefault();
				}
				var results = _this.findNode($(this).val());
				// console.log(results);

				$('.nestable-view').hide();
				// $(this).
				if($('#listview-search-results').length < 1){
					$(this).after('<ul id="listview-search-results"></ul>');
				}

				var resultsItem = $.map(results, function(item){
					return "<li>"+item+"</li>";
				});
				// console.log(resultsItem);
				$("#listview-search-results").html('');
				$.each(resultsItem, function(i,el){
					$("#listview-search-results").append(el);
				});
				$("#listview-search-results > li").each(function(i,el){
					$(el).click(function(e){
						var value = _this.getTextInNode(el);
						$("#listview-selected-hidden-field").val(value);
						e.preventDefault();
					});
				});
			});

			var lvl = 0;
			this.addProperty($(this), lvl);

			this.bindClickEvents($(this));
		},

		addProperty: function(ele,lvl){


			var _this = this;
			//check if it have element to work with
			if(ele.length > 0){
				ele.each(function(i,ele){
					// ul
					$(ele).attr('data-level', lvl);
				});

				// all left except the first layer.
				if(lvl !== 0){
					$(ele).css({'left':'100%'});
				}else{
					$(ele).css({'left':'0px'});
				}
				lvl += 1;
				this.deepness = lvl;
				// recursively add for every ul element
				this.addProperty($(ele).children().children(),lvl);
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
					if($(ele).data('level') !== 0) {
						$(ele).children().first().before('<li class="parent-btn">Parent</li>');
						var pbtn = $(ele).children().first();

					
						$(pbtn).click(function(e){
							$(root).animate({'left':'+=100%'});
							$(pbtn).parent().css({'z-index': '1'});

							e.stopPropagation();
						});
					}
					
				});
				var _this = this;
				//for each children of an ul, means the li
				$(ele).children().each(function(i,ele){
					$(ele).click(function(e){
						if($(ele).children().children().length > 0 && !$(ele).is('.parent-btn') ){
							
							var value = _this.getTextInNode(ele);
							$("#listview-selected-hidden-field").val(value);
						}
						e.stopPropagation();
					});

					if( !$(ele).is('.parent-btn') ){
						//use the arrow button to navigate
						if($(ele).children().length > 0 ){
							$(ele).append("<i class='icon-chevron-right icon-white'></i>");
						}

						$(ele).children('i').click(function(){
							if($(ele).children().children().length > 0 ){
								$(root).animate({'left':'-=100%'});
								$(ele).children().css({'z-index':'1'});
								$(ele).siblings().children().css({'z-index':'-1'});
							}
						});
					}
				});

				// recursively bind click event.
				this.bindClickEvents($(ele).children().children());
			}else{
				return false;
			}
		},

		showNode: function(nodes){
			
		},

		findNode: function(value){
			var items = $(this).find("ul > li:contains('"+value+"')").not(".parent-btn").not('ul');
			var _this = this;
			var nodes_value = $.map($(items), function(item){
				return _this.getTextInNode(item);
			});
			return nodes_value;
		},
		getTextInNode : function(elem) {
			return $.trim(elem.firstChild.nodeValue);
		}
    });
})(jQuery);