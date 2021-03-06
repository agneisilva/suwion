import React from 'react';
import fetch from 'node-fetch';
import { Container, Row, Col, Table, Form, FormControl, Button, FormLabel, FormGroup } from 'react-bootstrap';
import { AutenticacaoService as authService } from '../services/auth.js';

class Autenticacao extends React.Component {
    constructor(props) {
        super(props);

        this.logar = this.logar.bind(this);

        this.state = {
            login: "",
            senha: ""
        };
    }

    atribuirCarregamento(campo, e) {
        var valor = e.target.value;
        this.setState(prevState => {
            var altered = Object.assign({}, prevState);
            altered[campo] = valor;
            return altered;
        });
    }

    logar() {
        fetch('http://localhost:3100/login',
            {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers:
                {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then(result => result.json())
            // .then(result => result.content)
            .then(result => {
                console.log(result);
                new authService().logar(result.content);
            })
            .catch(err => err.content || err.message)
            .catch(err => {
                console.log(err);
                alert(JSON.stringify(err));
            });
    }

    render() {
        return <Container>
            <h1 className="h3 mb-3 font-weight-normal">Por favor, se faça seu login</h1>
            <div>
                <label>Nickname</label>
                <input id="login"
                    value={this.state.login}
                    onChange={this.atribuirCarregamento.bind(this, "login")}
                    type="text"
                    className="mr-sm-2" />
            </div>
            <div>
                <label>Senha </label>
                <input id="senha"
                    value={this.state.senha}
                    onChange={this.atribuirCarregamento.bind(this, "senha")}
                    type="text"
                    className="mr-sm-2" />
            </div>
            <button className="btn-primary" onClick={this.logar}>Acessar</button>
            <div><a href="/">Esqueceu?</a></div>

        </Container>;
    }
}

class CadastroUsuario extends React.Component {
    constructor(props) {
        super(props);

        this.cadastrar = this.cadastrar.bind(this);

        this.state = {
            nome: "",
            email: "",
            nickName: "",
            senha: ""
        };
    }

    atribuirCarregamento(campo, e) {
        var valor = e.target.value;
        this.setState(prevState => {
            var altered = Object.assign({}, prevState);
            altered[campo] = valor;
            return altered;
        });
    }

    cadastrar() {
        fetch('http://localhost:3100/usuario',
            {
                method: 'POST',
                body: JSON.stringify(this.state),
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
                alert(JSON.stringify(result));
            })
            .catch(err => err.content || err.message)
            .catch(err => {
                console.log(err);
                alert(JSON.stringify(err));
            });
    }

    render() {
        return <div>CadastroUsuario
            <Row>
                <Col md={3}>Nome: </Col>
                <Col md={9}>
                    <input id="nome"
                        value={this.state.nome}
                        onChange={this.atribuirCarregamento.bind(this, "nome")}
                    ></input>
                </Col>
            </Row>
            <div>
                <label>Email: </label>
                <input id="email"
                    value={this.state.email}
                    onChange={this.atribuirCarregamento.bind(this, "email")}></input>
            </div>
            <div>
                <label>NickName: </label>
                <input id="nickName"
                    value={this.state.nickName}
                    onChange={this.atribuirCarregamento.bind(this, "nickName")}></input>
            </div>
            <div>
                <label>Senha: </label>
                <input id="senha"
                    value={this.state.senha}
                    onChange={this.atribuirCarregamento.bind(this, "senha")}></input>
            </div>
            <div>
                <button id="cadastrar" onClick={this.cadastrar}>Cadastrar</button>
            </div>
        </div>
    }
}

class PerfilUsuario extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>PerfilUsuario</div>
    }
}

class ListarUsuarios extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            usuarios: []
        };
    }

    render() {

        let conteudo = this.state.usuarios.map(usuario => {
            return <tr>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>{usuario.nickName}</td>
            </tr>

        });

        let cabecalho =
            <tr>
                <td>Nome</td>
                <td>Email</td>
                <td>NickName</td>
            </tr>;

        return <Table striped bordered hover>
            <thead>
                {cabecalho}
            </thead>
            <tbody>
                {conteudo}
            </tbody>
        </Table>
    }

    listarUsuarios() {
        fetch('http://localhost:3100/usuario',
            {
                method: 'POST',
                body: JSON.stringify(this.state),
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
                alert(JSON.stringify(result));
            })
            .catch(err => err.content || err.message)
            .catch(err => {
                console.log(err);
                alert(JSON.stringify(err));
            });
    }
}

class EditarUsuario extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>EditarUsuario</div>
    }
}

export {
    CadastroUsuario,
    EditarUsuario,
    ListarUsuarios,
    Autenticacao
};