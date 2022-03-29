status1="";
object=[];
r=0;
g=0;
b=0;
song="";
function preload(){
    song=loadSound("alarm.mp3");
}
function setup(){
    canvas=createCanvas(350,400);
    canvas.position(580,160);
    video=createCapture(VIDEO);
    video.size(350,400);
    video.hide();
    modal=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";
    document.getElementById("status1").innerHTML="Baby not found";
}
function modelloaded(){
    console.log("Modal is loaded");
    status1=true;
}
function gotResults(error,results)
{
if(error){
console.log(error); 
}
else{
console.log(results);

object=results;
}
}
function draw(){
    image(video,0,0,350,400);
    if(status1=true){
        r=random(255);
        g=random(255);
        b=random(255);
        modal.detect(video,gotResults);
    for(i=0;i<object.length;i++){
    
     document.getElementById("status").innerHTML="Status: Object Detected";
    fill(r,g,b);
    confidence=floor(object[i].confidence*100);
    text(object[i].label+""+confidence+"%",object[i].x,object[i].y);
    textSize(20);
    noFill();
    stroke(r,g,b);
    rect(object[i].x,object[i].y,object[i].width,object[i].height);
    if(object[i].label=="person"){
        document.getElementById("status1").innerHTML="Baby found";
        song.stop();
    }
        else{
            document.getElementById("status1").innerHTML="Baby not found";
            song.play();
        }
    
    }
    }
}


