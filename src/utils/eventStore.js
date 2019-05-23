const DB_VERSION = 5;
const DB_NAME = "attending-events";

function openDatabase() {
    return new Promise((res, rej) => {
        //Check if there is indexedDB support
        if(!window.indexedDB){
            rej('IndexedDB not supported');
        }

        //The db request
        let req = window.indexedDB.open(DB_NAME, DB_VERSION);

        //If an error occurs while opening the db
        req.onerror = (e) => {
            rej(`Database error: ${e.EventTarget.error}`);
        }

        req.onupgradeneeded = (e) => {
            let db = e.target.result;
            let upgradeTransaction = e.target.transaction;
            let eventStore;
            //Check if data already exists
            if(!db.objectStoreNames.contains('events')){
                eventStore = db.createObjectStore('events',
                    { "keyPath": "id" }
                );
            }else{
                eventStore = upgradeTransaction.objectStore('events');
            }

            if(!eventStore.indexNames.contains('idx_status')){
                eventStore.createIndex('idx_status', 'status', { unique: false });
            }
        };

        req.onsuccess = (e) => {
            res(e.target.result);
        }
    });
};

function openObjectStore(db, storeName, transactionMode){
    return db
    .transaction(storeName, transactionMode)
    .objectStore(storeName);
};

function addToObjectStore(storeName, object){
    return new Promise((res, rej) => {
        openDatabase().then(db => {
            openObjectStore(db, storeName, "readwrite")
                .add(object).onsuccess = res;
        }).catch((err) => {
            console.log('something went wrong')
            rej(err);
        });
    });
};

function getEvents(indexName, indexValue){
    return new Promise((res, rej) => {
        openDatabase().then(db => {
            let objectStore = openObjectStore(db, "events");
            let events = [];
            let cursor;
            if(indexName && indexValue){
                cursor = objectStore.index(indexName).openCursor(indexValue);
            } else{
                cursor = objectStore.openCursor();
            }
            cursor.onsuccess = (e) => {
                let cursor = e.target.result;
                if(cursor){
                    events.push(cursor.value);
                    cursor.continue();
                }else{
                    if(events.length > 0){
                        res(events);
                    }else{
                        //TODO exe get events from the server and put them in indexedDB
                        getEventsFromServer().then(events => {
                            openDatabase().then(db => {
                                let objectStore = openObjectStore(db, "events", "readwrite");
                                events.forEach(event => {
                                    objectStore.add(event);
                                });
                                res(events);
                            });
                        });
                    }
                }
            }
        }).catch(() => {
            console.log("openening indexedDB failed");
            getEventsFromServer().then(events => {
                res(events);
            })
        })
    });
};

//Get events marked "attending" from server
function getEventsFromServer(){
    return new Promise((res, rej) => {
        fetch('/api/attending')
        .then(response => response.json())
        .then(json => {
            res(json);
        })
    });
};

module.exports = {addToObjectStore, getEvents}
