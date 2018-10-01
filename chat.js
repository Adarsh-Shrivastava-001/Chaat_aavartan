var me = {};
me.avatar = "robot.png";

var you = {};
you.avatar = "me.png";

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}            

//-- No use time. It is a javaScript effect.
function insertChat(who, text, time){
    if (time === undefined){
        time = 0;
    }
    var control = "";
    var date = formatAMPM(new Date());
    
    if (who == "bot"){
        
        control = '<li style="width:100%">' +
                        '<div class="msj macro">' +
                        '<div class="avatar"><img class="img-circle" style="width:100%;" src="'+ me.avatar +'" /></div>' +
                            '<div class="text text-l">' +
                                '<p>'+ text +'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';                    
    }else{


        control = '<li style="width:100%;">' +
                        '<div class="msj-rta macro">' +
                            '<div class="text text-r">' +
                                '<p>'+text+'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="'+you.avatar+'" /></div>' +                                
                  '</li>';

                  loadDoc()
    }
    setTimeout(
        function(){                        
            $("ul").append(control).scrollTop($("ul").prop('scrollHeight'));
        }, time);
    
}

function resetChat(){
    $("ul").empty();
}

$(".mytext").on("keydown", function(e){
    if (e.which == 13){
        var text = $(this).val();
        if (text !== ""){
            insertChat("me", text);              
            $(this).val('');
        }
    }
});


$(".submit_btn").on("click", function(e){
    
        var text = document.getElementById("mytext");
        console.log(text)
        if (text !== ""){
            insertChat("me", text);              
            document.getElementById("mytext")="";
        
    }
});

$('body > div > div > div:nth-child(2) > span').click(function(){
    $(".mytext").trigger({type: 'keydown', which: 13, keyCode: 13});
})

//-- Clear Chat
resetChat();

//-- Print Messages
insertChat("bot", "Hello pal...", 0);  



//-- NOTE: No use time on insertChat.







var btn = document.querySelector('#submit_btn')


function loadDoc() {
  $.ajax({
  type: 'POST',
  url: 'https://adarshshrivastava001.pythonanywhere.com/bot/',
  data: {'que':document.getElementById("mytext").value},
  dataType: 'json',
  success: function (data) {
          console.log(data)
          insertChat("bot",data.ans,0)
          if(data.sug1){
            ans="<b>Here are some FAQ for your refernce</b><br><br><ol><li class='sug1'>"+data.sug1+"</li><br><li class='sug2'>"+data.sug2+"</li><br><li class='sug3'>"+data.sug3+"</li><br><li class='sug4'>"+data.sug4+"</li><br><li class='sug5'>"+data.sug5+"</li></ol>"
            insertChat("bot",ans,0)
          }
          
          
          
        }
});


}

btn.addEventListener('click',e=>{
  e.preventDefault()
  var text=document.getElementById("mytext").value;
  if(text!==""){
  insertChat("me",text,0);
  document.getElementById("mytext").value="";
}

})


