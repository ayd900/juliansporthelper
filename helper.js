const filterButton = document.getElementById("viewFilter");
const resultFilterContainer = document.querySelector(".container");
let prevSelect = "belgique1";

filterButton.addEventListener("click", ()=>{
    let url = document.getElementById("url").value;
    let percentage = document.getElementById("perc").value;
    resultFilterContainer.innerHTML = "";

    var links = document.querySelectorAll('a.product-item-photo');

    links.forEach(function(link) {
        link.setAttribute('target', '_blank');
    });

    fetch(`https://delta-basis-414205.ew.r.appspot.com/api/rFilter?url=${url}&perc=${percentage}`)
    .then(response => response.text())
    .then(data => {
        document.getElementById("loading").style.visibility = "hidden";
        if (data.length == 0) {
            document.getElementById("loading").innerText = "NOTHING FOUND";
            document.getElementById("loading").style.visibility = "visible";
        } else {
            document.getElementById("loading").style.visibility = "hidden";
            document.getElementById("loading").innerText = "LOADING";
            resultFilterContainer.innerHTML = data;
        }
    })
    .catch(error => {
        document.getElementById("loading").style.visibility = "visible";
        document.getElementById("loading").innerText = "ERROR";
        console.error('Error:', error);
    });

    document.getElementById("loading").style.visibility = "visible";
    document.getElementById("loading").innerText = "LOADING";
});

// fix commit

const viewCall = document.getElementById("viewCall");
const maillotSelect = document.getElementById("maillot");
const colorSelect = document.getElementById("color");
const fontSelect = document.getElementById("font");

viewCall.addEventListener("click", ()=>{
    updateMaillot();
});

function updateMaillot() {
    document.getElementById("maillot1").style.display = "none";
    document.getElementById("maillot2").style.display = "none";
    document.getElementById("firstContainer").style.border = "5px solid black";
    document.getElementById("loadingfirst").style.display = "block";
    let fontName = document.getElementById("font").value;
    let fontColor = document.getElementById("color").value;
    let name = document.getElementById("nom").value;
    let num = document.getElementById("num").value;
    let imgName = document.getElementById("maillot").value;
    fetch(`https://delta-basis-414205.ew.r.appspot.com/api/getFlockedShirt?name=${name}&num=${num}&fontName=${fontName}&color=${fontColor}&imgName=${imgName}`)
        .then((response) => response.arrayBuffer())
        .then(arrayBuffer => {
            const uint8Array = new Uint8Array(arrayBuffer);
            const blob = new Blob([uint8Array], { type: 'image/png' });
            const imageUrl = URL.createObjectURL(blob);
            const img = document.getElementById("maillot1");
            img.src = imageUrl;
            document.getElementById("maillot1").style.display = "block";
            document.getElementById("loadingfirst").style.display = "none";
        })
        .catch(error => console.error('Error fetching image:', error));

    let apicall = "getFlockedShirt3";
    let euro24indexes = [0, 1, 2, 3, 4, 5, 6];

    if (euro24indexes.includes(maillotSelect.selectedIndex)) {
        apicall = "getFlockedShirt2"
    }

    document.getElementById("secondContainer").style.border = "5px solid black";
    document.getElementById("loadingsecond").style.display = "block";
    fetch(`https://delta-basis-414205.ew.r.appspot.com/api/${apicall}?num=${num}&fontName=${fontName}&color=${fontColor}&imgName=${imgName}`)
        .then((response) => response.arrayBuffer())
        .then(arrayBuffer => {
            const uint8Array = new Uint8Array(arrayBuffer);
            const blob = new Blob([uint8Array], { type: 'image/png' });
            const imageUrl = URL.createObjectURL(blob);
            const img = document.getElementById("maillot2");
            img.src = imageUrl;
            document.getElementById("maillot2").style.display = "block";
            document.getElementById("loadingsecond").style.display = "none";
        })
        .catch(error => console.error('Error fetching image:', error));
}

