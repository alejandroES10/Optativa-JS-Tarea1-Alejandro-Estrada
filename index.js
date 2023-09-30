class Examen {

    constructor(nombreEstudiante, materia, puntaje, fecha) {
        let _nombreEstudiante;
        let _materia;
        let _puntaje;
        let _fecha;


        this.getNombreEstudiante = () => _nombreEstudiante;
        this.getMateria = () => _materia;
        this.getPuntaje = () => _puntaje;
        this.getFecha = () => _fecha;


        this.setNombreEstudiante = function (nombreNuevo) {
            if (typeof nombreNuevo === 'string')
                if (nombreNuevo.trim().length > 0)
                    _nombreEstudiante = nombreNuevo;
                else
                    throw new Error('El valor del atributo nombre del estudiante debe ser una cadena de texto no vacía');

            else
                throw new Error('El valor del atributo nombre del estudiante debe ser una cadena de texto');
        }

        this.setMateria = function (materiaNueva) {
            if (typeof materiaNueva === 'string')
                if (materiaNueva.trim().length > 0)
                    _materia = materiaNueva;
                else
                    throw new Error('El valor del atributo materia debe ser una cadena de texto no vacía');

            else
                throw new Error('El valor del atributo materia debe ser una cadena de texto');

        }

        this.setPuntaje = function (puntajeNuevo) {
            if (typeof puntajeNuevo === 'number')
                if (puntajeNuevo >= 2 && puntajeNuevo <= 5)
                    _puntaje = puntajeNuevo;

                else
                    throw new Error('El valor del atributo puntaje debe ser un numero de 2 a 5');

            else
                throw new Error('El valor del atributo puntaje debe ser un numero');
        }

        this.setFecha = function (fechaNueva) {
            if (fechaNueva instanceof Date)
                _fecha = fechaNueva;

            else
                throw new Error('El valor del atributo fecha debe ser un Date');

        }

        this.setNombreEstudiante(nombreEstudiante);
        this.setMateria(materia);
        this.setPuntaje(puntaje);
        this.setFecha(fecha);


    }
}

class ControlExamen {

    constructor() {
        let _examenes = [];

        this.getExamenes = () => _examenes;

        this.agregarExamen = function (examen) {
            if (examen instanceof Examen)
                _examenes.push(examen);

            else
                throw new Error('Al control de exámenes solo se pueden agregar datos de tipo Examen');
        }

        this.promedioPuntajesPorMateria = function (materiaDada) {
            let cantidad = 0;
            let sumatoria = 0;

            _examenes.forEach(examen => {
                if (examen.getMateria() === materiaDada) {
                    cantidad++;
                    sumatoria += examen.getPuntaje();
                }

            });

            return cantidad !== 0 ? sumatoria / cantidad : (() => { throw new Error(`No se puede hallar el promedio porque no hay exámenes de ${materiaDada} `); })();
        }

        this.eliminarExamen = function (nombreEstudiante, nombreMateria, fechaExamen) { // asumo que el criterio para eliminar examenes es segun el estudiante, la materia y la fecha en que se realizo

            let eliminado = false;

            for (let i = 0; i < _examenes.length && !eliminado; i++) {
                if (_examenes[i].getNombreEstudiante() === nombreEstudiante && _examenes[i].getMateria() === nombreMateria
                    && _examenes[i].getFecha() === fechaExamen) {

                    _examenes.splice(i, 1);
                    eliminado = true;
                }
            }

            return eliminado;
        }


        /*
        En la funcion para editar un examen, los tres primeros parametros representan el criterio para buscar
        el examen que se desea editar, el resto de los parametros representan las modificaciones que se les
        quieran hacer al examen, si un atributo no se desea modificar el parametro correspondiente es: undefine
        */
        this.editarExamen = function (nombreDelEstudiante, nombreDeLaMateria, fechaDelExamen, nuevoNombre, nuevaMateria, nuevoPuntaje, nuevaFecha) {

            let examenABuscar = buscarExamenPorCriterio(busquedaExamenPorEstudianteMateriaFecha(nombreDelEstudiante, nombreDeLaMateria, fechaDelExamen));

            if (examenABuscar !== null) 
                cambiarAtributosDeUnExamen(examenABuscar, nuevoNombre, nuevaMateria, nuevaFecha, nuevoPuntaje);
            
        }

        function cambiarAtributosDeUnExamen(examen, nuevoNombre, nuevaMateria, nuevaFecha, nuevoPuntaje) {
            if (nuevoNombre !== undefined) 
                examen.setNombreEstudiante(nuevoNombre);
            
            if (nuevaMateria !== undefined) 
                examen.setMateria(nuevaMateria);
            
            if (nuevaFecha !== undefined) 
                examen.setFecha(nuevaFecha);
            
            if (nuevoPuntaje !== undefined) 
                examen.setPuntaje(nuevoPuntaje);
            

        }

        function busquedaExamenPorEstudianteMateriaFecha(estudiante, materia, fecha) {
            return function (examen) {
                return examen.getNombreEstudiante() === estudiante && examen.getMateria() === materia
                    && examen.getFecha() === fecha;
            };
        }


        function buscarExamenPorCriterio(criterio) {
            let examenADevolver = null;
            let detener = false;
            for (let i = 0; i < _examenes.length && !detener; i++) {
                if (criterio(_examenes[i])) {
                    examenADevolver = _examenes[i];
                    detener = true;
                }

            }
            return examenADevolver;

        }



        this.mostrarDatos = function () {
            console.log("***Lista de exámenes***\n");
            let contador = 1;
            _examenes.forEach(examen => {
                
                console.log(`Exámen ${contador}\n` + `Estudiante: ${examen.getNombreEstudiante()} \n` +
                    `Materia: ${examen.getMateria()} \n` + `Puntaje: ${examen.getPuntaje()} \n` + `Fecha: ${examen.getFecha()} \n`);

                contador ++;    
            });
        }




    }

}



