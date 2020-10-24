module.exports = (db) => ({
    async getItems(resource) {
        return new Promise((res,rej) => {
            db.query("SELECT id, title FROM ??", [resource], (error, result) => {
                if(error) {
                    rej(error);
                }
                res(result);
            });
        });
    },
    getItem(resource,id) {
        return new Promise((res,rej) => {
            db.query("SELECT * FROM ?? WHERE id = ?", [resource, id], (error, result) => {
                if(error) {
                    rej(error);
                }
                res(result);
            });
        });
    },
    createItem(resource, data) {
        return new Promise((res,rej) => {
            db.query("INSERT INTO ?? SET ?", [resource, data], (error, result) => {
                if(error) {
                    rej(error);
                }
                res(result);
            });
        })
    },
    updateItem(resource, data, id) {
        return new Promise((res,rej) => {
            db.query("UPDATE ?? SET ? WHERE id = ?", [resource, data, id], (error, result) => {
                if(error) {
                    rej(error);
                }
                res(result);
            });
        })
    },
    deleteItem(resource,id) {
        db.query("DELETE FROM ?? WHERE id = ?", [resource, id], (error) => {
            if(error) {
                return error;
            }
        });
    }
});