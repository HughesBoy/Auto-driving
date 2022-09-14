const canvas = document.querySelector('#canvas1');
// canvas.height = window.innerHeight;
canvas.width = 200;

const ctx = canvas.getContext("2d");

//make new road in center

const road = new Road(canvas.width/2, canvas.width);
                      //originally was 100, but wanted to center car in lane regardless of lane count
const car = new Car(road.findCenterLane(1),100,30,50);

animate();

function animate(){
  car.update(road.borders);
  //resize the window if screen is manipulated
  canvas.height = window.innerHeight;
  
  ctx.save();
  ctx.translate(0, -car.y + canvas.height * 0.55);

  road.draw(ctx);
  car.draw(ctx);
  ctx.restore();

  requestAnimationFrame(animate);
}
