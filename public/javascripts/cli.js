//JS MQTT
// Create a client instance
//client = new Paho.MQTT.Client("broker.mqttdashboard.com", Number(8000), "guima10");
client = new Paho.MQTT.Client("broker.emqx.io", Number(8084), "guima10");
// connection options - for EMQX - these data are enough, even using wss / ssl
var options = {
	useSSL: true,
  userName : "guima10"+String(Math.floor(Math.random() * 100)),
  password : "teste123",
  onSuccess: onConnect,
    };
//TLS Config
//TLS_CERT_PATH = "/javascripts/broker.emqx.io-ca.crt"


// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect(options);


// called when the client connects
function onConnect() {
  // Once a connection has been made, subscribe to channels
  console.log("onConnect");

  // Recursive function for subscribing to 18 channels
  function subscribeRecursion(i) {
    if (i==19) return i;
    client.subscribe('dash/canal'+String(i));
    subscribeRecursion(i+1)
  }
  subscribeRecursion(1)
}

// simulate values for input elements
function simulateInputs() {
  //Random number in range (min,max)/100
  var rdm = function(min, max) {

    return (Math.floor(Math.random()*(max - min + 1)) + min)/100;
  }
  chanList = ['dash/canal1','dash/canal2','dash/canal3','dash/canal7','dash/canal8','dash/canal9']
  var intervalHandler = setInterval(function () {
    for (let t of chanList){
      message = new Paho.MQTT.Message(String(rdm(0,100)));
      message.destinationName = t;
      client.send(message);
    }
  }, 5000);

}


// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  
  // Input channels Choice 
  var reading;
  switch(message.destinationName) {
  	case "dash/canal1":
      reading = message.payloadString;
      document.getElementById('canal1').value = reading;
      document.getElementById('Medida1').innerText = reading;
    break;
	  case "dash/canal2":
      reading = message.payloadString;
      document.getElementById('canal2').value = reading;
      document.getElementById('Medida2').innerText = reading;
    break;
	  case "dash/canal3":
      reading = message.payloadString;
      document.getElementById('canal3').value = reading;
      document.getElementById('Medida3').innerText = reading;
    break;
	default:
		// code block
	}
}

// Output Sliders Show Value 
//document.getElementById('slider1').value = reading;
//document.getElementById('sld11').innerText = reading;
  var slide1 = document.getElementById('slider1'),
      sliderDiv1 = document.getElementById('sld1');
      
  slide1.onchange = function() {
      sliderDiv1.innerHTML = this.value;
      message = new Paho.MQTT.Message(String(this.value));
		  message.destinationName = "dash/canal4";
		  client.send(message);
  }

  var slide2 = document.getElementById('slider2'),
      sliderDiv2 = document.getElementById('sld2');
      
  slide2.onchange = function() {
      sliderDiv2.innerHTML = this.value;
      message = new Paho.MQTT.Message(String(this.value));
		  message.destinationName = "dash/canal5";
		  client.send(message);
  }

  var slide3 = document.getElementById('slider3'),
      sliderDiv3 = document.getElementById('sld3');
      
  slide3.onchange = function() {
      sliderDiv3.innerHTML = this.value;
      message = new Paho.MQTT.Message(String(this.value));
		  message.destinationName = "dash/canal6";
		  client.send(message);
  }


// Output Channels
function ch7() {
  // Get the checkbox
  var checkBox = document.getElementById("canal7");
  // If the checkbox is checked, display the output text
  if (checkBox.checked == false){
		message = new Paho.MQTT.Message("0");
		message.destinationName = "dash/canal7";
		client.send(message);
  } else {
	  	message = new Paho.MQTT.Message("1");
		message.destinationName = "dash/canal7";
		client.send(message);
  }
}

function ch8() {
  // Get the checkbox
  var checkBox = document.getElementById("canal8");
  // If the checkbox is checked, display the output text
  if (checkBox.checked == false){
		message = new Paho.MQTT.Message("0");
		message.destinationName = "dash/canal8";
		client.send(message);
  } else {
	  	message = new Paho.MQTT.Message("1");
		message.destinationName = "dash/canal8";
		client.send(message);
    
  }
}

function ch9() {
  // Get the checkbox
  var checkBox = document.getElementById("canal9");
  // If the checkbox is checked, display the output text
  if (checkBox.checked == false){
		message = new Paho.MQTT.Message("0");
		message.destinationName = "dash/canal9";
		client.send(message);
  } else {
	  	message = new Paho.MQTT.Message("1");
		message.destinationName = "dash/canal9";
		client.send(message);
    
  }
}