maillotSelect.addEventListener("change", (s)=>{
  const selectedValue = maillotSelect.value;
  switch(selectedValue) {
    case "belgique1":
      colorSelect.selectedIndex = 0;
      fontSelect.selectedIndex = 0;
      break;
    case "belgique2":
      colorSelect.selectedIndex = 7;
      fontSelect.selectedIndex = 0;
      break;  
    case "argentine1":
      colorSelect.selectedIndex = 1;
      fontSelect.selectedIndex = 0;  
      break;
    case "allemagne1":
      colorSelect.selectedIndex = 0;
      fontSelect.selectedIndex = 1;
      break;
    case "allemagne2":
      colorSelect.selectedIndex = 1;
      fontSelect.selectedIndex = 2;   
      break;
    case "espagne1":
      colorSelect.selectedIndex = 8;
      fontSelect.selectedIndex = 3;
      break;
    case "espagne2":
      colorSelect.selectedIndex = 9;
      fontSelect.selectedIndex = 3;
      break;   
    case "rm1":
      colorSelect.selectedIndex = 2;
      fontSelect.selectedIndex = 0;
      break;  
    case "rm2":
      colorSelect.selectedIndex = 6;
      fontSelect.selectedIndex = 0;
      break;       
  }
  if (document.getElementById("nom").value.length > 0 &&
  document.getElementById("num").value.length > 0 &&
  prevSelect !== selectedValue) {
      prevSelect = selectedValue;
      updateMaillot();
  }
});

document.getElementById("switchflock").addEventListener("click", ()=>{
    document.getElementById("flock-viewer").style.display = "block";
    document.getElementById("js-outlet").style.display = "none";
});

document.getElementById("switchoutlet").addEventListener("click", ()=>{
    document.getElementById("flock-viewer").style.display = "none";
    document.getElementById("js-outlet").style.display = "block";
});

document.addEventListener("click", (e)=>{
    let numInput = document.getElementById("num");
    let nomInput = document.getElementById("nom");
    if (e.target !== numInput &&
        e.target !== nomInput &&
        e.target !== maillotSelect &&
        e.target !== colorSelect &&
        e.target !== fontSelect &&
        e.target !== document.getElementById("prefix") &&
        e.target !== document.getElementById("tel") &&
        e.target !== document.getElementById("switchoutlet") &&
        e.target !== document.getElementById("switchflock") &&
        e.target !== document.querySelectorAll("img")[0] &&
        e.target !== document.querySelectorAll("img")[1] &&
        e.target !== document.getElementById("firstContainer") &&
        e.target !== document.getElementById("secondContainer") &&
        document.getElementById("nom").value.length > 0 &&
        document.getElementById("num").value.length > 0) {
        updateMaillot();
    }
})

// PRINTER CODE

const printer = new  epson.ePOSDevice();

const ipFirstAddress = "192.168.1.51";
const ipSecondAddress = "192.168.1.60";
const port = "8080";
console.log("version5");

printer.connect(ipFirstAddress, port, connected, true);

document.getElementById("printCall").addEventListener("click", ()=>{
    printer.connect(ipSecondAddress, port, connected, true);
})

function connected(state) {
    const deviceId = "local_printer";
    const options = {'crypto' : false, 'buffer' : false};
    document.getElementById("state").innerText = state;
    if (state === "OK" || state === "SSL_CONNECT_OK") {
        printer.createDevice(deviceId, printer.DEVICE_TYPE_PRINTER, options, callback_createDevice);
    } else {
        document.getElementById("state").innerText = state;
    }
}

let printerdevice = null;

function callback_createDevice(deviceObj, errorCode) {
    document.getElementById("extrainfo").innerText = "Device objecT: " + deviceObj + ". ErrorCode: " + errorCode;
    if (deviceObj == null) {
        document.getElementById("deviceobj").innerText = "COULDNT RETRIEVE PRINTER: " + errorCode;
    } else {
        printerdevice = deviceObj;
        createData();
        send();
    }

    printerdevice.onreceive = function (response) {
        document.getElementById("sucprint").innerText =
            "Success: " + response.success + ". Error Code: " + response.code + ". " +
            "Status: " + response.status + ". Battery: " + response.battery
            + ". JobID: " + response.printjobid;
    }
}

function createData() {
    printerdevice.addTextAlign(printerdevice.ALIGN_CENTER);
    printerdevice.addText("HELLO MOHAMED, HELLO CALOUUU, HELLO SOUHAIB, HELLO JULIAN SPORT\t");
}

function send() {
    if (printer.isConnected) {
        printerdevice.send();
    }
}

