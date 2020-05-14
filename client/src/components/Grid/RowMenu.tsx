import React from 'react';
import styled from 'styled-components';
import { FadeInAnimation } from '../../animations/Animations';

function RowMenu() {
    return (
        <Container>
            <div>
                <EditButton>Edit</EditButton>
            </div>
            <div>
                <DeleteButton>Delete</DeleteButton>
            </div>
            <div>
                <DuplicateButton>Duplicate</DuplicateButton>
            </div>
        </Container>
    );
}

const Button = styled.button`
    height: 25px;
    border: 1px solid black;
    margin-top: 8px;
    border-radius: 5px;
    width: 80px;
`;

const EditButton = styled(Button)`
    background-color: yellow;
`;

const DuplicateButton = styled(Button)`
    background-color: green;
    color: white;
`;

const DeleteButton = styled(Button)`
    background-color: red;
    color: white;
`;

const Container = styled.div`
    padding-top: 10px;
    text-align: center;
    border-radius: 5px;
    animation: ${FadeInAnimation} 0.4s;
    width: 120px;
    height: 120px;
    right: 20px;
    z-index: 1;
    position: absolute;
    background-color: #d8e3e0;
    box-shadow: 0 0 12px #888;
`;

export default RowMenu;
