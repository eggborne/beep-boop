$(function(){
  $("#submit-button").click(function(){
    var userNumber = $('#number-input').val()
    displayBoopedList(userNumber)
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
  list.forEach(function(item,i){
    $('#display').append(item+'<br />')
  })
}
