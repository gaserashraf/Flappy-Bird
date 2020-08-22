

// play again btn
var btnPA=document.getElementById("playAgain");
btnPA.onclick=function()
{
    location.reload();
}
var RestBtn=document.getElementById("restBtn");
RestBtn.onclick=function()
{
    location.reload();
}
var canvas=document.querySelector("canvas");
canvas.width=window.innerWidth/2;
canvas.height=window.innerHeight/2+100;


var c=canvas.getContext("2d");
/*window.addEventListener("resize",function(){
    canvas.width=window.innerWidth/2;
    canvas.height=window.innerHeight;
})*/

function Bar(x1,y1,w1,h1,x2,y2,w2,h2,speed)
{
    this.x1=x1;
    this.y1=y1;
    this.w1=w1;
    this.h1=h1;
    this.x2=x2;
    this.y2=y2;
    this.w2=w2;
    this.h2=h2;
    this.speed=speed;
    this.draw=function()
    {
        c.fillStyle="green";
        

        var img2=new Image();
        img2.src="img/pv.png";
        c.drawImage(img2,this.x1,this.y1,this.w1,this.h1);
        c.drawImage(img2,this.x2,this.y2,this.w2,this.h2);
    }
    this.update=function()
    {
        this.x1=this.x1-this.speed;
        this.x2=this.x2-this.speed;
        this.draw();
    }
}

var width=50,height1=50+Math.floor(Math.random()*100),
    gap=100+Math.floor(Math.random()*70),
        height2=canvas.height-height1-gap;
var Arrbar=[];
var speedBars=2; // intial speed
Arrbar.push(new Bar(canvas.width,0,width,height1,canvas.width,canvas.height-height2,width,height2,speedBars)); // put the first bar

// update value to next bar
function UpdateValue()
{
    width=50;
    height1=50+Math.floor(Math.random()*100);
    gap=100+Math.floor(Math.random()*70);
    height2=canvas.height-height1-gap;
}



// img for lose
var died=new Image();
died.src="img/d.png";
// shape player
function Player(x,y,width,img)
{
    this.x=x;
    this.y=y;
    this.width=width;
    this.lose=false;
    this.img=new Image();
    this.img.src=img;
    this.draw=function()
    {
        
        c.drawImage(this.img,this.x,this.y,this.width,this.width);
        
        //console.log(this.x);
    }
    var sp=5;
    var pro=this;
    this.update=function()
    {
        window.onkeydown=function(e)
        {
            switch(e.keyCode) {
                case 37:// left key pressed
                    if(pro.x-sp>0)
                        pro.x=pro.x-sp;
                    break;
                case 38:
                    // up key pressed
                    if(pro.y-sp>0)
                        pro.y-=sp;
                    break;
                case 39:
                    // right key pressed
                    if(pro.x+sp+pro.width<canvas.width)
                        pro.x+=sp;

                    break;
                case 40:
                    // down key pressed
                    if(pro.y+sp+pro.width<canvas.height)
                        pro.y+=sp;
                    break;  
            }   
        }
        /*window.addEventListener("keydown", function(e){
            console.log(sp);
            
            console.log(pro.x,pro.y);
        });*/

        this.draw();
    }
    this.die=function()
    {
        c.clearRect(0,0,canvas.width,canvas.height);
        background.render();
        c.drawImage(died,player.x,player.y,player.width,player.width); 
    }
}
// background
var bgImg = new Image();
bgImg.src = "img/bg1.jpg";
function Background(){
    this.x = 0, this.y = 0, this.w = bgImg.width, this.h = bgImg.height;
    this.render = function(){
        //c.drawImage(bg, this.x-=speedBars, 0);
            // draw image 1 
        c.drawImage(bgImg,this.x, 0); 
  
        // draw image 2 
        c.drawImage(bgImg, canvas.width+this.x, 0); 
  
        // update image height 
        this.x -= speedBars; 
  
        // reseting the images when the first image entirely exits the screen 
        if (this.x <=-canvas.width) 
        {
            this.x = 0; 
        }
    }
}
var background = new Background();
var player=new Player(0,canvas.height/2-10,50,"img/b.png");
var score =0;
c.fillStyle="#eba80b";
c.font = "30px Arial";
c.fillText("Your score : "+score, 10, 50);
var x=0;
var exit=false;

// game over
var btn=document.getElementById("gameOver");
function animate()
{
    var id=requestAnimationFrame(animate);
    c.save();
    c.clearRect(0,0,canvas.width,canvas.height);
    background.render();
    for(var i=0;i<Arrbar.length;i++)
        Arrbar[i].update();
    
    if(Arrbar[x].x1<canvas.width/2)// make a new bar
    {
        UpdateValue();
        Arrbar.push(new Bar(canvas.width,0,width,height1,canvas.width,canvas.height-height2,width,height2,speedBars));
        x=x+1;

    }
    else if(Arrbar[0].x1+Arrbar[0].w1<0)
    {
        Arrbar.shift();
        x=x-1;
        
    }
    player.update(); 
    for(var i=0;i<Arrbar.length;i++)
    {
        if(Arrbar[i].x1<player.x+player.width&&player.x<Arrbar[i].x1)
        {
            if(Arrbar[i].y1+Arrbar[i].h1>player.y||Arrbar[i].y2<player.y+player.width)
                {
                    
                    player.die();
                    for(var i=0;i<Arrbar.length;i++)
                    Arrbar[i].update();
                    btn.click();
                    document.getElementById("score").textContent="Your score : "+score;
                    cancelAnimationFrame(id);
                }
        }
    }  
     
    score++;
    if(score%500==0)
    {
        if(speedBars<5)
        {
            for(var i=0;i<Arrbar.length;i++)
                Arrbar[i].speed+=.5;
            speedBars+=.5;
        }
    }
    c.fillStyle="#eba80b";
    c.fillText("Your score : "+score, 10, 50);
    
}
animate();
player.draw();

