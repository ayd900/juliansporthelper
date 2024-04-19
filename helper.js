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

console.log("version 15: tomorrow will test");

const printer = new  epson.ePOSDevice();

const ipSecondAddress = "192.168.1.51";
const ipFirstAddress = "192.168.1.60";
const port = "8080";

document.getElementById("printCall1").addEventListener("click", ()=>{
    printer.connect(ipFirstAddress, port, connected2, true);
    console.log("printer1 selected")
})

document.getElementById("printCall2").addEventListener("click", ()=>{
    printer.connect(ipSecondAddress, port, connected2, true);
    console.log("printer2 selected");
})

document.getElementById("test2").addEventListener("click", ()=>{
    printer.connect(ipSecondAddress, port, connected2, true);
})

function connected2(state) {
    const deviceId = "local_printer";
    const options = {'crypto' : false, 'buffer' : false};
    document.getElementById("state").innerText = state;
    if (state === "OK" || state === "SSL_CONNECT_OK") {
        printer.createDevice(deviceId, printer.DEVICE_TYPE_PRINTER, options, callback_createDevice2);
    } else {
        document.getElementById("state").innerText = state;
    }
}

let printerdevice2 = null;

function callback_createDevice2(deviceObj, errorCode) {
    document.getElementById("extrainfo").innerText = "Device objecT: " + deviceObj + ". ErrorCode: " + errorCode;
    if (deviceObj == null) {
        document.getElementById("deviceobj").innerText = "COULDNT RETRIEVE PRINTER: " + errorCode;
    } else {
        printerdevice2 = deviceObj;
        testData();
        send2();
    }

    printerdevice2.onreceive = function (response) {
        document.getElementById("sucprint").innerText =
            "Success: " + response.success + ". Error Code: " + response.code + ". " +
            "Status: " + response.status + ". Battery: " + response.battery
            + ". JobID: " + response.printjobid;
    }
}

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

function deleted() {
    console.log("successfully deleted");
}

function createData() {
    printerdevice.addText("JULIAN SPORT FLOCAGES");
    printerdevice.addFeedLine(1);
    printerdevice.addText("NOM: " + document.getElementById("nom").value);
    printerdevice.addFeedLine(1);
    printerdevice.addText("NUM: " + document.getElementById("num").value);
    printerdevice.addFeedLine(1);
    printerdevice.addText("COLOR: " + document.querySelectorAll("[value='" + document.getElementById("color").value + "']")[0].innerText);
    printerdevice.addFeedLine(1);
    printerdevice.addText("POLICE: " + document.getElementById("font").value);
    printerdevice.addFeedLine(1);
    printerdevice.addText("TEL: " + document.getElementById("tel").value);
    printerdevice.addFeedLine(1);
}

function testData() {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const formatterd = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const formattedTime = formatter.format(date);
    const formattedDate = formatterd.format(date);
    printerdevice2.addTextAlign(printerdevice2.ALIGN_CENTER);
    printerdevice2.addTextSize(3,3);
    printerdevice2.addText("JULIAN SPORT");
    printerdevice2.addFeedLine(1);
    printerdevice2.addText("FLOCAGES");
    printerdevice2.addFeedLine(3);
    printerdevice2.addTextSize(2,2);
    printerdevice2.addTextAlign(printerdevice2.ALIGN_LEFT);
    printerdevice2.addText("Le " + formattedDate + " a " + formattedTime);
    printerdevice2.addTextSize(2,2);
    printerdevice2.addFeedLine(1);
    printerdevice2.addText("NOM: " + document.getElementById("nom").value);
    printerdevice2.addFeedLine(1);
    printerdevice2.addText("NUM: " + document.getElementById("num").value);
    printerdevice2.addFeedLine(1);
    printerdevice2.addText("COLOR: " + document.querySelectorAll("[value='" + document.getElementById("color").value + "']")[0].innerText);
    printerdevice2.addFeedLine(1);
    printerdevice2.addText("POLICE: " + document.getElementById("font").value);
    printerdevice2.addFeedLine(1);
    printerdevice2.addText("TEL: " + document.getElementById("tel").value);
    printerdevice2.addFeedLine(7);
    printerdevice2.addCut(printerdevice2.CUT_FEED);
}

function send2() {
    if (printer.isConnected) {
        printerdevice2.send();
    }
}

function send() {
    if (printer.isConnected) {
        printerdevice.send();
    }
}

document.getElementById("image").addEventListener("click", ()=>{
    printer.connect(ipSecondAddress, port, connected3, true);
})

printerdevice3 = null;

function addImage() {
    let image = document.querySelector("img");
    let canvas = document.querySelector("canvas");
    let ctx = canvas.getContext("2d");
    ctx.drawImage(
        image,
        0,0, 400, 400
    );
    printerdevice3.addPageBegin();
    printerdevice3.addPageArea(0, 0, 3000, 3000);
    printerdevice3.addPagePosition(0, 0);
    printerdevice3.addImage(ctx, 0, 0, 400, 400);
    printerdevice3.addPageEnd();
    printerdevice3.addCut(printerdevice3.CUT_FEED);
}

function connected3(state) {
    const deviceId = "local_printer";
    const options = {'crypto' : false, 'buffer' : false};
    document.getElementById("state").innerText = state;
    if (state === "OK" || state === "SSL_CONNECT_OK") {
        printer.createDevice(deviceId, printer.DEVICE_TYPE_PRINTER, options, callback_createDevice3);
    } else {
        document.getElementById("state").innerText = state;
    }
}

function callback_createDevice3(deviceObj, errorCode) {
    document.getElementById("extrainfo").innerText = "Device objecT: " + deviceObj + ". ErrorCode: " + errorCode;
    if (deviceObj == null) {
        document.getElementById("deviceobj").innerText = "COULDNT RETRIEVE PRINTER: " + errorCode;
    } else {
        printerdevice3 = deviceObj;
        addImage();
        send3();
    }

    printerdevice3.onreceive = function (response) {
        document.getElementById("sucprint").innerText =
            "Success: " + response.success + ". Error Code: " + response.code + ". " +
            "Status: " + response.status + ". Battery: " + response.battery
            + ". JobID: " + response.printjobid;
    }
}

function send3() {
    if (printer.isConnected) {
        printerdevice3.send();
    }
}

