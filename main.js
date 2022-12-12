var video="";
var status="";
var object=[];
function preload(){
    video=createVideo('video.mp4');
    video.hide();
}
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
}
function draw(){
    image(video,0,0,480,380);
    if (status!="") {
        object_detected.detect(video,gotresult);
        for (i=0;i<object.length;i++)
        {
            document.getElementById("status").innerHTML="Status: Object Detected";
            document.getElementById("numberofobjects").innerHTML="There are "+object.length+" objects that have been detected";
            fill("#ff0000");
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke("#60d2ff");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }     
        }
    }
function start(){
    object_detected=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model is Loaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotresult(error,results){
    if (error) {
        console.error(error);
    }
    else{
        console.log(results);
        object=results;
    }
}