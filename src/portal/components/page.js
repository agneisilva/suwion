import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import Link from 'next/link';

class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Container>
            <Cabecalho></Cabecalho>
            <Menu></Menu>
            {this.props.children}
            <Rodape></Rodape>
        </Container>;
    }
}

class Cabecalho extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>CABEÇALHO</div>;
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
                    <a className="nav-link">Home</a>
                </Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Link href="/usuario/cadastrar">
                    <a className="nav-link">Cadastrar</a>
                </Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Link href="/usuario/listar">
                    <a className="nav-link">Listar</a>
                </Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Link href="/usuario/editar">
                    <a className="nav-link">Editar</a>
                </Link>
            </Nav.Item>
        </Nav>;


        //     return  <ul>
        //     <li>
        //         <Link href="/">
        //             <a>Home</a>
        //         </Link>
        //     </li>
        //     <li>
        //         <Link href="/usuario/cadastrar">
        //             <a>Cadastrar</a>
        //         </Link>
        //     </li>
        //     <li>
        //         <Link href="/usuario/listar">
        //             <a>Listar</a>
        //         </Link>
        //     </li>
        // </ul>;
    }
}

class Rodape extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = new Date().getFullYear();

        if (data > 2021) {
            data = "2021 - " + data;
        }

        return <div>
            <div>&copy;{data} SUWION</div>
        </div>;
    }
}

export default Page;