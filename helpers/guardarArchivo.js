const fs = require("fs");
                //guarda la informacion en un formato json 
const archivo = './db/data.json';
//nueva contante para guardar la informacion
const guardarInfo = (data) => {    
 //comando de node para grabar la informacion persistente con node, recordar que es un array y se usa el metodo 
 //JSON.stringify() para convertirlo a un string
    fs.writeFileSync(archivo, JSON.stringify(data));

}

const leerDb = () => {
 //si no existe el archivo de la BD no retornes nada
    if(!fs.existsSync(archivo)) {
        return null;
    }

    const info = fs.readFileSync(archivo, 'utf8');
 //proceso para pasar un archivo string a json con PARSE
    const dataParse = JSON.parse(info);

    return dataParse;
}

//exportamos para poder usar la constante en otro lugar

module.exports = {
    guardarInfo,
    leerDb
}