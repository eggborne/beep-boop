var gTimeouts = [];
var gUserNumber = 0;
var gWordHeight = 0;
var gListing = false;
var gListY = 0
var loadingPhrases = 
[
  "Initializing boop sequence...",
  "Loading beeps",
  "Loading boops",
  "Connecting Dave nodes",
  "Reticulating splines",
  "Calibrating beepulators",
  "Transmitting boopified data..."
];
var loadingBar = new LoadingBar()
$(function(){
  $('#submit-button').click(function(event){
    if (!gListing) {
      if ($('#number-input').val().length) {
        gUserNumber = $('#number-input').val()
        $('#display').html("");
        $('#list-card').css({
          'opacity' : '0',
          'transform' : 'translateY(100%)'
        });
        flipStartButton()
        loadingBar.reveal() // calls display function after animation
      } else {
        throb("#number-input")
      }
    } else {
      flipStartButton()
      cancelTimeouts()
      loadingBar.reset()
      gListing = false
    }
    $('#number-input').val("")
    event.preventDefault()
  })
  $('#lightTheme').click(function(){
    switchTheme("light");
  })
  $('#darkTheme').click(function(){
    switchTheme("dark");
  })
  gListY = $('#list-card').offset().top
  console.log(gListY)
});
function boopify(userInput) {
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
function cancelTimeouts() {
  gTimeouts.forEach(function(timeout) {
    clearTimeout(timeout)
  })
}
function displayBoopedList(userNumber) {
  var list = boopify(userNumber);
  var delay = 0;
  $('#list-card').css({
    'opacity' : '1',
    'transform' : 'translateY(0)'
  });
  list.forEach(function(item,i){
    if (item === "Beep!") {
      item = `<span class="beep">Beep!</span>`;
    } else if (item === "Boop!") {
      item = `<span class="boop">Boop!</span>`;
    } else if (item[0] === "I") {
      item = `<span class="dave">I'm sorry, Dave. I'm afraid I can't do that.</span>`;
    }
    var extraClass = ""
    if (i % 2 === 0) {
      extraClass = " gray";
    }
    $('#display').append('<div id="num-'+i+'" class="display-number'+extraClass+'">'+item+'</div>');
  })
  wordHeight = $('#num-0').height();
  $(".display-number").css({
    'opacity': '0',
    'height': '0px'
  });
  var delay = 0;
  list.forEach(function (item, i) {
    var timeout = setTimeout(function () {
      $('#num-' + i).animate({
        'opacity': '1',
        'height': wordHeight+"px"
      }, 150);
      if (i == list.length - 1) {
        gListing = false
        flipStartButton()
      }
    }, delay);
    gTimeouts.push(timeout)
    delay += 50;
  });
}
function switchTheme(newTheme) {
  if (newTheme === "light") {
    $('body').css({
      'background-color' : '#eee'
    })
    $('.card').css({
      'background-color' : 'white'
    })
    $('.jumbotron').css({
      'background-color' : 'white',
      'color' : 'black'
    })
  } else {
    $('body').css({
      'background-color' : '#222'
    })
    $('.card').css({
      'background-color' : '#dedede'
    })
    $('.jumbotron').css({
      'background-color' : '#666',
      'color' : '#ddd'
    })
  }
}
function flipStartButton() {
  if ($("#submit-button").hasClass('btn-success')) {
    $("#submit-button").text("Cancel");
    $("#submit-button").removeClass('btn-success')
    $("#submit-button").addClass('btn-danger')
    return "start"
  } else {
    $("#submit-button").text("Boopify!");
    $("#submit-button").removeClass('btn-danger')
    $("#submit-button").addClass('btn-success')
    return "stop"
  }
}
function throb(element,color) {
  $(element).css({
    'transform' : 'scaleX(1.15) scaleY(1.15)'
  })
  setTimeout(function(){
    $(element).css({
      'transform' : 'scaleX(1) scaleY(1)'
    })
    setTimeout(function(){
      $(element).css({
        'transform' : 'scaleX(1.1) scaleY(1.1)'
      })
      setTimeout(function(){
        $(element).css({
          'transform' : 'scaleX(1) scaleY(1)'
        })
      },100)
    },100)
  },100)
}
function showLoadLegend(index) {
  $('#bar-label').text(loadingPhrases[index])
}
function LoadingBar() {
  
  this.reset = function(){
    $('#loading-bar').css({
      'width' : '0%'
    });
    $('#loading-bar-bg').css({
      'width' : '100%'
    });
    $('#progress-card').css({
      'opacity':'0'
    });
    $('#progress-card').css({
      'display' : 'none'
    });
  }
  this.reveal = function(){
    gListing = true
    $('#progress-card').css({
      'opacity' : '1',
      'transform' : 'scaleX(1) scaleY(1)',
      'display' : 'inline-block'
    });
    $('.progress').css({
      'opacity' : '1'
    });
    $('#bar-label').css({
      'opacity' : '1'
    });
    showLoadLegend(0);
    gTimeouts.push(setTimeout(function(){
      $('#loading-bar').css({
        'width' : '100%'
      });
      $('#loading-bar-bg').css({
        'width' : '0%'
      });
      showLoadLegend(1);
      gTimeouts.push(setTimeout(function(){
        showLoadLegend(2);
        gTimeouts.push(setTimeout(function(){
          showLoadLegend(3);
          gTimeouts.push(setTimeout(function(){
            showLoadLegend(4);
            gTimeouts.push(setTimeout(function(){
              showLoadLegend(5);
              gTimeouts.push(setTimeout(function(){
                showLoadLegend(6);
                gTimeouts.push(setTimeout(function(){
                  showLoadLegend(7);
                  displayBoopedList(gUserNumber);
                  loadingBar.reset()
                },1200));
              },1200));
            },1200));
          },1200));
        },1200));
      },1200));
    },1000));
  }
}
function animateIntro() {
  $('.container').css({
    'opacity':'1'
  })
  $('body').css({
    'transform':'scaleX(1) scaleY(1)',
    'opacity':'1'
  })
}
