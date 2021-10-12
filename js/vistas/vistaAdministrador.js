/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });

  // Guia 1 - Paso 2
  this.modelo.preguntaEliminada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEditada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntasBorradas.suscribir(function() {
    contexto.reconstruirLista();
  });

};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    this.reconstruirLista();
    this.configuracionDeBotones();
    validacionDeFormulario();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    // Guia 1 - Paso 1
    var nuevoItem = $('<li/>',{
                      'html': pregunta.textoPregunta,
                      'class': 'list-group-item',
                      'id': pregunta.id});
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];

      //$('[name="option[]"]').each(function() {
      $('div:not(#optionTemplate)>input[name="option[]"]').each(function() {
        //completar - Guia 1 - Paso 1
        respuestas.push({'textoRespuesta': $(this).val(), 'cantidad': 0});
      })
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });
    //asociar el resto de los botones a eventos
    e.botonBorrarPregunta.click(function() {
      var id = parseInt($('.list-group-item.active').attr('id'));
      contexto.controlador.borrarPregunta(id); 
    });
    
    e.botonEditarPregunta.click(function() {
      var id = parseInt($('.list-group-item.active').attr('id'));
      if (!isNaN(id*1)) { 
        var nuevaPregunta = prompt('Editar Pregunta: ');
        if (contexto.validarDatoIngresado(nuevaPregunta)) { 
          contexto.controlador.editarPregunta(id, nuevaPregunta); 
        }
      }
    });
    
    e.borrarTodo.click(function() {
      contexto.controlador.borrarTodo();
    });
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
  // Guia 2 - Paso 1
  validarDatoIngresado: function(nuevaPreg){
    if (nuevaPreg == undefined) {
        alert("Ha pulsado cancelar");
        return false;
    }
    
    if ((nuevaPreg.trim()) == "") { 
        alert("Ha pulsado aceptar con el campo vacio");
        return false;
    }
    
    if (nuevaPreg < 0) {
        alert("Ha ingresado un valor negativo");
        return false;
    }
  
    if (nuevaPreg == 0) {
        alert("Ha ingresado el valor cero");
        return false;
    }
    return true;
    },

};
