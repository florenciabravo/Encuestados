/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
    this.modelo.agregarPregunta(pregunta, respuestas);
  },
  // // Guia 1 - Paso 2
  // borrarPregunta: function() {
  //   var id = parseInt($('.list-group-item.active').attr('id'));
  //   if (id != -1)
  //     this.modelo.borrarPregunta(id);
  // },
  // // Guia 2 - Paso 1
  // modificarPregunta: function() {
  //   var id = parseInt($('.list-group-item.active').attr('id'));
  //   if (id != -1)
  //     var texto = prompt('Editar pregunta:', '');
  //   if (texto)
  //     this.modelo.editarPregunta(id,texto);
  // },
  // Guia 1 - Paso 2
  borrarPregunta: function(id) {
    this.modelo.borrarPregunta(id);
  },
  // Guia 2 - Paso 1
  editarPregunta: function(id,nuevaPregunta) {
    this.modelo.editarPregunta(id,nuevaPregunta);
  },
  borrarTodo: function() {
    this.modelo.borrarTodo();
  },
  agregarVoto: function(pregunta,respuestaSeleccionada) {
    this.modelo.agregarVoto(pregunta,respuestaSeleccionada);
  },

};
