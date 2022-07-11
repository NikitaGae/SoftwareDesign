
export class mapDao{
    public title: string;
    public spawnPointX: number;
    public spawnPointY: number;
    public map: string[][];
    constructor(_title: string, _spawnPointX: number, _spawnPointY: number, _map: string[][])   {
        this.title = _title;
        this.spawnPointX = _spawnPointX;
        this.spawnPointY = _spawnPointY;
        this.map = _map;
    }
}