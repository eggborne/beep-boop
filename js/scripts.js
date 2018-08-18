var gTimeouts = []
$(function(){
  $('#submit-button').click(function(){
    cancelTimeouts()
    displayBoopedList($('#number-input').val());
  })
  $('#lightTheme').click(function(){
    switchTheme("light");
  })
  $('#darkTheme').click(function(){
    switchTheme("dark");
  })
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
  $('#display').html("");
  var list = boopify(userNumber);
  var delay = 0;
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
  if (document.getElementById('fancyCheck').checked) {
    $(".display-number").css({
      'opacity' : 0,
      'height': 0,
      'display' : 'none'
    });
    var delay = 0;
    list.forEach(function(item,i){
      var timeout = setTimeout(function(){
        $('#num-'+i).css({'display' : 'block'});
        $('#num-'+i).animate({
          'opacity' : 1,
          'height': "2em",
        },200);
      },delay);
      gTimeouts.push(timeout)
      delay += 100;
    });
  }
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
function animateIntro() {
  $('.container').css({
    'opacity':1,
  })
  $('body').css({
    'transform':'scaleX(1) scaleY(1)',
    'opacity':1
  })
}
