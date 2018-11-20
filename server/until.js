class Spanner{
    constructor(connection){
        this.connection=connection
    }
    query(options){
        var tableName=options.tableName;
        var fields=options.fields||['*'];
        var rules=options.rules||'';
        if(!tableName){
            throw new Error('查询表名不可为空')
        }
        var sql=`select ${fields.join(',')} from ${tableName} ${rules}`
        var that=this;
        return new Promise(function(resolve,reject){
            that.connection.query(sql,function(err,res){
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
    }
}
module.exports=Spanner;