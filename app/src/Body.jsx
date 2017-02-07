 class Body {

     constructor(val) {
         this.node = $('<div class="body"></div>');
         this.current = val;
         this.previous = null;
         this.previousObj = null;
         this.insertToBoard();
     }

     insertToBoard() {
         let top = Math.floor(this.current / 14) * 50;
         let left = (this.current % 14) * 50;
        //  console.log('top and left inside body', this.current, top, left);
         this.node.css({ top: top, left: left });
        //  this.node.position().left = left;
        //  this.node.position().top = top;
        //  console.log(this.node.position())
        // console.log(top, left);
         $('#board').append(this.node);
     }
 }