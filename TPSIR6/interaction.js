
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.


function DnD(canvas, interactor) {
  this.initX = 0;
  this.initY = 0;
  this.finalX = 0;
  this.finalY = 0;
  this.pression = false;
  this.canvas = canvas;
  this.interactor = interactor;

  this.getInitX = function() {
    return this.initX;
  }.bind(this) ;

  this.getInitY = function() {
    return this.initY;

  }.bind(this) ;
  this.getFinalX = function() {
    return this.finalX;

  }.bind(this) ;
  this.getFinalY = function() {
    return this.finalY;

  }.bind(this) ;


  this.Pression = function(evt) {
    this.pression = true;
    this.initX = getMousePosition(this.canvas,evt).x;
    this.initY = getMousePosition(this.canvas,evt).y;
    this.interactor.onInteractionStart(this);

  }.bind(this) ;

  this.Deplacement = function(evt) {
    if (this.pression){
      this.finalX = getMousePosition(this.canvas,evt).x;
      this.finalY = getMousePosition(this.canvas,evt).y;
      this.interactor.onInteractionUpdate(this);
    }

  }.bind(this) ;


  this.Relachement = function(evt) {
    this.pression = false;
    this.finalX = getMousePosition(this.canvas,evt).x;
    this.finalY = getMousePosition(this.canvas,evt).y;
    this.interactor.onInteractionEnd(this);
  }.bind(this) ;


  canvas.addEventListener('mousedown', this.Pression, false);
  canvas.addEventListener('mousemove', this.Deplacement, false);
  canvas.addEventListener('mouseup', this.Relachement, false);


};

function getMousePosition(canvas,evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};

