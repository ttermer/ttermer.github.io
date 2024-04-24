// Define una función para mostrar las imágenes
function displayImages() {
    deleteImages();

    const swfname = document.getElementById('dropdownSWFS').value;
    const directoryPath = `/src/ObjetosJuego/${swfname}/files.json`;
    const contenedor = document.getElementById('contenedor');

    fetch(directoryPath)
        .then(response => response.json())
        .then(files => {
            files.forEach(file => {
                // Crea un div para cada imagen, checkbox y nombre
                const imageDiv = document.createElement('div');
                imageDiv.classList.add('image-container'); // Agrega una clase CSS si es necesario

                // Crea la imagen
                const img = document.createElement('img');
                img.src = directoryPath.replace('files.json', '') + file;
                img.width = 60;
                img.height = 60;
                imageDiv.appendChild(img);

                // Crea un checkbox para cada imagen
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = file.replace('.png', '').replace('_', '/');
                checkbox.addEventListener('change', handleCheckboxChange);
                imageDiv.appendChild(checkbox);

                if (selectedImages.includes(checkbox.value)) {
                    checkbox.checked = true;
                }

                // Muestra el nombre de la imagen sin la extensión
                const imageName = document.createElement('span');
                imageName.textContent = file.split('.')[1];
                imageDiv.appendChild(imageName);

                // Agrega el div al contenedor principal
                contenedor.appendChild(imageDiv);
            });
        })
        .catch(error => {
            console.error('Error al leer el directorio:', error);
        });
    var elementosOcultos = document.querySelectorAll(".oculto");
    elementosOcultos.forEach(function(elemento) {
        elemento.style.display = "inline-block";});
    contenedor.style.display = "inline-block";
}



// Función para manejar el cambio de los checkboxes
const selectedImages = []; // Crea un array vacío para almacenar los nombres de las imágenes seleccionadas

function handleCheckboxChange(event) {
    const selectedImageName = event.target.value;

    if (event.target.checked) {
        // Agrega el nombre de la imagen al array selectedImages
        selectedImages.push(selectedImageName);
    } else {
        // Elimina el nombre de la imagen del array selectedImages
        const index = selectedImages.indexOf(selectedImageName);
        if (index !== -1) {
            selectedImages.splice(index, 1);
        }
    }
}

// Función para eliminar las imágenes
function deleteImages() {
    const contenedor = document.getElementById('contenedor');
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}

// Función para generar el código codificado
function makeEncode() {
    const salida = document.getElementById('salida');
    var cantidad = document.getElementById('cantidad').value;
    const outputLines = [];
    outputLines.push("initial: DO\n    on activate A0\n\n");
    for (let i = 0; i < selectedImages.length; i++) {
        let linea = "A" + i + ": DO\n";
        linea += "    user.state get\n";
        linea += "    inventory.add " + cantidad + " " + selectedImages[i] + "\n";
        linea += "    after 1 A" + (i + 1) + "\n\n";
        outputLines.push(linea);
    }
    salida.value = outputLines.join('');
}

document.addEventListener("DOMContentLoaded", function() {
    // Cargar el archivo JSON
    fetch('/src/swfs.json')
        .then(response => response.json())
        .then(data => {
        // Obtener el array de elementos del JSON
        const elementos = data;
        // Obtener el elemento select de la lista desplegable
        const dropdown = document.getElementById('dropdownSWFS');
        // Crear opciones para cada elemento y añadirlas al select
        elementos.forEach(elemento => {
            const option = document.createElement('option');
            option.text = elemento;
            option.value = elemento;
            dropdown.appendChild(option);
        });
        })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
});


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
function seleccionarTodo() {
    const checkboxes = document.querySelectorAll('.image-container input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
        if (!selectedImages.includes(checkbox.value)) {
            selectedImages.push(checkbox.value); // Add the checkbox value to the selectedImages array if it's not already included
        }
    });
}

function deseleccionarTodo() {
    const checkboxes = document.querySelectorAll('.image-container input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
        const index = selectedImages.indexOf(checkbox.value);
        if (index !== -1) {
            selectedImages.splice(index, 1); // Remove the checkbox value from the selectedImages array if it's included
        }
    });
}

function limpiar() {
    selectedImages.length = 0;
    document.getElementById('cantidad').value = '1';
    document.getElementById('salida').value = '';
    deleteImages();
    select = document.getElementById('dropdownSWFS');
    select.value = select.options[0].value;
    var elementosOcultos = document.querySelectorAll(".oculto");
    elementosOcultos.forEach(function(elemento) {
        elemento.style.display = "none";});
    var contenedor = document.getElementById('contenedor');
    contenedor.style.display = "none";
    }

document.addEventListener("DOMContentLoaded", function() {
    const dropdown = document.getElementById('dropdownSWFS');
    // Agrega un event listener al cambio de selección en el dropdown
    dropdown.addEventListener('change', function() {
        displayImages();
        });
    });

function descargarTXT() {
    var contenido = document.getElementById('salida').value;
    var nombreArchivo = 'encode.txt';
    var archivo = new Blob([contenido], {type: 'text/plain'});
    var a = document.createElement('a');
    a.href = URL.createObjectURL(archivo);
    a.download = nombreArchivo;
    a.click();
    } 
