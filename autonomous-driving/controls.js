class Controls{
  constructor(){
    this.forward = false;
    this.reverse = false;
    this.left = false;
    this.right = false;

    this.#addKeyboardListeners();
  }

  #addKeyboardListeners(){
    //we use a arrow function so we can use 'this' and still refer to 'this' from constructor
    document.onkeydown = (event) => {
      switch (event.key){
        case "ArrowLeft":
          //''this' refers to 'this' from constructor since we are using arrow func
          //since arrow functions do not have their own 'this' property
          this.left = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;
        case "ArrowUp": 
          this.forward = true;
          break;
        case "ArrowDown":
          this.reverse = true;
          break;
      }
    }
    document.onkeyup = (event) => {
      switch (event.key){
        case "ArrowLeft":
          this.left = false;
          break;
        case "ArrowRight":
          this.right = false;
          break;
        case "ArrowUp": 
          this.forward = false;
          break;
        case "ArrowDown":
          this.reverse = false;
          break;
      }
    }
  }
}