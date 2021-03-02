const reqAccessKey = "$$";
const isClass = fn => /^\s*class/.test(fn.toString());


(req, res, next) => { dependencyInjection(this, this.dependencyMap, req); next(); }

module.exports = (origin, dependencyMap, req) => {
    let dependencies = dependenciesResolve(dependencyMap, req);

    for (let dependency in Object.keys(dependencies)) {
        origin[dependency] = dependencies[dependency];
    }
}

const dependenciesResolve = (dependencyMap, req) => {
    let toInject = {};
    for (let dependency in dependencyMap) {
        if (dependencyMap[dependency] instanceof DependenceStructure) {
            //Verifica se a dependencia precisa ser instanciada (class)
            if (!!dependencyMap[dependency].class && isClass(dependencyMap[dependency].class)) {
                let args = {};
                //chamar recursivo para resolver as dependencias da dependencia
                for (let innerDependence in dependencyMap[dependency].dependencies) {

                    args = Object.assign(
                        dependenciesResolve(dependencyMap[dependency].dependencies[innerDependence], req),
                        args);
                }
                //Instanciar dependencia
                toInject[dependencyMap[dependency].name] = new dependencyMap[dependency].class(args);
            } else {
                //Caso a dependencia seja um valor, verifica se possui a chave/marcacao para acessar os valores provenientes da request
                if (typeof (dependencyMap[dependency].dependencies) == "string" && dependencyMap[dependency].dependencies.indexOf(reqAccessKey) === 0) {
                    //Busca o valor da requisicao, limpando a chave/marcacao da dependencia
                    toInject[dependencyMap[dependency].name] = req[dependencyMap[dependency].dependencies.replace(reqAccessKey, "")];
                } else {
                    //Caso a dependencia ja tenha sido injetada apenas repassa com o nome especificado
                    toInject[dependencyMap[dependency].name] = dependencyMap[dependency].dependencies;
                }
            }
        }
    }

    return toInject;
}

const DependenceStructure = class DependenceStructure {
    constructor(_name, _class, _dependencies, _builder) {
        this.name = _name;
        this.class = _class;
        if (!!_dependencies) this.dependencies = _dependencies || [];
        if (!!_builder) this.builder = _builder;
    }

    addDependency(name) {
        if (!!this.builder) {
            if (!this.dependencies || !Array.isArray(this.dependencies))
                this.dependencies = [];
            
            if(!!this.builder.map[name]){
               dependencies.push(this.builder.map[name]);
               this.builder.dependencies.push(name);
            }
        }
        return this;
    }

    register(dependency) {
        if (!!this.builder)
            return this.builder.register(dependency);
    }

    addDependencyTree(tree){
        if (!!this.builder)
            return this.builder.addDependencyTree(tree);
    }
}

const DependencyBuilder = class DependencyBuilder {
    constructor() {
        this.map = {};
        this.dependencies = [];
    }

    register({ name, entity, value }) {
        let node = new DependenceStructure(name, entity, value, this);
        this.map[name] = node;
        return node;
    }

    getMap() {
        let resultMap  = []; 
        for (const key in Object.keys(this.map)) {
            if(!dependencies.includes(key))
                resultMap.push(this.map[key]);
        }

        return resultMap;
    }

    addDependencyTree(tree){
        var nodes = tree.split(".");

        if(nodes.length <= 1) return this;

        for (let index = 1; index < nodes.length; index++) {
            this.map[nodes[index - 1]].addDependency(nodes[index]);
        }

        return this;
    }
}

exports.DependenceStructure = DependenceStructure;
exports.DependencyBuilder = DependencyBuilder;