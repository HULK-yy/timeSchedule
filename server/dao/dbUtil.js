const mongo = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017/timeSchedule';

const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// 数据库操作: 插入一条数据
function insertOne (collection, obj, callback) {
    mongo.connect(url, config, function (err, db) {
        if(!err){
            var dbase = db.db('timeSchedule');
            dbase.collection(collection).insertOne(obj, (err, res) => {
                if(!err){
                    callback(res);
                    db.close();
                }else{
                    throw new Error(err);
                }
            });
        }else{
            throw new Error(err);
        }
    });
}

// 数据库操作: 插入多条数据
function insertMany (collection, objs, callback) {
    mongo.connect(url, config, function (err, db) {
        if(!err){
            var dbase = db.db('timeSchedule');
            dbase.collection(collection).insertMany(objs, (err, res) => {
                if(!err){
                    callback(res);
                    db.close();
                }else{
                    throw new Error(err);
                }
            });
        }else{
            throw new Error(err);
        }
    });
}

// 数据库操作: 查询数据
function find (collection, obj, callback) {
    mongo.connect(url, { useUnifiedTopology: true },function (err, db) {
        if(!err){
            var dbase = db.db('timeSchedule');
            dbase.collection(collection).find(obj).toArray((err, res) => {
                if(!err){
                    callback(res);
                    db.close();
                }else{
                    throw new Error(err);
                }
            });
        }else{
            throw new Error(err);
        }
    });
}

// 数据库操作: 分页查询数据
function findPage (collection, obj, skip, limit, callback) {
    mongo.connect(url, { useUnifiedTopology: true },function (err, db) {
        if(!err){
            var dbase = db.db('timeSchedule');
            dbase.collection(collection).find(obj).skip(skip).limit(limit).toArray((err, res) => {
                if(!err){
                    callback(res);
                    db.close();
                }else{
                    throw new Error(err);
                }
            });
        }else{
            throw new Error(err);
        }
    });
}

function findCount (collection, obj, callback) {
    mongo.connect(url, { useUnifiedTopology: true },function (err, db) {
        if(!err){
            var dbase = db.db('timeSchedule');
            dbase.collection(collection).find(obj).count((err, res) => {
                if(!err){
                    callback(res);
                    db.close();
                }else{
                    throw new Error(err);
                }
            });
        }else{
            throw new Error(err);
        }
    });
}

// 数据库操作: 修改数据
function update (collection, where, update, callback) {
    mongo.connect(url, config, function (err, db) {
        if(!err){
            var dbase = db.db('timeSchedule');
            dbase.collection(collection).updateMany(where, update, (err, res) => {
                if(!err){
                    callback(res);
                    db.close();
                }else{
                    throw new Error(err);
                }
            });
        }else{
            throw new Error(err);
        }
    });
}

// 数据库操作: 删除
function deleteDate (collection, where, callback) {
    mongo.connect(url, config, function (err, db) {
        if(!err){
            var dbase = db.db('timeSchedule');
            dbase.collection(collection).deleteOne(where, (err, res) => {
                if(!err){
                    callback(res);
                    db.close();
                }else{
                    throw new Error(err);
                }
            });
        }else{
            throw new Error(err);
        }
    });
}

module.exports = {
    insertOne,
    insertMany,
    find,
    findPage,
    findCount,
    update,
    deleteDate
}