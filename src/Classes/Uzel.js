/**
 * Created by mata on 28.11.16.
 */

function Uzel(name){
    this.name = name;
};

Uzel.prototype.getName = function(){
    return(this.name);
}

module.exports= Uzel;