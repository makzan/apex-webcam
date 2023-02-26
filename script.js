let debug = document.querySelector("#debug");

function debugLog(s){
  $(debug).append(`<p>${s}</p>`);
}

$("#back-button").hide();
$("#show-picture").hide();

let scale = 4

let canvas = document.querySelector("#canvas");
canvas.width = 300 * scale;
canvas.height = 568 * scale;
var context = canvas.getContext('2d');

let overlay = new Image(500, 344);
overlay.src = "images/macao-dream.png";

setInterval(()=>{
  context.drawImage(video, 0, 0, 320 * scale, 568 * scale);
  context.drawImage(overlay, 32 * scale, 380 * scale, 250 * scale, 172 * scale);

}, 1000/30);

/* Code example from Mozilla: https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/API/Camera_API/Introduction */
var takePicture = document.querySelector("#take-picture");
takePicture.onclick = function (event) {

  // Get a reference to the taken picture or chosen file
  var files = event.target.files,
      file;
  if (files && files.length > 0) {
      file = files[0];
  }

  // Image reference
  var showPicture = document.querySelector("#show-picture");

  // Create ObjectURL
  // var imgURL = window.URL.createObjectURL(file);

  // Set img src to ObjectURL
  showPicture.src = canvas.toDataURL();


  canvas.toBlob(
    blob => {
      const anchor = document.createElement('a');
      // anchor.setAttribute('target', '_blank');
      // anchor.setAttribute('download', 'apex-dream.jpg');
      // anchor.href = URL.createObjectURL(blob);

      // window.open(anchor.href, "_blank");

      $("#take-picture").hide();
      $("#app").hide();

      $("#show-picture").show();

      setTimeout(() => {
        $("#back-button").show();
      }, 1500);

      // anchor.click();

      // URL.revokeObjectURL(anchor.href);
    },
    'image/jpeg',
    0.9,
  );


  // For performance reasons, revoke used ObjectURLs
  // URL.revokeObjectURL(imgURL);
};


$("#back-button").click(()=>{
  $("#take-picture").show();
  $("#app").show();
  $("#back-button").hide();
  $("#show-picture").hide();
});

/*document.querySelector('a[href="#start-video"]').addEventListener('click', ()=>{
  const video = document.querySelector('video#user-media');
navigator.mediaDevices.getUserMedia(constraints).
    then((stream) => {video.srcObject = stream});

});*/


// Get User Media
const constraints = {
  audio: false,
  video: {width: {exact: 1920}, height: {exact: 1080}},
};




const isWeChat = () => /MicroMessenger/i.test(window.navigator.userAgent);
if (isWeChat()) {
    // button.style.display = "none";
    document.querySelector("#wechat").style.display = "block";
    alert("Is WeChat");
} else {
  // Un-comment the following code with caution. It starts camera access right away.
  const video = document.querySelector('video#user-media');
  navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    video.srcObject = stream
    let {width, height} = stream.getTracks()[0].getSettings();
    debugLog(width);
    debugLog(height);
  });
}