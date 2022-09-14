class Road{
  constructor(x, width, lanes=3){
    this.x = x;
    this.width = width;
    this.lanes = lanes;
    this.left = x - width / 2;
    this.right = x + width / 2;

    //use big num for infinite
    const infinity = 1000000;
    this.top = -infinity;
    this.bottom = infinity;

    const topLeft = {x: this.left, y: this.top};
    const topRight = {x: this.right, y: this.top};
    const bottomLeft = {x: this.left, y: this.bottom};
    const bottomRight = {x: this.right, y: this.bottom};
    //add borders 
    this.borders = [
        [topLeft, bottomLeft],
        [topRight, bottomRight]
    ];

  }

  //find center lane method to place car in lane not between lanes
  findCenterLane(laneIndex){
    const laneWidth = this.width / this.lanes;
                                    //math func to place car on road if lane count is changed from default
    return this.left+laneWidth/2 + Math.min(laneIndex, this.lanes - 1) * laneWidth;
  }

  draw(ctx){
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";

                    //lanecount is already a number, so no need to add .length
    for(let i=1;i <= this.lanes-1; i++){
      const x = lerp(this.left, this.right, i/this.lanes);

      //make all middle lanes dashed and edge lanes solid
      
      ctx.setLineDash([20, 20]);
      
      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    this.borders.forEach(border => {
      ctx.beginPath();
      ctx.moveTo(border[0].x, border[0].y);
      ctx.lineTo(border[1].x, border[1].y);
      ctx.stroke();
    })
  }
}
