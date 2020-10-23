module.exports = (db) => ({
    async getItems(resource) {
        return new Promise((res,rej) => {
            db.query("SELECT * FROM ??", [resource], (error, result) => {
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
                data.id = result.insertId;
                res(data);
            });
        })
    },
});