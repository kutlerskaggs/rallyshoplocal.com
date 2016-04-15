/*
 * Magazine sample
*/

function addPage(page, book) {

	var id, pages = book.turn('pages');

	// Create a new element for this page
	var element = $('<div />', {});

	// Add the page to the flipbook
	if (book.turn('addPage', element, page)) {

		// Add the initial HTML
		// It will contain a loader indicator and a gradient
		element.html('<div class="gradient"></div><div class="loader"></div>');

		// Load the page
		loadPage(page, element);
	}

}

function loadPage(page, pageElement) {

	// Create an image element

	var img = $('<img />');

	img.mousedown(function(e) {
		e.preventDefault();
	});

	img.load(function() {
		
		// Set the size
		$(this).css({width: '100%', height: '100%'});

		// Add the image to the page after loaded

		$(this).appendTo(pageElement);

		// Remove the loader indicator
		
		pageElement.find('.loader').remove();
	});

	// Load the page

	img.attr('src', 'pages/Page_' +  page + '.jpg');

	loadRegions(page, pageElement);

}

// Zoom in / Zoom out

function zoomTo(event) {

		setTimeout(function() {
			if ($('.magazine-viewport').data().regionClicked) {
				$('.magazine-viewport').data().regionClicked = false;
			} else {
				if ($('.magazine-viewport').zoom('value')==1) {
					$('.magazine-viewport').zoom('zoomIn', event);
				} else {
					$('.magazine-viewport').zoom('zoomOut');
				}
			}
		}, 1);

}



// Load regions

function loadRegions(page, element) {

	/*$.getJSON('pages/'+page+'-regions.json').
		done(function(data) {

			$.each(data, function(key, region) {
				addRegion(region, element);
			});
		});
	*/
}

// Add region

function addRegion(region, pageElement) {
	var width = $(window).width(),
		height = $(window).height(),
		options = $('.magazine').turn('options');

	var bound = calculateBound({
			width: options.width,
			height: options.height,
			boundWidth: Math.min(options.width/1.1, width/1.1),
			boundHeight: Math.min(options.height/1.1, height)
		});
	 
	

	if(region.class == "link")
	{
		var reg = $('<div />', {'class': 'region  ' + region['class']}),
		options = $('.magazine').turn('options'),
		pageWidth = bound.width/2,
		pageHeight = bound.height;

		var ar = pageWidth/612;//0.64215;//(pageWidth)/pageHeight;
		reg.css({
			top: (region.y*ar)+"px",
			left: (region.x*ar)+"px",
			width: (region.width*ar)+"px",
			height: (region.height*ar)+"px",
		}).attr('region-data', $.param(region.data||''));
		reg.appendTo(pageElement);
	}
	
	else if(region.class == "image")
	{
		var reg = $('<div />', {'class': 'region-image  ' + region['class']}),
		options = $('.magazine').turn('options'),
		pageWidth = bound.width/2,
		pageHeight = bound.height;

		var ar = pageWidth/612;//0.64215;//(pageWidth)/pageHeight;
		reg.css({
			top: (region.y*ar)+"px",
			left: (region.x*ar)+"px",
			width: (region.width*ar)+"px",
			height: (region.height*ar)+"px",
		}).attr('region-data', $.param(region.data||''));
		
		var w =  (region.width*ar)+"px";
		var h =  (region.height*ar)+"px";
		var img = $('<div style="background :url('+region.imgsrc+') no-repeat center; background-size: 100%; width: '+w+'; height: '+h+';" ></div>');
		img.appendTo(reg);
		reg.appendTo(pageElement);
		//$($('#flipbook').turn('data').pageObjs[2]).append('<img src="'+region.imgsrc+'" style="position:absolute; bottom:0;"/>');
	}
	
	else if(region.class == "to-page")
	{
		var reg = $('<div />', {'class': 'region  ' + region['class']}),
		options = $('.magazine').turn('options'),
		pageWidth = bound.width/2,
		pageHeight = bound.height;

		var ar = pageWidth/612;//0.64215;//(pageWidth)/pageHeight;
		reg.css({
			top: (region.y*ar)+"px",
			left: (region.x*ar)+"px",
			width: (region.width*ar)+"px",
			height: (region.height*ar)+"px",
		}).attr('region-data', $.param(region.data||''));
		reg.appendTo(pageElement);
	}
	
	else if(region.class == "video")
	{
		var reg = $('<div />', {'class': 'region-image  ' + region['class']}),
		options = $('.magazine').turn('options'),
		pageWidth = bound.width/2,
		pageHeight = bound.height;

		var ar = pageWidth/612;//0.64215;//(pageWidth)/pageHeight;
		reg.css({
			top: (region.y*ar)+"px",
			left: (region.x*ar)+"px",
			width: (region.width*ar)+"px",
			height: (region.height*ar)+"px",
		}).attr('region-data', $.param(region.data||''));
		
		var w =  (region.width*ar);
		var h =  (region.height*ar);
		var img = $('<video id="my_video_1" class="video-js vjs-default-skin" controls  preload="auto" width="'+w+'" height="'+h+'" poster="media/oceans-clip.jpg"   data-setup="{}">  <source src="http://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4">  <source src="http://media.w3.org/2010/05/sintel/trailer.webm" type="video/webm"> <source src="http://media.w3.org/2010/05/sintel/trailer.ogv" type="video/ogg"></video>');
		img.appendTo(reg);

		reg.appendTo(pageElement);
	}
	
	else if(region.class == "youtube")
	{
		var reg = $('<div />', {'class': 'region  ' + region['class']}),
		options = $('.magazine').turn('options'),
		pageWidth = bound.width/2,
		pageHeight = bound.height;

		var ar = pageWidth/612;//0.64215;//(pageWidth)/pageHeight;
		reg.css({
			top: (region.y*ar)+"px",
			left: (region.x*ar)+"px",
			width: (region.width*ar)+"px",
			height: (region.height*ar)+"px",
		}).attr('region-data', $.param(region.data||''));
		
		var w =  (region.width*ar);
		var h =  (region.height*ar);
		var img = $('<iframe src='+region.ytsrc+' width= "'+w+'"; height="'+h+'" frameborder="0" allowfullscreen/>');
		img.appendTo(reg);

		reg.appendTo(pageElement);
	}
	
	else if(region.class == "audio")
	{
		var reg = $('<div />', {'class': 'region-image  ' + region['class']}),
		options = $('.magazine').turn('options'),
		pageWidth = bound.width/2,
		pageHeight = bound.height;

		var ar = pageWidth/612;//0.64215;//(pageWidth)/pageHeight;
		reg.css({
			top: (region.y*ar)+"px",
			left: (region.x*ar)+"px",
			width: (region.width*ar)+"px",
			height: (region.height*ar)+"px",
		}).attr('region-data', $.param(region.data||''));
		
		var w =  (region.width*ar);
		var h =  (region.height*ar);
		var img = $('<audio controls="true" width="'+w+'" height="'+h+'" > <source src="demo.mp3" type="audio/mp3"> <source src="media/horse.ogg" type="audio/ogg"><source src="demo.aac" type="audio/mp4">   </audio>');
		img.appendTo(reg);

		reg.appendTo(pageElement);
	}
	
        
    
	

	
}

