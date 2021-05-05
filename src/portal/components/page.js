import React from 'react';
import { Container, Row, Col, Nav, Navbar, ListGroup } from 'react-bootstrap';
import Link from 'next/link';

class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const layoutStyle = {
        };

        const contentStyle = {
            minHeight: "50vh"
        };

        return <div className="Layout" style={layoutStyle}>
            <Cabecalho />
            <Menu />
            <Container className="Content container" style={contentStyle}>
                {this.props.children}
            </Container>
            <Rodape />
        </div>;
    }
}

class Cabecalho extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <header>
            <Navbar className="Header" >
                <Container className="">
                    <svg className="mb-4" alt="" width="50" height="50" viewBox="26.9 17.1 135.1 117.3" xmlns="http://www.w3.org/2000/svg"><path d="m124.4 67.8-28.8-49.9c-.3-.6-1-.8-1.5-.5-.2.1-.4.3-.5.5l-28.8 49.9 29.8-17.2zm-67.9 28.7 17.6 5.6v4.2l20.4 11.8 15.3-8.8-53.4-16.9v-10.4l-29.2 50.6c-.3.6-.2 1.3.4 1.6.2.1.4.2.6.2h59.2l-31-17.9v-20zm105.3 36.1-29.2-50.6v10.4l-17.5-5.6v-4.1l-20.4-11.8-15 8.7 53 17v19.9l-31 17.9h59.2c.7-.1 1.1-.8 1-1.5 0-.1 0-.2-.1-.3z" fill="#f3a41e" /></svg>
                    <a href="#" className="navbar-brand d-flex align-items-left py-2">Suwion</a>
                    <Nav className="justify-content-right" defaultActiveKey="/home" as="ul">
                        <Nav.Item as="li">
                            <Link href="/usuario/cadastrar">
                                <a className="nav-link">Cadastrar</a>
                            </Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Link href="/usuario/autenticar">
                                <a className="nav-link">Autenticar</a>
                            </Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </header>;
    }
}


class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Nav className="justify-content-center" defaultActiveKey="/home" as="ul">
            <Nav.Item as="li">
                <Link href="/">
                    <a className="nav-link">Cardápios</a>
                </Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Link href="/usuario/cadastrar">
                    <a className="nav-link">Lista de Compras</a>
                </Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Link href="/usuario/listar">
                    <a className="nav-link">Receitas</a>
                </Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Link href="/usuario/autenticar">
                    <a className="nav-link">Ingredientes</a>
                </Link>
            </Nav.Item>
        </Nav>;
    }
}

class Rodape extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <footer
            style={{ backgroundColor: "#DFDFDF", padding: "15px 0px 10px", minHeight: "20vh" }}>
            <Container>
                Suwion - Site Map
                <Row>
                    <Col lg={3} md={6} sm={12}>
                        <strong>Usuário</strong>
                        <ListGroup>
                            <ListGroup.Item>
                                <Link href="/usuario/cadastrar">
                                    Cadastrar
                                </Link>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Link href="/usuario/autenticar">
                                    Autenticar
                                </Link>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Link href="/usuario/perfil">
                                    Perfil
                                </Link>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Link href="/usuario/editar">
                                    Editar
                                </Link>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Link href="/usuario/listar">
                                    Localizar
                                </Link>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                        <strong>Receitas</strong>
                        <ListGroup>
                            <ListGroup.Item>
                                <Link href="/receita/localizar">
                                    Localizar
                                </Link>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Link href="/receita/cadastrar">
                                    Cadastrar
                                </Link>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Link href="/receita/top20sem">
                                    Top 20 da semana
                                </Link>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                        <strong>...</strong>

                    </Col>
                    <Col lg={3} md={6} sm={12}>
                        <strong>Redes Sociais</strong>

                    </Col>
                </Row>
            </Container>
        </footer>;
    }
}

export default Page;