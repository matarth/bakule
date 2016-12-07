/**
 * Created by mata on 4.12.16.
 */

import MyLogger from '../Logger';

export default class MapNode {

    private id: number;
    private url: string;
    private children = new Set<MapNode>();


    constructor() {
        MyLogger.log("MapNode constructor");
    }

    public getId(){
        return(this.id);
    }

    public setId(id: number){
        this.id = id;
    }

    public getUrl(){
        return(this.url);
    }

    public setUrl(url: string){
        this.url = url;
    }

    public getChildren(){
        return(this.children);
    }

    public addChild(child: MapNode){
        this.children.add(child);
    }


}