// Seccion de pruebas

let fecha = new Date(2021, 5, 1);
let fecha1 = new Date(2021, 10, 1);

let examen1 = new Examen("Thalia Maestre ", "Razonamiento Aproximado", 5, fecha);
let examen2 = new Examen("Juan Heredia", "Razonamiento Aproximado", 4, fecha);
let examen3 = new Examen("Julio Torres", "Sistema Operativo", 3, fecha);
let examen4 = new Examen("Beatriz Espinoza", "Sistema Operativo", 4, fecha);
let examen5 = new Examen("Alexis Torres", "Razonamiento Aproximado", 4, fecha);
let examen6 = new Examen("Luis Campos", "Base de Datos", 5, fecha);
let examen7 = new Examen("Ana Heredia", "Base de Datos", 4, fecha);
let examen8 = new Examen("Alberto Fonseca", "Base de Datos", 4, fecha);
let examen9 = new Examen("Deysi Almaguer", "Optativa JavaScript", 5, fecha);
let examen10 = new Examen("Humberto Espinoza", "Optativa JavaScript", 5, fecha);



let controlDeExamenes = new ControlExamen();

//Probando la agregacion de examenes
controlDeExamenes.agregarExamen(examen1);
controlDeExamenes.agregarExamen(examen2);
controlDeExamenes.agregarExamen(examen3);
controlDeExamenes.agregarExamen(examen4);
controlDeExamenes.agregarExamen(examen5);
controlDeExamenes.agregarExamen(examen6);
controlDeExamenes.agregarExamen(examen7);
controlDeExamenes.agregarExamen(examen8);
controlDeExamenes.agregarExamen(examen9);
controlDeExamenes.agregarExamen(examen10);


controlDeExamenes.mostrarDatos();

//Probando la funcion promedioPuntajesPorMateria(materia)
let promedioRA = controlDeExamenes.promedioPuntajesPorMateria("Razonamiento Aproximado");
console.log(`Promedio de puntuajes en RA ${promedioRA}`);

let promedioSO = controlDeExamenes.promedioPuntajesPorMateria("Sistema Operativo");
console.log(`Promedio de puntuajes en SO ${promedioSO}`);


let promedioBD = controlDeExamenes.promedioPuntajesPorMateria("Base de Datos");
console.log(`Promedio de puntuajes en BD ${promedioBD}`);

let promedioJS = controlDeExamenes.promedioPuntajesPorMateria("Optativa JavaScript");
console.log(`Promedio de puntuajes en JS ${promedioJS}`);

// Probando la ediccion de examenes
controlDeExamenes.editarExamen("Thalia Maestre ", "Razonamiento Aproximado", fecha, "Thalia Maestre Labrador", "Sistema Operativo", 4, fecha1); //Se le editaron todos los atributos
controlDeExamenes.editarExamen("Juan Heredia", "Razonamiento Aproximado", fecha, undefined, undefined, 5, undefined); // Ahora su puntaje es 5
controlDeExamenes.editarExamen("Julio Torres", "Sistema Operativo",fecha,undefined,undefined,4,undefined); // ahora su puntaje es 4

console.log("\n *****Luego de editar algunos exámenes****\n");
controlDeExamenes.mostrarDatos();

//Probando la eliminacion de examenes
controlDeExamenes.eliminarExamen("Alberto Fonseca", "Base de Datos", fecha);
controlDeExamenes.eliminarExamen("Humberto Espinoza", "Optativa JavaScript", fecha)
controlDeExamenes.eliminarExamen("Beatriz Espinoza", "Sistema Operativo", fecha);
controlDeExamenes.eliminarExamen("Julio Torres", "Sistema Operativo",fecha);

console.log("*******Eliminando algunos exámenes quedan:*********");
controlDeExamenes.mostrarDatos();


