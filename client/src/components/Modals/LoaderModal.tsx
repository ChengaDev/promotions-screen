import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import logo from '../../logo.svg';
import { Rotate } from '../../animations/Animations';

function LoaderModal() {
    return (
        <Modal>
            <Container>
                Sing like no one is listening...
                <br />
                <Logo src={logo} />
            </Container>
        </Modal>
    );
}

const Logo = styled.img`
    animation: ${Rotate} 2s linear infinite;
    position: relative;
    top: 10px;
    width: 200px;
    height: 200px;

    @media screen and (max-width: 768px) {
        width: 80%;
        width: 150px;
        height: 150px;
    }
`;

const Container = styled.div`
    padding-top: 30px;
    text-align: center;
    background-color: white;
    position: relative;
    height: 250px;
    width: 400px;
    border-radius: 5px;

    @media screen and (max-width: 768px) {
        width: 80%;
        height: 200px;
        width: 300px;
    }
`;

export default React.memo(LoaderModal);
