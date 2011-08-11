/**
 * PIMP MY: SELECT
 * 
 * v0.3
 * 
 * Gustavo Lima - QUEO 
 * 
 * Replaces select elements so that ccs can be applied to drop
 * down list.
 * 
 * Based on http://www.jankoatwarpspeed.com/post/2009/07/28/reinventing-drop-down-with-css-jquery.aspx
 * by Janko 
 * 
 */
(function( $ ){

  $.fn.pimpmyselect = function( options ) {  
	
	/**
	 * SETTINGS
	 */
	var settings = {
		maxHeight : 200
	}
	
	var selectedItem = null;
	
	/**
	 * Import user set settings
	 */
	if (options){
		$.extend( settings, options);
	}
	
	/**
	 * For each given element create a custom select box
	 */
	return this.each(function(i) {

      var $this = $(this);
	  
	  // custom select object
	  var selected = $this.find('option[selected]');
	  var newSelect = $('<dl id="drop-'+ i +'" class="dropdown" />')
	  				   .append('<dt class="pimp-select-box" ><a><span>'+ selected.text() +'</span></a></dt><dd class="pimp-list-wrapper"><ul></ul></dd>')
	  
	  var list = newSelect.find('ul');
	  
	  // copy select's options
	  $this.find('option').each(function(){
	  	var item = $('<li><a>'+ $(this).text() +'</a></li>');
	  	var value = $('<span class="value">'+ $(this).attr('value') +'</span>').hide();
	  	item.append(value);
	  	list.append(item);	  	
	  });
	  
	  /*
	   * Click on pimped select
	   */
	  newSelect.find("dt").click(function() {
        
        $(document).click();
        
        if (selectedItem == $(this)) {
        	selectedItem = null;
        	return false;
        }
        
        list.toggle();
        
        selectedItem = $(this);
        
        $(this).addClass('selected');
        
        /**
         * KEYPRESSES
         */
        $(document).bind('keypress', function(e) {
        	// if key pressed is escape, close dropdown
        	if (e.keyCode == 27) {
        		$(document).click();
        		return true;
        	}
        	
        	//
        	list.find('a').each(function(){
        		
        		var text = $(this).text().toLowerCase();
        		
        		if (e.which == text.charCodeAt(0) || e.which == text.toUpperCase().charCodeAt(0)) {
        			$(this).hover();
        			return false;
        		}
        	});
        });
      });
      
      /**
       * Click on list item
       */
       newSelect.find('dd ul li').click(function(event) {
       	   event.stopPropagation();
       	   
       	   $this.val($(this).find('.value').html());
       	   
       	   var text = $(this).html();
           newSelect.find("dt a span").html(text);
           newSelect.find("dd ul").hide();
       });
       
       newSelect.find('dd ul li a').click(function(event){
       		event.preventDefault();       		
       });
       
       /**
        * Click anywhere on screen to close list
        */                 
       $(document).bind('click', function(e) {
            var $clicked = $(e.target);
            if (! $clicked.parents().hasClass("dropdown")) {
       		     $(".dropdown dd ul").hide();
       		     $(".dropdown dt").removeClass('selected');
       		     
       		     $(document).unbind('keypress');
       		}
       		     
       });
       
       // ADD CUSTOM SELECT TO DOCUMENT
       $this.before(newSelect);
       
       // BEHAVIORAL STYLING
       list.css({
       		'overflow': 'auto',
       		'position': 'absolute', 
       		'float': 'left',
       		'width': '100%'
       });
       
       list.find('li').css({
       		'cursor': 'pointer'
       });
       
       newSelect.find('dd').css({
       		'position': 'relative'	
       });
       
       newSelect.find('dt').css({
       		'cursor': 'pointer',
       		'width': '100%',
       		'height': '100%'
       });
       
       newSelect.css({
       		'width': function(){return $this.width();},
       		'marginLeft': function(){return $this.css('margin-left');},
       		'marginRight': function(){return $this.css('margin-right');},
       		'float': 'left'
       });
       
       if (list.height() > settings.maxHeight) {
       	list.height(settings.maxHeight);
       }
       
       console.log(newSelect.find('dt').height());
       
       if (list.offset().top + list.height() > $('body').height()){
       	var topPosition = -(list.height() + newSelect.find('dt').height() + parseInt(newSelect.find('dt').css('border-top-width')) + parseInt(newSelect.find('dt').css('border-bottom-width'))); 
       	list.css('top', topPosition);	
       }
       
       list.hide();
       
       // HIDE SELECT COMPONENT
       $this.hide();
	  
    });

  };
})( jQuery );