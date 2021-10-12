/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  // Guia 1 - Paso 2
  this.preguntaEliminada = new Evento(this);
  this.preguntaEditada = new Evento(this)
  this.preguntasBorradas = new Evento(this);
  this.votoAgregado = new Evento(this);
  // Guia 2 - paso 2
  this.verificarLocalStorage();
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    //Guia 1 - Paso 1
    if(this.preguntas.length>0){
      //El método .map () hace que una nueva matriz se componga de lo que devolvió en cada iteración.
      var idVals = this.preguntas.map(function(obj) { return obj.id; });
      //al pasar el Array como segundo argumento para .apply se distribuirán los miembros del Array 
      //como argumentos individuales obteniendo el maximo valor.
      var max = Math.max.apply(null, idVals);
        return max;
    } else {
        return 0;
    } 
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //se elimina una pregunta dado su id
  // Guia 1 - Paso 2
  borrarPregunta: function(id) {
    for(var i = 0; i < this.preguntas.length; i++) {
      if (this.preguntas[i].id == id) {
          this.preguntas.splice(i,1);
          this.guardar();
          this.preguntaEliminada.notificar();
          break;
      }
    }   
  },
   
  //Guia 2 - Paso 1
  //se edita una pregunta dado su id
  editarPregunta: function(id, nuevaPregunta) {
    for(var i = 0; i < this.preguntas.length; i++) {
      if (this.preguntas[i].id == id) {
          this.preguntas[i].textoPregunta = nuevaPregunta;
          this.guardar();
          this.preguntaEditada.notificar();
          break;
      }
    }   
  },

  //se borran todas las preguntas
  borrarTodo: function(){
    this.preguntas = [];
    //this.guardar();
    this.reiniciarLocalStorage();
    this.preguntasBorradas.notificar();
  },
 
  agregarVoto: function(nombrePreg, respuestaSelec) {
    for (var i= 0;i < this.preguntas.length; i++) {
      if (this.preguntas[i].textoPregunta == nombrePreg) {
        for(var j= 0;j < this.preguntas[i].cantidadPorRespuesta.length;j++) {
          if (this.preguntas[i].cantidadPorRespuesta[j].textoRespuesta == respuestaSelec) {
              this.preguntas[i].cantidadPorRespuesta[j].cantidad++;
              this.guardar();
              this.votoAgregado.notificar();
          }
        }
      }
    }
  },

  // Guia 2 - Paso 2
  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  },

  reiniciarLocalStorage: function(){
    localStorage.setItem('preguntas', JSON.stringify([]));
  },

  verificarLocalStorage: function(){
    if (localStorage.getItem('preguntas') !== null) {
      this.preguntas = JSON.parse(localStorage.getItem('preguntas'));
    }
  },
};
