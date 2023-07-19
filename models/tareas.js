const Tarea = require("./tarea");
require('colors');


class Tareas  {

 //internamente tendra un listado de tareas una propiedad llamada _listado inicializada como un objeto vacio
    _listado = {};

 //convirtiendo el listado que es un objeto a un array con getter

    get _listadoArr () {

        const listado = [];
        Object.keys(this._listado).forEach(key => {
 //con el codigo de arriba nos estrega el id de cada una de las tareas y el clg de abajo nos trae dichas tareas
            //console.log(key)
 //meteremos esas tareas al arreglo con el siguiente codigo
            const tarea = this._listado[key];
            listado.push(tarea);
        })


        return listado;

    }

    constructor() {
        this._listado = {};
    }

  //video 59 listado para borrar

    borrarTarea(id = '') {
        
        if(this._listado[id]) {
            delete this._listado[id];
        }

    }

 //ejercicio de video 56 
    cargarTareasFromArray( tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });

    }

    crearTareas(desc) {

        //crear instancia de la tarea 
        const tarea = new Tarea(desc); 
 //siguiente se quiere almacenar la tarea en el _listado y como es un objeto basta con propiedad
 //para hacer referencia a una propiedad del objeto se pone entre llaves
        this._listado[tarea.id] = tarea;
    }
 //tarea video 57 crear metodo para listar
    listadoCompleto () {
        
        console.log();
        
        this._listadoArr.forEach( ( tarea, index ) => {
            const idx = `${index + 1}`.green;
            const {desc, completadoEn} = tarea;

            const estado = (completadoEn)
                           ? 'Completado'.green
                           : 'Pendiente'.red;
            
            console.log(`${idx} ${desc} :: ${estado}`);

        })

    }
  //metodo tarea de video 58 
    listarTareasPendientesCompletadas (completadas = true) {

        console.log();
        let idx = 0;

        this._listadoArr.forEach( ( tarea ) => {
            
            const {desc, completadoEn} = tarea;
            
            const estado = (completadoEn)
                           ? 'Completado'.green
                           : 'Pendiente'.red;
            if (completadas) {
                //se muestran las completadas
                if (completadoEn) {
                    idx += 1;
                    console.log(`${(idx + '.').green} ${desc} :: ${completadoEn.blue}`);
                } 
            } else {
                //se muestran las pendientes
                if (!completadoEn) {
                    idx += 1;
                    console.log(`${(idx + '.').green} ${desc} :: ${estado}`);
                } 
            }
        });
    }

    toggleCompletadas( ids = []) {

        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }

        });

        this._listadoArr.forEach(tarea => {
    //si no existe la tarea en mi arreglo de ids que se encuentra registrada limpiarlo
            if( !ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }

        })

        

    }

}

module.exports = Tareas;