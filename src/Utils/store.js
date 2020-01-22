import Dexie from 'dexie'
// Declare db instance
var db = new Dexie("Shopaper");

// Define Database Schema
db.version(1).stores({
    shopaperData: "key, data"
});

// Open Database
db.open(); 

let add_new = (key, data) => {
    console.log(data)
    db.transaction('rw', db.shopaperData, function () {
        db.shopaperData.update(key, { ...data}).then(updated => {
            if (!updated) {
                db.shopaperData.add({key, ...data});
            }
        })
    }).catch(function(err) {
        console.log(err.stack || err);
    });    
}

let fetchData = async (key) => {
    let data = {}
    await db.shopaperData.get(key).then(res => {
        data = {...res}
    }).catch(error => {
        alert ("Ooops: " + error);
    });
    return data
}

let deleteTable = (key) => {
    db.shopaperData.where('key').equals(key).delete()
    .then(function (deleteCount) {
        console.log( "Deleted " + deleteCount + " objects");
        return true
    });
}
export default { add_new, fetchData, deleteTable }