import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Container>
            <Cabecalho></Cabecalho>
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