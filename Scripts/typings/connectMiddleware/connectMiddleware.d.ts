declare module "morgan" {
    
    function m(config:any):any
    export = m
}

declare module "body-parser" {
    function b(): any
    export = b
}
declare module "method-override" {
    function m(): any
    export = m
}
declare module "errorhandler" {
    function e(): any
    export = e
}

//declare function morgan(config:any):any