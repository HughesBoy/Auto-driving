
class Car{
  constructor(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 3;
    this.friction = 0.05;

    this.angle = 0;

    
    this.sensor = new Sensor(this); //passing the car to the sensor since its parameter takes in car

    this.controls = new Controls();
  }

  update(roadBorders){

    this.#move();
    //this.sensor.update(roadBorders);


  }

  #move(){
    if(this.controls.forward){
      this.speed += this.acceleration;
    }
    if(this.controls.reverse){
      this.speed -= this.acceleration;
    }
    //cap the speed to the maxspeed
    if(this.speed > this.maxSpeed){
      this.speed = this.maxSpeed;
    }
    //the minus sign just means reverse in this case, not negative speed
    if(this.speed < -this.maxSpeed/2){
      this.speed = -this.maxSpeed/2;
    }

    if(this.speed > 0){
      this.speed -= this.friction;
    }

    if(this.speed < 0){
      this.speed += this.friction;
    }
    //optimization / bug fix on slowly moving up screen
    if(Math.abs(this.speed) < this.friction){
      this.speed = 0;
    }
    //cannot rotate if not moving, and update left/right controls if you do 180
    if(this.speed != 0){
      const flip = this.speed > 0 ? 1 : -1; //flip car 
      //left and right controls
      if(this.controls.left){
        this.angle += 0.03 * flip;
      }
      if(this.controls.right){
        this.angle -= 0.03 * flip;
      }
    }

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  draw(ctx){
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(-this.angle);

    ctx.beginPath();
    ctx.rect(-this.width/2, -this.height/2, this.width, this.height);
    ctx.fill();
    ctx.restore();

    //this.sensor.draw(ctx);
  }

}

