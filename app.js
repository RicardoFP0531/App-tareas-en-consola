require('colors');

const { guardarInfo, leerDb } = require('./helpers/guardarArchivo');
//CODIGO DE ABAJO FUNCIONABA CON PUROS CONSOLE.LOGS
// const { mostrarMenu, pausa } = require('./helpers/mensajes');
//CODIGO DE ABAJO FUNCIONA CON PAQUETE DE NODE LLAMADO INQUIRER
const { inquiererMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } = require('./helpers/inquirer');

//codigo abajo encargado de hacer todas las interacciones en las tareas
const Tareas = require('./models/tareas');


const main = async() => {

    let opt = '';
    //instancia para tareas
    const tareas = new Tareas();
 
 //leer la informacion mediante la funcion leerDb de guardarArchivo
    const tareasGuardadas = leerDb();
 //la informacion que regresa es un string, hay que convertir a objeto para verlo como deberia de ser
    if (tareasGuardadas) {
        //Establecer las tareas
        //con la funcion que se crea del video 56 aqui la debemos llamar 
        tareas.cargarTareasFromArray(tareasGuardadas);
    }
    //pausa de abajo para ver las tareas en el arreglo
    // await pausa();

    do {
  //codigo imprime el menu
        opt = await inquiererMenu();
  //opcion controlada por un switch
        switch (opt) {
            case '1':
                //crear opcion, cual es el valor de la tarea
                const eleccion = await leerInput('Escriba la tarea:');
  //mandar el listado de las tareas
                tareas.crearTareas(eleccion);
            break;

            case '2':
  //aqui se invoca el metodo que trae el listado completo de las tareas (todas)
                tareas.listadoCompleto();
            break;

            case '3':
  //aqui se invoca el metodo para traer el listado unicamente de las tareas completadas
                
                tareas.listarTareasPendientesCompletadas();
            break;

            case '4':
  //aqui se invoca el metodo para traer el listado unicamente de las tareas pendientes con un argumento false para
  //traer solo las pendientes
                
                tareas.listarTareasPendientesCompletadas(false);
            break;

            case '5'://completado | pendiente
                        
                const ids = await mostrarListadoCheckList(tareas._listadoArr);
                tareas.toggleCompletadas(ids);

            break;

            case '6':
                const id = await listadoTareasBorrar( tareas._listadoArr);

                if (id !== '0') {
                  const ok = await confirmar('Esta seguro que desea borrar la tarea?');
                  if(ok) {
                    tareas.borrarTarea(id);
                    console.log('Tarea borrada satisfactoriamente')
                  }
                }
            break;
        }

    //trayendo la funcion para guardar la informacion despues del switch para que siempre grabe la informacion
    //recordar que ocupa data en la funcion para poder guardar la info y en este caso guardaremos el arreglo
    guardarInfo(tareas._listadoArr);

        
  //tarea video 50 traer la pausa al programa una vez que se seleccione una opcion
       await pausa();

    } while ( opt !== '0');

    //pausa();
}

main();