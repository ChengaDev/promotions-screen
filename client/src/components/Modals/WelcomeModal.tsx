import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';

type WelcomeModalProps = {
    closeModal: () => void;
};

function WelcomeModal(props: WelcomeModalProps) {
    return (
        <Modal>
            <Container>
                <WelcomeTitle>Welcome to promotions screen!</WelcomeTitle>
                <WelcomeContent>
                    In this screen you will be able to view promotions data of
                    specific users. <br />
                    Have fun!
                </WelcomeContent>
                <WelcomeButton onClick={props.closeModal}>
                    Got it!
                </WelcomeButton>
            </Container>
        </Modal>
    );
}

const WelcomeTitle = styled.div`
    font-size: 25px;
    font-weight: bold;

    @media screen and (max-width: 768px) {
        font-size: 20px;
    }
`;

const Container = styled.div`
    padding: 30px;
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

const WelcomeContent = styled.div`
    font-size: 20px;
    margin-top: 30px;
    font-weight: 300;

    @media screen and (max-width: 768px) {
        font-size: 16px;
    }
`;

const WelcomeButton = styled.button`
    background-color: #d8e5e8;
    cursor: pointer;
    position: relative;
    width: 150px;
    height: 40px;
    border: none;
    border-radius: 5px;
    margin-top: 60px;

    @media screen and (max-width: 768px) {
        margin-top: 40px;
    }
`;

export default React.memo(WelcomeModal);
