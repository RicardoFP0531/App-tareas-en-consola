const { v4: uuidv4 } = require('uuid');

//CODIGO PARA MANEJAR UNA TAREA
class Tarea {

    id= '';
    desc = '';
    completadoEn = null;

    constructor( desc ) {

        this.id = uuidv4();
        this.desc = desc;

    }


}

module.exports = Tarea;