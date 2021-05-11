import React from 'react';
import fetch from 'node-fetch';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';

class Receita extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>Receita</div>
    }
}

class CadastroReceita extends React.Component {
    constructor(props) {
        super(props);

        this.cadastrar = this.cadastrar.bind(this);
        this.adicionarPasso = this.adicionarPasso.bind(this);
        this.adicionarIngrediente = this.adicionarIngrediente.bind(this);
        this.buscarAutoCompleteIngrediente = this.buscarAutoCompleteIngrediente.bind(this);

        this.state = {
            receita: {
                nome: "",
                preparo: [],
                ingredientes: [],
                rendimento: 0,
                tempo: 0,
                dificuldade: 0,
            },
            ingredientesBusca: [],
            ingredienteSelecionando: {
                descricao: "",
                quantia: 0,
                undMedida: "",
                ingrediente: null
            },
            passo: ""
        };
    }

    atribuirCarregamento(campo, total, e) {
        var valor = e.target.value;
        if (valor.length > total) {
            debugger;
            valor = valor.substring(0, total);
        }
        this.setState(prevState => {
            var altered = Object.assign({}, prevState);
            altered.receita[campo] = valor;
            return altered;
        });
    }

    atribuirCarregamentoPasso(campo, total, e) {
        var valor = e.target.value;
        if (valor.length > total) {
            valor = valor.substring(0, total);
        }
        this.setState(prevState => {
            var altered = Object.assign({}, prevState);
            altered[campo] = valor;
            return altered;
        });
    }

    atribuirCarregamentoIngrediente(campo, e) {
        var valor = e.target.value;
        this.setState(prevState => {
            var altered = Object.assign({}, prevState);
            altered.ingredienteSelecionando[campo] = valor;
            return altered;
        });

        //TODO implementar controle de delay para só buscar o auto complete depois do usuário parar de digitar por 1.5seg
        if (campo == "descricao") this.buscarAutoCompleteIngrediente(valor);
    }

    cadastrar() {
        console.log("cadastrar");
    }

    adicionarPasso() {
        if (!!this.state.passo && this.state.passo.length > 0) {

            this.setState(prevState => {
                var altered = Object.assign({}, prevState);
                altered.receita.preparo.push(altered.passo);
                altered.passo = "";
                return altered;
            });
        }
    }

    adicionarIngrediente() {
        console.log("adicionarIngrediente");
    }

    buscarAutoCompleteIngrediente(descricao) {
        console.log("buscarAutoCompleteIngrediente " + descricao);
        let self = this;

        fetch('http://localhost:3100/ingredientes/autocomplete',
            {
                method: 'POST',
                body: JSON.stringify({ descricao }),
                headers:
                {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then(result => result.json())
            .then(result => result.content)
            .then(result => {
                console.log(result);
                self.setState(prevState => {
                    var altered = Object.assign({}, prevState);
                    altered.ingredientesBusca = result;
                    return altered;
                });
            })
            .catch(err => err.content || err.message)
            .catch(err => {
                console.log(err);
                alert(JSON.stringify(err));
            });

    }

    render() {
        let { ingredientes, preparo } = this.state.receita;
        let { ingredientesBusca } = this.state;

        let displayIngredientes = (ingredientes.length > 0) ? <Col md={12}>
            <ListGroup>
                {ingredientes.map((ingrediente, idx) => {
                    return <ListGroup.Item key={"ingrediente" + idx}>
                        <strong>{ingrediente.quantia} {ingrediente.undMedida}</strong> {ingrediente.descricao}
                    </ListGroup.Item>
                })}
            </ListGroup>
        </Col> : null;

        let displayPreparo = (preparo.length > 0) ? <Col md={12}>
            <ListGroup>
                {preparo.map((passo, idx) => {
                    return <ListGroup.Item key={"passo" + idx}>
                        {passo}
                    </ListGroup.Item>
                })}
            </ListGroup>
        </Col> : null;

        let displayIngredienteHints = (ingredientesBusca.length > 0) ? <Col md={12}>
            <ListGroup>
                {ingredientesBusca.map((ingrediente, idx) => {
                    return <ListGroup.Item key={"ingrHint" + idx}>
                        {ingrediente.descricao}
                    </ListGroup.Item>
                })}
            </ListGroup>
        </Col> : null;

        return <div>
            <h3 className="card-title">Cadastro de Receita</h3>
            <Row>
                <Col md={2} className="text-right">Nome: </Col>
                <Col md={10}>
                    <input id="nome"
                        value={this.state.receita.nome}
                        onChange={this.atribuirCarregamento.bind(this, "nome", 150)}
                        className="w-100"
                    ></input>
                    <br />
                    <label>{this.state.receita.nome.length}/150</label>
                </Col>
            </Row>
            <Row>
                <Col md={2} className="text-right">Rendimento em porções: </Col>
                <Col md={2}>
                    <input id="rendimento"
                        value={this.state.receita.rendimento}
                        onChange={this.atribuirCarregamento.bind(this, "rendimento", 3)}
                        className="w-100"
                    ></input>
                </Col>
                <Col md={2} className="text-right">Tempo: </Col>
                <Col md={2}>
                    <input id="tempo"
                        value={this.state.receita.tempo}
                        onChange={this.atribuirCarregamento.bind(this, "tempo", 5)}
                        className="w-100"
                    ></input>
                </Col>
                <Col md={2} className="text-right">Dificuldade (0 - 100): </Col>
                <Col md={2}>
                    <input id="dificuldade"
                        value={this.state.receita.dificuldade}
                        onChange={this.atribuirCarregamento.bind(this, "dificuldade", 3)}
                        className="w-100"
                    ></input>
                </Col>
            </Row>
            <Row>
                <Col md={2} className="text-right">Ingrediente: </Col>
                <Col md={2}>
                    <input id="ingrediente"
                        value={this.state.ingredienteSelecionando.descricao}
                        onChange={this.atribuirCarregamentoIngrediente.bind(this, "descricao")}
                        className="w-100"
                    ></input>
                    {displayIngredienteHints}
                </Col>
                <Col md={2} className="text-right">Quantia:</Col>
                <Col md={2}>
                    <input id="ingredienteQuantia"
                        type="number"
                        value={this.state.ingredienteSelecionando.quantia}
                        onChange={this.atribuirCarregamentoIngrediente.bind(this, "quantia")}
                        className="w-100"
                    ></input></Col>
                <Col md={2}><input id="ingredienteUndMedida"
                    value={this.state.ingredienteSelecionando.undMedida}
                    onChange={this.atribuirCarregamentoIngrediente.bind(this, "undMedida")}
                    className="w-100"
                ></input></Col>
                <Col md={2}><Button onClick={this.adicionarIngrediente}>Adicionar</Button></Col>
                {displayIngredientes}
            </Row>
            <Row>
                <Col md={2} className="text-right">Preparo: </Col>
                <Col md={8}>
                    <input id="preparo"
                        value={this.state.passo}
                        onChange={this.atribuirCarregamentoPasso.bind(this, "passo", 500)}
                        className="w-100"
                    ></input>
                    <br />
                    <label>{this.state.passo.length}/500</label>
                </Col>
                <Col md={2}><Button onClick={this.adicionarPasso}>Adicionar Passo</Button></Col>
                {displayPreparo}
            </Row>
            <Row>
                <Col md={12} className="text-right">
                    <Button id="cadastrar" onClick={this.cadastrar}>Cadastrar</Button>
                </Col>
            </Row>
        </div>
    }
}

class BuscaReceita extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>BuscaReceita</div>
    }
}

export {
    Receita,
    CadastroReceita,
    BuscaReceita
};