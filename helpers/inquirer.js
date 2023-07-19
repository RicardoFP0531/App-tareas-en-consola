const inquirer = require('inquirer');
require('colors');

//CREANDO TODAS LAS PREGUNTAS DEL MENU CON INQUIRER

const preguntas = [{

    type: 'list',
    name: 'opcion',
    message: 'Que desea hacer ?',
    //choices: ['opt1', 'opt2','opt3']
    //MODIFICACION DE OPCIONES MANDADAS COMO ARREGLO DE OBJETOS
    choices: [
        {
            value: '1',
            name: `${'1.'.green} Crear tarea`,

        },

        {
            value: '2',
            name: `${'2.'.green} Listar todas las tareas`,

        },
        {
            value: '3',
            name: `${'3.'.green} Listar las tareas completadas`,

        },
        {
            value: '4',
            name: `${'4.'.green} Listar tareas pendientes`,

        },
        {
            value: '5',
            name: `${'5.'.blue} Completar tarea(s)`,

        },
        {
            value: '6',
            name: `${'6.'.red} Eliminar tarea`,

        },
        {
            value: '0',
            name: `${'0.'.yellow} Salir del menú`,

        },
       
    ]
}];



const inquiererMenu = async() => {

    console.clear();
    console.log('==========================='.white);
    console.log('   Seleccione una opcion:  '.green);
    console.log('===========================\n'.white);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;

}

//funcion para esperar y mostrar el enter para continuar de video 50 curso
const pausa = async() => {

    const esperar = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ];

    console.log('\n')
    await inquirer.prompt(esperar);

}

const leerInput = async(message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
  //ecmaScript 6 nombnar propiedades igual que su valor es redundante
            message,
  //forzar a que la persona siempre ingrese un valor, siempre tendran que poner un valor
            validate(value ) {
                if(value.length === 0) {
                    return 'Debe ingresar un valor'
                } 
                return true;
            }
        }
    ];
  // inquirer.prompt(question) regresa un objeto al cual solo queremos la descripcion
  //por eso desestructuramos el desc
    const {desc} = await inquirer.prompt(question)
    return desc;
}


const listadoTareasBorrar = async(tareas = []) => {
    console.log('')
    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name:  '0.'.green + ' Cancelar'
    })

    const preguntas = [{

        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices
    }]

    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);
    return ok;

}


const mostrarListadoCheckList = async(tareas = []) => {
    console.log('')
    
    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [{

        type: 'checkbox',
        name: 'ids',
        message: 'Seleccione',
        choices
    }]

    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}



module.exports = {
    inquiererMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}