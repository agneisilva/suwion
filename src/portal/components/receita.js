import React from 'react';
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

        this.state = {
            nome: "",
            preparo: [],
            ingredientes: [],
            ingredientesBusca: [],
            rendimento: 0,
            tempo: 0,
            dificuldade: 0,
            ingredienteSelecionando: {
                descricao: "",
                quantia: 0,
                undMedida: "",
                ingrediente: null
            }
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
    }

    cadastrar() {

    }

    render() {
        let { ingredientes } = this.state;
        let displayIngredientes = (ingredientes.length > 0) ? <Col md={12}>
            <ListGroup>
                {ingredientes.map((ingrediente) => {
                    return <ListGroup.Item>
                        <strong>{ingrediente.quantia} {ingrediente.undMedida}</strong> {ingrediente.descricao}
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
                        value={this.state.nome}
                        onChange={this.atribuirCarregamento.bind(this, "nome", 150)}
                        className="w-100"
                    ></input>
                    <br />
                    <label>{this.state.nome.length}/150</label>
                </Col>
            </Row>
            <Row>
                <Col md={2} className="text-right">Rendimento em porções: </Col>
                <Col md={2}>
                    <input id="rendimento"
                        value={this.state.rendimento}
                        onChange={this.atribuirCarregamento.bind(this, "rendimento", 3)}
                        className="w-100"
                    ></input>
                </Col>
                <Col md={2} className="text-right">Tempo: </Col>
                <Col md={2}>
                    <input id="tempo"
                        value={this.state.tempo}
                        onChange={this.atribuirCarregamento.bind(this, "tempo", 5)}
                        className="w-100"
                    ></input>
                </Col>
                <Col md={2} className="text-right">Dificuldade (0 - 100): </Col>
                <Col md={2}>
                    <input id="dificuldade"
                        value={this.state.dificuldade}
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
                </Col>
                <Col md={2} className="text-right">Quantia:</Col>
                <Col md={2}>
                    <input id="ingredienteQuantia"
                        value={this.state.ingredienteSelecionando.quantia}
                        onChange={this.atribuirCarregamentoIngrediente.bind(this, "quantia")}
                        className="w-100"
                    ></input></Col>
                <Col md={2}><input id="ingredienteUndMedida"
                    value={this.state.ingredienteSelecionando.undMedida}
                    onChange={this.atribuirCarregamentoIngrediente.bind(this, "undMedida")}
                    className="w-100"
                ></input></Col>
                <Col md={2}><Button>Adicionar</Button></Col>
                {displayIngredientes}
            </Row>
            {/* <Row>
                <Col md={2} className="text-right">Preparo: </Col>
                <Col md={10}>
                    <input id="preparo"
                        value={this.state.preparo}
                        onChange={this.atribuirCarregamento.bind(this, "preparo")}
                        className="w-100"
                    ></input>
                </Col>
            </Row> */}
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