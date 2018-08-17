$(function(){
  $("#submit-button").click(function(){
    displayBoopedList($('#number-input').val())
  })
})

function boopify(userInput) {
  var output = []
  var toList = parseInt(userInput)
  for (var i=0; i<=toList; i++) {
    var numString = i.toString()
    var toPass = numString
    if (i > 0 && i % 3 === 0) {
      toPass = "I'm sorry, Dave. I'm afraid I can't do that."
    } else if (numString.includes("1")) {
      toPass = "Boop!"
    } else if (numString.includes("0")) {
      toPass = "Beep!"
    }
    output.push(toPass)
  }
  if (document.getElementById('reverseCheck').checked) {
    output = output.reverse()
  }
  return output
}
function displayBoopedList(userNumber) {
  $('#display').html("")
  var list = boopify(userNumber)
  var delay = 0;
  list.forEach(function(item,i){
    if (item === "Beep!") {
      item = `<span class="beep">Beep!</span>`
    } else if (item === "Boop!") {
      item = `<span class="boop">Boop!</span>`
    } else if (item[0] === "I") {
      item = `<span class="dave">I'm sorry, Dave. I'm afraid I can't do that.</span>`
    }
    var extraClass = ""
    if (i % 2 === 0) {
      extraClass = " gray"
    }
    $('#display').append('<div id="num-'+i+'" class="display-number'+extraClass+'">'+item+'</div>')

  })
  if (document.getElementById('fancyCheck').checked) {
    $(".display-number").css({
      'opacity' : 0,
    })
    console.log("fancy")
    var delay = 80

    list.forEach(function(item,i){
      setTimeout(function(){
        $('#num-'+i).animate({
          'opacity' : 1,
        },100)
      },delay)
      delay += 80
    })
  }
}
