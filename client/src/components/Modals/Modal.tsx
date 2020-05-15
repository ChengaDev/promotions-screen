import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

class Modal extends React.Component {
    el: HTMLElement;
    modalRoot: HTMLElement;

    constructor(props: any) {
        super(props);
        this.el = document.createElement('div');
        this.modalRoot = document.getElementById('modal-root') as HTMLElement;
    }

    componentDidMount() {
        this.modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        this.modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            <DarkOverlay>{this.props.children}</DarkOverlay>,
            this.el
        );
    }
}

const DarkOverlay = styled.div`
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default Modal;
