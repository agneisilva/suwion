import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

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
            rendimento: 0,
            tempo: 0,
            dificuldade: 0
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

    cadastrar() {

    }

    render() {
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
            {/* <Row>
                <Col md={2} className="text-right">Ingredientes: </Col>
                <Col md={10}>
                    <input id="ingredientes"
                        value={this.state.ingredientes}
                        onChange={this.atribuirCarregamento.bind(this, "ingredientes")}
                        className="w-100"
                    ></input>
                </Col>
            </Row>
            <Row>
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