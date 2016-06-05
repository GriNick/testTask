(function() {
var contacts = [
{
	name: "Bob",
	icon: 'images/contact1.png',
	icon_large: 'images/contact1_large.png',
	messages: []
},
{
	name: "Jarry",	
	icon: 'images/contact2.png',
	icon_large: 'images/contact2_large.png',
	messages: []
},
{
	name: "Jonatan",
	icon: 'images/contact3.png',
	icon_large: 'images/contact3_large.png',
	messages: [	  
	  {
	  	text: "Who says this is not the greatest chat app on earth? My avatar looks amazing!",
	  	my: false,
	  	isNew: false
	  },
	  {
	  	text: "My mom says its to hard to use... oh and ur avatar is from Jozef Krajčovič looks just like u!",
	  	my: true,
	  	isNew: false
	  },
	  {
	  	text: "Well she is 90 and old school.",
	  	my: false,
	  	isNew: false
	  },
	  {
	  	text: "Yeah I know but the funny thing is she's always on  the facebook messenger app and this is 10 times easier to use plus it looks pretty ",
	  	my: true,
	  	isNew: false
	  },
	  {
	  	text: "Hey I have an idea... how about you post this shot on Dribbble  and get some feedback?",
	  	my: false,
	  	isNew: false
	  },	
	  {
	  	text: "Great idea I’m sure this will be loved by the dribbble players",
	  	my: true,
	  	isNew: false
	  },	
	  {
	  	text: "Make sure to tag it dailyui",
	  	my: false,
	  	isNew: false
	  }]
},
{
	name: "Mike",
	icon: 'images/contact4.png',
	icon_large: 'images/contact4_large.png',
	messages: []
},
{
	name: "Suzanne",
	icon: 'images/contact5.png',
	icon_large: 'images/contact5_large.png',
	messages: []
},
{
	name: "Tom",
	icon: 'images/contact6.png',
	icon_large: 'images/contact6_large.png',
	messages: []
}
];

var activeContact =0;
var myId=1;


function loadContactsList() {
   contacts.forEach(function(p,i) { 
      if (i==myId) return;  	  
   	  var el = document.createElement('div');
   	  var cIcon = $(el).attr('id','contact-icon'+(i+1)).addClass('contact-icon').css('background-image', 'url('+p.icon+')');   	  

   	  el = document.createElement('div');
   	  var cText = $(el).attr('id','contact-text'+(i+1)).addClass('contact-text').text(p.name);
   	  el = document.createElement('a');
   	  var a = $(el).attr('id','contact'+(i+1)).addClass('contact').append(cIcon,cText);
   	  if (i==(contacts.length-1) ) a.css('border-bottom-left-radius', '10px');
   	  a.click(function() {
   	  	switchContact(i);
   	  	});
   	  el = document.createElement('li');
   	  var li = $(el);
   	  var el =li.append(a);
   	  $('.contacts').append(el);

   	  el = $(document.createElement('div')).attr('id','chat'+(i+1)).addClass('chat hidden');
   	  el.insertBefore($('.send-message'));
   	  p.messages.forEach(function(m) {
   	  	displayMessage(m,i);
/*   	  	var msg = $(document.createElement('div')).addClass('message');
   	  	if (m.my) msg.addClass('my-message'); else msg.addClass('opp-message');
   	  	var msgP = $(document.createElement('p')).text(m.text);
   	  	msg.append(msgP);
   	  	el.append(msg);*/
   	  });   	  
   });
   switchContact(activeContact);
   $('#send_input').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        var msg = {
        	text: $('#send_input').val(),
        	my: true,
        	isNew: false
        };
        sendMessage(msg)
        //displayMessage(msg);
        

        var msg_answer = {
        	text: msg.text,
        	my: false,
        	isNew: false
        };   
        $('#send_input').val('')     

        setTimeout(function() {
        	sendMessage(msg_answer);
        },1000);
    }
});	
};

function switchContact(id) {
  $('.contact').css('background-color','#ebecf9')
  $('#contact'+(id+1)).css('background-color','#fff');
  $('#chat'+(activeContact+1)).addClass('hidden');
  $('#chat'+(id+1)).removeClass('hidden');  
  $('#active_user_name').text(contacts[id].name);
  $('.active-user-icon').css('background-image', 'url('+contacts[id].icon_large+')');
  activeContact = id;
}

function displayMessage(m,cIdx) {
	    var el=$('#chat'+(cIdx+1));
	    var msg = $(document.createElement('div')).addClass('message');
   	  	if (m.my) msg.addClass('my-message').css('background-image','url('+contacts[myId].icon+')'); 
   	  	else msg.addClass('opp-message').css('background-image', 'url('+contacts[cIdx].icon+')');
   	  	var msgP = $(document.createElement('p')).text(m.text);
   	  	msg.append(msgP);
   	  	$(document.createElement('div')).addClass('clearfix').insertAfter(msgP);
   	  	el.append(msg);
}

function sendMessage(m) {
	contacts[activeContact].messages.push(m);
	displayMessage(m,activeContact);
}

loadContactsList();
$(document).ready(function() {
	var menu = $('.sb-left').outerHeight();	
	$('.sb-right').outerHeight(menu);
	$('.chat').outerHeight(menu-50);
	});


/*$( window ).resize(function() {
   var parent = $('.content').height();
	$('.sb-left').height(parent);
	$('.sb-right').height(parent);
	});
$( window ).scroll(function() {
   var parent = $('.content').height();
	$('.sb-left').height(parent);
	$('.sb-right').height(parent);
	});*/

})();