// Process click on a region

function regionClick(event) {

	event.preventDefault();
	var region = $(event.target);

	if (region.hasClass('region')) {

		$('.magazine-viewport').data().regionClicked = true;
		
		setTimeout(function() {
			$('.magazine-viewport').data().regionClicked = false;
		}, 100);
		
		var regionType = $.trim(region.attr('class').replace('region', ''));

		//return processRegion(region, regionType);

	}

}

// Process the data of every region

function processRegion(region, regionType) {

	data = decodeParams(region.attr('region-data'));

	switch (regionType) {
		case 'link' :

			window.open(data.url);

		break;
		case 'zoom' :

			var regionOffset = region.offset(),
				viewportOffset = $('.magazine-viewport').offset(),
				pos = {
					x: regionOffset.left-viewportOffset.left,
					y: regionOffset.top-viewportOffset.top
				};

			$('.magazine-viewport').zoom('zoomIn', pos);

		break;
		case 'to-page' :

			$('.magazine').turn('page', data.page);

		break;
		default:
		break;
	}

}

// Load large page

function loadLargePage(page, pageElement) {
	
	var img = $('<img />');

	img.load(function() {

		var prevImg = pageElement.find('img');
		$(this).css({width: '100%', height: '100%'});
		$(this).appendTo(pageElement);
		prevImg.remove();
		
	});

	// Loadnew page
	
	img.attr('src', 'pages/ZPage_' +  page + '.jpg');
}

// Load small page

function loadSmallPage(page, pageElement) {
	
	var img = pageElement.find('img');

	img.css({width: '100%', height: '100%'});

	img.unbind('load');
	// Loadnew page

	img.attr('src', 'pages/Page_' +  page + '.jpg');
}

// http://code.google.com/p/chromium/issues/detail?id=128488

function isChrome() {

	return navigator.userAgent.indexOf('Chrome')!=-1;

}

function disableControls(page) {
		if (page==1)
			$('.previous-button').hide();
		else
			$('.previous-button').show();
					
		if (page==$('.magazine').turn('pages'))
			$('.next-button').hide();
		else
			$('.next-button').show();
}

// Set the width and height for the viewport

