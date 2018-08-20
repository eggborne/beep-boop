/**
 * Global variables
 */
var gTimeouts = [];
var gUserNumber = 0;
var gMinLoadTime = 5000
var gWordHeight = 0;
var gLoadingHeight = 0;
var gListingNow = false;
var gLoadingPhrases =
[
  "Initializing boop sequence...",
  "Loading beeps",
  "Loading boops",
  "Connecting Dave nodes",
  "Reticulating splines",
  "Transmitting boopified data..."
];
/**
 * Startup actions
 */
var loadingBar = new LoadingBar();
$(function(){
  $('#submit-button').click(function(event){
    if (!gListingNow) {
      if ($('#number-input').val().length) {
				gUserNumber = $('#number-input').val();
				// hide the list, if one's already there
				if ($('#list-card').css('opacity') !== "0") {
					hideList();
        }
        if (gUserNumber > 0) {
          var extraTime = Math.floor(gUserNumber)*25
          var newLoadTime = gMinLoadTime + extraTime
          console.log(gUserNumber + "?? " + extraTime + " extra time!")
          console.log(gUserNumber + "?? " + newLoadTime + " total load time!")
          // set the loading bar transition speed (fake load time)
          $('#loading-bar, #loading-bar-bg').css({
            'transition' : 'width ' + newLoadTime+'ms linear'
          })
        }
        loadingBar.startLoadingSequence(); // calls displayBoopedList() after animation completes
        flipStartButton();
      } else {
        $('html').animate({'scrollTop':0},100);
        throb("#number-input");
      }
    } else {
      flipStartButton();
      cancelTimeouts();
      loadingBar.reset();
      gListingNow = false;
      $('#number-input').val("");
    }
  });
  $('#lightTheme').click(function(){
    switchTheme("light");
  });
  $('#darkTheme').click(function(){
    switchTheme("dark");
  });
  // get the amount to expand #loading-area by when displaying
  gLoadingHeight = $('#progress-card').height();
});
/**
 * Business logic
 */
function boopify(userInput) {
	/**
	 * Returns an array of every number from 0 to userInput (inclusive),
	 * with some replaced by strings per the rules of "Beep-Boop".
	 */
  var output = [];
  var toList = parseInt(userInput);
  for (var i=0; i<=toList; i++) {
    var numString = i.toString();
    var toPass = "<span style='color:#888'>"+numString+"</span>";
    if (i > 0 && i % 3 === 0) {
      toPass = "I'm sorry, Dave. I'm afraid I can't do that.";
    } else if (numString.includes("1")) {
      toPass = "Boop!";
    } else if (numString.includes("0")) {
      toPass = "Beep!";
    }
    output.push(toPass);
  }
  if (document.getElementById('reverseCheck').checked) {
    output = output.reverse();
  }
  return output;
}
/**
 * Front-end logic
 */
function displayBoopedList(list) {
  // restore list card to visible state
  if ($('#list-card').hasClass('hidden')) {
    $('#list-card').removeClass('hidden');
  }
  $('#list-card').css({
    'transform' : 'none',
    // 'opacity' : '1'
  });
	// prepare and append HTML to DOM
  list.forEach(function(item,i){
		// give appropriate styling tags to boopified strings
    if (item === "Beep!") {
      item = `<span class="beep">Beep!</span>`;
    } else if (item === "Boop!") {
      item = `<span class="boop">Boop!</span>`;
    } else if (item[0] === "I") {
      item = `<span class="dave">I'm sorry, Dave. I'm afraid I can't do that.</span>`;
		}
		// append class .gray to every other list item
    var extraClass = ""
    if (i % 2 === 0) {
      extraClass = " gray";
		}
		// append a div with this style and content to #display
    $('#display').append('<div id="num-'+i+'" class="display-number'+extraClass+'">'+item+'</div>');
	});
	// get the exact height of the first (always present) list item
	gWordHeight = $('#num-0').height();
	// collapse/hide all the list items
  $(".display-number").css({
    'opacity': '0',
    'height': '0px'
  });
  gTimeouts.push(setTimeout(function(){
    // restore list items' opacity and height
    var delay = 0; // increases each loop for "cascading" effect
    list.forEach(function (item, i) {
      gTimeouts.push(setTimeout(function () {
        $('#num-' + i).animate({
          'opacity': '1',
          'height': gWordHeight+"px"
        }, 150);
        // on the last one, flip the start button to green
        if (i == list.length - 1) {
          gListingNow = false;
          flipStartButton();
          $('#number-input').val("");
        }
      }, delay));
      delay += 60;
    });
  },500));
}
function hideList() {
  $('#list-card').css({
    // 'opacity' : '0',
    'transform' : 'scaleX(0)'
  });
}

