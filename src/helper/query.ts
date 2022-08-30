import { COLLECTIONS } from './../config/constant';
import { Db } from "mongodb";


function getLastId(db: Db, collection: string) {

    return db.collection(collection).find().sort({ id: -1 }).limit(1).toArray();
}

async function countElements(collection: string, db: Db, filter: object = {}) {

    return await db.collection(collection).countDocuments(filter);

}
async function pagination(db: Db, collection: string, page: number = 1, itemsPage: number = 20, filter: object = {}) {

    // Comprobar el numero de items por pagina
    if (itemsPage > 20 || itemsPage < 1) {
        itemsPage = 20; // va cargar 20 registros como  maximo por pagina
    }

    if (page < 1) {
        page = 1; // la primer pagina siempre va ser 1 
    }

    const total = await countElements(collection, db, filter);

    const totalPages = Math.ceil(total / itemsPage); // como puede haber un residuo en la division entonces se redondea
    // hacia arriba, 
    //Por ejemplo si tengo 50 registros, 20 por cada pagina serian 2 paginas, pero queda un sobrante de 10.
    // se redondea hacia arriba para mostrar 3 paginas, 2 con 20 registros y el residuo de 10 en la tercer pagina

    return {
        page,
        skip: (page - 1) * itemsPage, // este valor es el numero de registro por donde empieza a listar
        itemsPage,
        total,
        totalPages
    }
}

async function ramdonItems(collection: string, db: Db, filter: object = {}, items: number = 10) {

    const pipeline = [ // el pipe line es para ibtener los items de la bd de forma aleatoria limitando a un numero de registros obtenidos
        // la propiedad match es el where
        // el sample obtiene de forma aleatoria y limitada por un entero positivo el numero d eregistros listados
        {
            $match: filter
        },{
            $sample: { size: items }
        }
    ]

    return Promise.resolve(await db.collection(collection).aggregate(pipeline).toArray());
}
export { getLastId, countElements, pagination, ramdonItems };