function resizeViewport() {

	var width = $(window).width(),
		height = $(window).height(),
		options = $('.magazine').turn('options');

	$('.magazine').removeClass('animated');

	$('.magazine-viewport').css({
		width: width,
		height: height
	}).
	zoom('resize');
	var bWidth;
	var bHeight;
	if($('.magazine').turn('display') == "double")
	{
		
		if(options.width > options.height*2)
		{
			bWidth = options.height*0.772*2;
			bHeight = options.height;

		}
		else
		{
			var newWidth = (options.width - 200)/2;
			bWidth = newWidth*2;
			bHeight = newWidth/0.772;
		}
	}
	else
	{
		bWidth = (options.height-20)*0.772*2;
		bHeight = (options.height-20);
	
	}
	if ($('.magazine').turn('zoom')==1) {
		var bound = calculateBound({
			width: options.width,
			height: options.height,
			boundWidth: bWidth,
			boundHeight: bHeight
		});
		console.log(options.width/1.1);
		console.log(width/1.1);
		console.log(options.height/1.1);
		console.log(height);
		if (bound.width%2!==0)
			bound.width-=1;

			
		if (bound.width!=$('.magazine').width() || bound.height!=$('.magazine').height()) {

			$('.magazine').turn('size', bound.width, bound.height);

			if ($('.magazine').turn('page')==1)
				$('.magazine').turn('peel', 'br');

			$('.next-button').css({height: bound.height, backgroundPosition: '-38px '+(bound.height/2-32/2)+'px'});
			$('.previous-button').css({height: bound.height, backgroundPosition: '-4px '+(bound.height/2-32/2)+'px'});
		}

		$('.magazine').css({top: -bound.height/2, left: -bound.width/2});
	}

	var magazineOffset = $('.magazine').offset(),
		boundH = height - magazineOffset.top - $('.magazine').height(),
		marginTop = (boundH - $('.thumbnails > div').height()) / 2;

	if (marginTop<0) {
		$('.thumbnails').css({height:1});
	} else {
		$('.thumbnails').css({height: boundH});
		$('.thumbnails > div').css({marginTop: marginTop});
	}

	if (magazineOffset.top<$('.made').height())
		$('.made').hide();
	else
		$('.made').show();

	$('.magazine').addClass('animated');
	
}


// Number of views in a flipbook

function numberOfViews(book) {
	return book.turn('pages') / 2 + 1;
}

// Current view in a flipbook

function getViewNumber(book, page) {
	return parseInt((page || book.turn('page'))/2 + 1, 10);
}

function moveBar(yes) {
	if (Modernizr && Modernizr.csstransforms) {
		$('#slider .ui-slider-handle').css({zIndex: yes ? -1 : 10000});
	}
}

function setPreview(view) {

	var previewWidth = 112,
		previewHeight = 73,
		previewSrc = 'pages/preview.jpg',
		preview = $(_thumbPreview.children(':first')),
		numPages = (view==1 || view==$('#slider').slider('option', 'max')) ? 1 : 2,
		width = (numPages==1) ? previewWidth/2 : previewWidth;

	_thumbPreview.
		addClass('no-transition').
		css({width: width + 15,
			height: previewHeight + 15,
			top: -previewHeight - 30,
			left: ($($('#slider').children(':first')).width() - width - 15)/2
		});

	preview.css({
		width: width,
		height: previewHeight
	});

	if (preview.css('background-image')==='' ||
		preview.css('background-image')=='none') {

		preview.css({backgroundImage: 'url(' + previewSrc + ')'});

		setTimeout(function(){
			_thumbPreview.removeClass('no-transition');
		}, 0);

	}

	preview.css({backgroundPosition:
		'0px -'+((view-1)*previewHeight)+'px'
	});
}

// Width of the flipbook when zoomed in

function largeMagazineWidth() {
	
	return 2214;

}

// decode URL Parameters

function decodeParams(data) {

	var parts = data.split('&'), d, obj = {};

	for (var i =0; i<parts.length; i++) {
		d = parts[i].split('=');
		obj[decodeURIComponent(d[0])] = decodeURIComponent(d[1]);
	}

	return obj;
}

// Calculate the width and height of a square within another square

function calculateBound(d) {
	
	var bound = {width: d.width, height: d.height};

	if (bound.width>d.boundWidth || bound.height>d.boundHeight) {
		
		var rel = bound.width/bound.height;

		if (d.boundWidth/rel>d.boundHeight && d.boundHeight*rel<=d.boundWidth) {
			
			bound.width = Math.round(d.boundHeight*rel);
			bound.height = d.boundHeight;

		} else {
			
			bound.width = d.boundWidth;
			bound.height = d.boundHeight;//Math.round(d.boundWidth/rel);
		
		}
	}
		
	return bound;
}

function SetSingleDisplay()
{
	$('.magazine').turn('display', 'single');
}