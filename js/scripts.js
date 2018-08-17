$(function(){
  $("#submit-button").click(function(){
    var userNumber = $('#number-input').val()
    console.log(boopify(userNumber))
  })
})

function boopify(userInput) {
  var output = []
  var toList = parseInt(userInput)

  for (var i=0; i<=toList; i++) {
    var num = i.toString()
    var toPass = num
    if (i > 0 && i % 3 === 0) {
      toPass = "I'm sorry, Dave. I'm afraid I can't do that."
    } else if (num.includes("1")) {
      toPass = "Boop!"
    } else if (num.includes("0")) {
      toPass = "Beep!"
    }
    output.push(toPass)
  }
  if (document.getElementById('reverseCheck').checked) {
    output = output.reverse()
  }
  return output
}
