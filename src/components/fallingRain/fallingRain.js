
export default function sketch (p) {
   let drops = []
   p.setup = function(){
       p.createCanvas(p.windowWidth, p.windowHeight);
       for(let i=0; i<100; i++){
           drops.push( new Drop())
       }
   }
   p.draw = function(){
       p.background('#CB9FDB');
       for(let i=0; i<drops.length; i++){
           drops[i].fall();
           drops[i].show();
       }
   }
   class Drop{
       constructor(){
           this.x = p.random(p.width)
           this.y = p.random(-200, -100)
           this.z = p.random(0, 20)
           this.speed = p.map(this.z, 0, 20, 4, 10)
           this.len = p.map(this.z, 0, 20, 10, 20)
       }
       fall(){
           this.y = this.y + this.speed
           this.speed = this.speed + 0.01
           if(this.y > p.height){
               this.y = p.random(-200, -100)
               this.speed = p.map(this.z, 0, 20, 4, 10)
           }
       }
       show(){
           let thick = p.map(this.z, 0, 20, 1, 3)
           p.strokeWeight(thick)
           p.stroke(138, 43, 226)
           p.line(this.x, this.y, this.x, (this.y + this.len))
       }
   }
}