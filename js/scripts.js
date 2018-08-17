var gridLayouts = {
  lowerTitle :
  [
    [[4,4,4],'100px']

  ]
}
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
    if (num.includes("0")) {
      toPass = "Beep!"
    }
    output.push(toPass)
  }
  return output
}
