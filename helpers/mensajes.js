require('colors');

//va a terminar siendo una promesa
const mostrarMenu = () => {

    return new Promise( resolve => {

        console.clear();
        //CREACION DE LA INTERFAZ EN LA CONSOLA
            console.log('==========================='.red);
            console.log('   Seleccione una opcion:  '.yellow);
            console.log('===========================\n'.red);
        
            console.log(`${'1.'.yellow} Crear una tarea`);
            console.log(`${'2.'.yellow} Listar todas las tareas`);
            console.log(`${'3.'.yellow} Listar las taras completadas`);
            console.log(`${'4.'.yellow} Listar taras pendientes`);
            console.log(`${'5.'.yellow} Completar tarea(s)`);
            console.log(`${'6.'.yellow} Eliminar una tarea`);
            console.log(`${'0.'.yellow} Salir del menu\n`);
        
        
            //PREPARAR LA INTERFAZ, RECIBIR LA INFO DEL USUARIO
        
            const readLine = require('readline').createInterface({
                input: process.stdin,//pausa la ejecucion de la app y esperar caracteres del usuario
                output: process.stdout
            })
        
            readLine.question('Seleccione una opcion: ', (option) => {
                readLine.close();
                resolve(option);//RESOLUICION DE LA NEW PROMISE
            })
        
    });

}

const pausa = () => {

    return new Promise((resolve, reject) => {

        const readLine = require('readline').createInterface({
            input: process.stdin,//pausa la ejecucion de la app y esperar caracteres del usuario
            output: process.stdout
        });
    
        readLine.question(`\nPresione ${'ENTER'.blue} para continuar\n`, (option) => {
            readLine.close();
            resolve();
        });

    });

}


module.exports = {
    mostrarMenu,
    pausa
}