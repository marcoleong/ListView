/**
 * jQuery ListView plugin v1.0 beta (not even there yet !)
 *
 * Copyright 2012, Marco Leong
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function($){
	$.fn.extend({
		settings: {
			formHiddenInputField: '<input id="listview-selected-hidden-field" type="hidden">',
			searchable: true
		},

		listView: function() {
			this.initialize();
		},

		initialize: function(options){

			this.settings = (options) ? jQuery.extend(this.settings, options): this.settings;

			$(this).wrap('<div class="nestable-container"></div>');
			//initialize left property
			$(this).addClass('nestable-view');

			if(this.settings.searchable) {
				$(this).before('<input style="width:100%;"type="text" id="listview-search-field" />');
			}

			$(this).after(this.settings.formHiddenInputField);

			var that = this;
			$("#listview-search-field").keyup(function(event){
				if (event.which == 13) {
					event.preventDefault();
				}
				var results = that.findNode($(this).val());

				$('.nestable-view').hide();
				// $(this).
				if($('#listview-search-results').length < 1){
					$(this).after('<ul id="listview-search-results"></ul>');
				}

				var resultsItem = $.map(results, function(item){
					return "<li style='display:block'><a href='#'>"+item+"</a></li>";
				});
				// console.log(resultsItem);
				$("#listview-search-results").html('');
				$.each(resultsItem, function(i,el){
					$("#listview-search-results").append($(el));
				});
				$("#listview-search-results > li").each(function(i,el){
					$(el).children("a").click(function(e){
						var value = that.getTextInNode(this);
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


			var that = this;
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
				var that = this;
				//for each children of an ul, means the li
				$(ele).children().each(function(i,ele){
					$(ele).click(function(e){
						if($(ele).children().children().length > 0 && !$(ele).is('.parent-btn') ){
							
							var value = that.getTextInNode(ele);
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
			var that = this;

			// var items = $(this).find("li:contains('"+value+"')").not(".parent-btn").not('ul');
			var items = $(this).find("li").not(".parent-btn").not('ul');

			var isMatch = function(value, node) {
				value = value.toLowerCase();
				return that.getTextInNode(node).toLowerCase().indexOf(value) != -1;
				// return node.innerHTML.toLowerCase().indexOf(value) > 0;
			};
			// filter with regular expression
			var filtered = new Array(0);
			for (var i = items.length - 1; i >= 0; i--) {
				if(isMatch(value, items[i])) {
					filtered.push(items[i]);
				}
			}
			items = filtered;
			var nodes_value = $.map($(items), function(item){
				return that.getTextInNode(item);
			});
			return nodes_value;
		},
		getTextInNode : function(elem) {
			return $.trim(elem.firstChild.nodeValue);
		}
	});
 })($);
