ticTacToe = {
  "yourchoice" : "X",
  "botchoice" : "O",
  "count" : 0,
  "matchPlayed" : 0,
  //"winorlose" : {'1' : '', '2' : '', '3' : '', '4' : '', '5' : '', '6' : '', '7' : '', '8' : '', '9' : ''}
  "winorlose" : ['', '', '', '', '', '', '', '', ''],
  "query" : 0,
}

function playerchoice(value){
  var value = value.value
  if(value === "O" && ticTacToe.count==0){
    ticTacToe.yourchoice = "O"
    ticTacToe.botchoice = "X"
  }
}

function entervalue(value){
  count=1
  if(ticTacToe.query == 0){
    var button = value.id
    fillitbyvalue(button,ticTacToe.yourchoice)
    whowins(ticTacToe.winorlose)
    if(ticTacToe.winorlose.indexOf('') != -1 && ticTacToe.query == 0){
      botplay()
      whowins(ticTacToe.winorlose)
    }
  }
}

function randombutton(){
  var random = Math.floor(Math.random()*9)
  while(ticTacToe.winorlose[random] != ''){
    random = Math.floor(Math.random()*9)
  }
  return random+1+""
}

function botplay(){
  button = "xo-"+randombutton()
  fillitbyvalue(button,ticTacToe.botchoice)
}

function fillitbyvalue(button,choice){
  document.getElementById(button).remove()
  ticTacToe.winorlose[parseInt(button[3])-1] = choice
  var div = document.createElement("div")
  var h3 = document.createElement("h3")
  var ans = document.createTextNode(choice)
  h3.appendChild(ans)
  div.appendChild(h3)
  div.setAttribute("class","xo")
  div.setAttribute("id",button)
  document.getElementById("td-"+button).appendChild(div)
}

function reset(){
  if(ticTacToe.winorlose.indexOf("") == -1 || ticTacToe.query == 1){
    ticTacToe.query = 0
    ticTacToe.matchPlayed += 1
    ticTacToe.winorlose = ['', '', '', '', '', '', '', '', '']
    for(var i=1;i<=9;i++){
      document.getElementById("xo-"+i).remove()
      var button = document.createElement("button")
      button.setAttribute("class","xo")
      button.setAttribute("id","xo-"+i)
      button.setAttribute("onclick","entervalue(this)")
      document.getElementById("td-xo-"+i).appendChild(button)
    }
    document.getElementById("tic-result-1").remove()
    var div = document.createElement("div")
    div.setAttribute("id","tic-result-1")
    document.getElementById("tic-result").appendChild(div)
    if(ticTacToe.matchPlayed%2 == 1){
      botplay();
    }
  }
}

function whowins(board) {
  var flag = 0
  for(var i=0;i<7;i+=3){
    if(board[i]==board[i+1] && board[i]==board[i+2]){
      if(board[i]=="X" || board[i]=="O"){
        ticTacToe.query = 1
        wins(board[i])
        return true
      }
      else{
        return false
      }
    }
    if(board[flag]==board[flag+3] && board[flag]==board[flag+6]){
      if(board[flag]=="X" || board[flag]=="O"){
        ticTacToe.query = 1
        wins(board[flag])
        return true
      }
      else{
        return false
      }
    }
    flag += 1
  }
  if((board[0]==board[4] && board[0]==board[8]) || (board[2]==board[4] && board[4]==board[6])){
    if(board[4]=="X" || board[4]=="O"){
      ticTacToe.query = 1
      wins(board[4])
      return true
    }
    else{
      return false
    }
  }
  if(board.indexOf("") == -1){
    wins("draw")
    return true
  }
  return false
}

function wins(choice){
  var ans
  var h3 = document.createElement("h3")
  var h4 = document.createElement("h3")
  if(choice==ticTacToe.yourchoice){
    ans = document.createTextNode("You wins")
  }
  else if(choice==ticTacToe.botchoice){
    ans = document.createTextNode("You loss")
  }
  else{
    ans = document.createTextNode("You draw")
  }
  h3.appendChild(ans)
  document.getElementById("tic-result-1").appendChild(h3)
  ans = document.createTextNode("You can change your icon now")
  h4.appendChild(ans)
  document.getElementById("tic-result-1").appendChild(h4)

}