function guardarContenido() {
    var texto = document.getElementById('texto').value;
    localStorage.setItem('contenidoSWF', texto);
    }
    
function crearEncode() {
    var prefijo = document.getElementById('prefijo').value;
    var cantidad = document.getElementById('cantidad').value;
    var contenido = localStorage.getItem('contenidoSWF');
    var salida = document.getElementById('salida');
    var items = contenido.split('\n');
    var itemsFiltrados = items.filter(function(item) {
        var regex = /^(?!.*(?:_on|_so|_fla|\.swf|header|formas|sprites|textos|sonidos|fuentes|marcos|scenes|otros|scripts|<default package>|Asset|morphshapes)$).*$/i;
        return regex.test(item);
    });
    
    var outputLines = [];
    outputLines.push("initial: DO\n    on activate A0\n\n");
    for (var i = 0; i < itemsFiltrados.length; i++) { 
        var linea = "A" + i + ": DO\n";
        linea += "    user.state get\n";
        linea += "    inventory.add " + cantidad + " " + prefijo + "." + itemsFiltrados[i] + "\n";
        linea += "    after 1 A" + (i + 1) + "\n\n";
        outputLines.push(linea);
    }
    
    salida.value = outputLines.join('');
    document.getElementById('info').innerText = "Encode preparado";
    }
    
function copiarContenido() {
    var contenido = document.getElementById('salida').value;
    navigator.clipboard.writeText(contenido)
        .then(() => {
        alert("Contenido copiado al portapapeles");
        })
        .catch(err => {
        console.error('Error al copiar el contenido: ', err);
        });
    }
    
function codificar() {
    var contenido = document.getElementById('salida').value;
    var encoded = btoa(contenido);
    document.getElementById('salida').value = encoded;
    }
    
function decodificar() {
    var contenido = document.getElementById('salida').value;
    var decoded = atob(contenido);
    document.getElementById('salida').value = decoded;
    }
    
function limpiar() {
    localStorage.removeItem('contenidoSWF');
    document.getElementById('texto').value = '';
    document.getElementById('salida').value = '';
    document.getElementById('prefijo').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('info').innerText = "Esperando generar ENCODE";
    }