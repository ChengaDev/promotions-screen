import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';

type ErrorModalProps = {
    closeModal: () => void;
};

function ErrorModal(props: ErrorModalProps) {
    return (
        <Modal>
            <Container>
                <ErrorTitle>OOPS...</ErrorTitle>
                <ErrorContent>
                    Looks like something went wrong.
                    <br />
                    We suggest to retry again or talk to our support at
                    050-9933573
                </ErrorContent>
                <Button onClick={props.closeModal}>OK</Button>
            </Container>
        </Modal>
    );
}

const ErrorTitle = styled.div`
    color: #fc0356;
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

const ErrorContent = styled.div`
    font-size: 20px;
    margin-top: 30px;
    font-weight: 300;

    @media screen and (max-width: 768px) {
        font-size: 16px;
    }
`;

const Button = styled.button`
    background-color: #fc0356;
    color: white;
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

export default React.memo(ErrorModal);
