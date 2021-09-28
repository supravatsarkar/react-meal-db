
const addDb = item => {
    const db = getDb();
    if (item in db) {
        db[item] = db[item] + 1;
    }
    else {
        db[item] = 1;
    }
    saveToLocal(db);
}

const saveToLocal = (db) => {
    localStorage.setItem('cart', JSON.stringify(db));
}

const removeFromLocal = (item) => {
    let saveDb = localStorage.getItem('cart');
    saveDb = JSON.parse(saveDb);
    delete saveDb[item];
    saveToLocal(saveDb);
}

const getDb = () => {
    const saveDb = localStorage.getItem('cart');
    if (!saveDb) {
        return {};
    } else {

        return JSON.parse(saveDb);
    }

}

export { getDb, addDb as addToDb, removeFromLocal }