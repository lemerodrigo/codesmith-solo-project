class Apple {

  constructor($el) {
    this.el = $el;
    this.node = $('<img id="apple"></img>');
    this.node.attr('src', 'assets/img/apple.jpg');
    this.arrayLocation = null;
    this.x = null;
    this.y = null;
    this.current = null;
  }

}