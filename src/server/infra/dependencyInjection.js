const reqAccessKey = "$$";
const isClass = fn => /^\s*class/.test(fn.toString());

var LoadMaps = (allMaps) => {

    var leDependecie;

    return (req, res, next) => {
        // if (!leDependecie) {
        //     leDependecie = {};
        //     let keys = Object.keys(allMaps);
        //     for (let key in keys) {
        //         leDependecie[keys[key]] = dependenciesResolve(allMaps[keys[key]], req);
        //     }
        // }

        req.__maps__ = allMaps;

        next();
    };
}

const LoadDependencies = (context) => {

    return (req, res, next) => {
        let dep = dependenciesResolve(req.__maps__[context.constructor.name], req);
        let keys = Object.keys(dep);
        for (let dependency in keys) {
            context[keys[dependency]] = dep[keys[dependency]];
        }
        delete req.__maps__;

        next();
    };
}

const dependenciesResolve = (dependencyMap, req) => {
    let toInject = {};
    for (let dependency in dependencyMap) {
        if (dependencyMap[dependency] instanceof DependenceStructure) {
            //Verifica se a dependencia precisa ser instanciada (class)
            if (!!dependencyMap[dependency].class && isClass(dependencyMap[dependency].class)) {
                let args;
                if (dependencyMap[dependency].dependencies.length > 0) args = dependenciesResolve(dependencyMap[dependency].dependencies, req);
                // //chamar recursivo para resolver as dependencias da dependencia
                // for (let innerDependence in dependencyMap[dependency].dependencies) {

                //     args = Object.assign(
                //         dependenciesResolve(dependencyMap[dependency].dependencies, req),
                //         args);
                // }
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
        this.dependencies = _dependencies || [];
        if (!!_builder) this.builder = _builder;
    }

    addDependency(name) {
        if (!!this.builder) {
            if (!this.dependencies || !Array.isArray(this.dependencies))
                this.dependencies = [];

            if (!!this.builder.map[name]) {
                this.dependencies.push(this.builder.map[name]);
                this.builder.dependencies.push(name);
            }
        }
        return this;
    }

    register(dependency) {
        if (!!this.builder)
            return this.builder.register(dependency);
    }

    addDependencyTree(tree) {
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
        let resultMap = [];
        let keys = Object.keys(this.map);
        for (const key in keys) {
            if (!this.dependencies.includes(keys[key]))
                resultMap.push(this.map[keys[key]]);
        }

        return resultMap;
    }

    addDependencyTree(tree) {
        var nodes = tree.split(".");

        if (nodes.length <= 1) return this;

        for (let index = nodes.length - 1; index > 0; index--) {
            this.map[nodes[index - 1]].addDependency(nodes[index]);
        }

        return this;
    }
}

exports.DependenceStructure = DependenceStructure;
exports.DependencyBuilder = DependencyBuilder;
exports.LoadMaps = LoadMaps;
exports.LoadDependencies = LoadDependencies;