/**
 * Changes the text and color of the #submit-button element.
 */
function flipStartButton() {
  if ($("#submit-button").hasClass('btn-success')) {
    $("#submit-button").text("Cancel");
    $("#submit-button").removeClass('btn-success');
    $("#submit-button").addClass('btn-danger');
    return "start";
  } else {
    $("#submit-button").text("Boopify!");
    $("#submit-button").removeClass('btn-danger');
    $("#submit-button").addClass('btn-success');
    return "stop";
  }
}
function LoadingBar() {
  this.reset = function(){
    // turn off bar transitions so they go to 0 instantly
    $('#loading-bar').addClass('no-transition')
    $('#loading-bar-bg').addClass('no-transition')
    $('#loading-bar').css({
      'width' : '0%'
    });
    $('#loading-bar-bg').css({
      'width' : '100%'
    });
    $('#loading-area').css({
      'height' : '0px',
      'pointer-events' : 'none'
    });
    $('#progress-card').css({
      'transform' : 'scaleY(0)'
    });
	}
	this.showLoadLegend = function(index) {
		$('#bar-label').text(gLoadingPhrases[index]);
	}
  this.startLoadingSequence = function(){
    gListingNow = true;
    $('html').animate({'scrollTop':0},100);
    $('#loading-bar').removeClass('no-transition')
    $('#loading-bar-bg').removeClass('no-transition')
    var loadTime = parseFloat($('#loading-bar').css("transition-duration"))*1000;
    var legendTime = (loadTime/(gLoadingPhrases.length-2))
    var preludeTime = Math.round(legendTime*1.5)
    $('#loading-area').css({
      'pointer-events' : 'all',
      'height' : gLoadingHeight+'px'
    });
    $('#progress-card').css({
      'transform' : 'scaleY(1)'
    });
    $('.progress').css({
      'opacity' : '1'
    });
    $('#bar-label').css({
      'opacity' : '1'
    });
		// show "Initializing..." on progress card before bar begins growing
		this.showLoadLegend(0);
		// show rest of load legends in sequence
    gTimeouts.push(setTimeout(function(){
			/**
			 * #loading-bar widens while #loading-bar-bg shortens,
			 * creating the illusion of one bar with a background.
			 */
      $('#loading-bar').css({
        'width' : '100%' // will take loadTime ms
      });
      $('#loading-bar-bg').css({
        'width' : '0%' // will take loadTime ms
			});
      loadingBar.showLoadLegend(1);
      gTimeouts.push(setTimeout(function(){
        loadingBar.showLoadLegend(2);
        gTimeouts.push(setTimeout(function(){
          loadingBar.showLoadLegend(3);
          gTimeouts.push(setTimeout(function(){
            loadingBar.showLoadLegend(4);
            gTimeouts.push(setTimeout(function(){
              loadingBar.showLoadLegend(5);
              gTimeouts.push(setTimeout(function(){
                // finally produce and display the result
                loadingBar.reset();
                displayBoopedList(boopify(gUserNumber));
              },legendTime));
            },legendTime));
          },legendTime));
        },legendTime));
      },legendTime));
    },preludeTime));
  }
}
function animateIntro() {
  $('.container').css({
    'opacity':'1'
  });
  $('body').css({
    'transform':'scaleX(1) scaleY(1)',
    'opacity':'1'
  });
}
function switchTheme(newTheme) {
  if (newTheme === "light") {
    $('body').css({
      'background-color' : '#eee'
    });
    $('.card').css({
      'background-color' : '#dedede'
    });
    $('.jumbotron').css({
      'background-color' : 'white',
      'color' : 'black'
    });
  } else {
    $('body').css({
      'background-color' : '#222'
    });
    $('.card').css({
      'background-color' : '#dedede'
    });
    $('.jumbotron').css({
      'background-color' : '#666',
      'color' : '#ddd'
    });
  }
}
function throb(element) {
  $(element).css({
    'transform' : 'scaleX(1.15) scaleY(1.15)'
  });
  setTimeout(function(){
    $(element).css({
      'transform' : 'scaleX(1) scaleY(1)'
    });
    setTimeout(function(){
      $(element).css({
        'transform' : 'scaleX(1.1) scaleY(1.1)'
      });
      setTimeout(function(){
        $(element).css({
          'transform' : 'scaleX(1) scaleY(1)'
        });
      },100);
    },100);
  },100);
}
function cancelTimeouts() { // must be called when animations are canceled in case user starts them again quickly
  gTimeouts.forEach(function(timeout) {
    clearTimeout(timeout);
  });
}