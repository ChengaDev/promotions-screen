import React from 'react';
import logo from '../logo.svg';
import styled from 'styled-components';
import { Rotate } from '../animations/Animations';
import { FadeInAnimation } from '../animations/Animations';

function Loader() {
    return (
        <LoaderWrapper>
            <LoaderImage src={logo} alt='logo' />
            <LoaderText>Sing like no one is listening...</LoaderText>
        </LoaderWrapper>
    );
}

const LoaderWrapper = styled.div`
    margin-top: 30px;
    animation: ${FadeInAnimation} 0.8s;
`;

const LoaderImage = styled.img`
    animation: ${Rotate} 2s linear infinite;
    height: 180px;
    width: 180px;
    margin: 0 auto;
`;

const LoaderText = styled.div`
    margin-top: -20px;
    font-size: 30px;
    color: #34e5eb;
`;

export default Loader;
