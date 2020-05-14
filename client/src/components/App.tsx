import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Loader from './Loader';
import Grid, { GridProps } from './Grid/Grid';
import Promotion from '../models/Promotion';
import GridColumnConfig from '../models/GridColumnConfig';
import { loadPromotions } from '../api/Promotions';
import { loadColumns } from '../api/GridColumnConfig';
import { FadeInAnimation } from '../animations/Animations';

function App() {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [rows, setRows] = useState<Promotion[]>([]);
    const [columns, setColumns] = useState<GridColumnConfig[]>([]);
    const [error, setError] = useState<string | null>(null);

    const onLoadButtonClick = useCallback(async () => {
        try {
            // only fetch once
            if (isFetching) return;

            setIsFetching(true);

            // perform fetch
            let promotions = await loadPromotions();
            let columns = await loadColumns();

            // save the result
            setRows(promotions);
            setColumns(columns);

            setIsFetching(false);
        } catch (error) {
            setError(error);
            setIsFetching(false);
        }
    }, [isFetching]);

    const renderGrid = () => {
        let gridProps: GridProps = {
            rows,
            columns,
            totalRowText: 'rows'
        };
        return <Grid {...gridProps} />;
    };

    const renderError = () => {
        return <RedMessage>OOPS... an error has occured :(</RedMessage>;
    };

    const renderEmptyState = () => {
        return (
            <RedMessage>
                <div>Nothing to display...</div>
                <div>Click the button to load data :)</div>
            </RedMessage>
        );
    };

    const renderContent = () => {
        if (isFetching) {
            return <Loader />;
        } else if (error) {
            return renderError();
        } else if (rows.length === 0 || columns.length === 0) {
            return renderEmptyState();
        }
        return renderGrid();
    };

    return (
        <Container>
            <h1>Promotions Grid</h1>
            <Content>{renderContent()}</Content>
            <LoadButton onClick={onLoadButtonClick}>
                Load data from server
            </LoadButton>
        </Container>
    );
}

const RedMessage = styled.div`
    padding: 30px;
    color: red;
    font-size: 25px;

    & h1 {
        font-weight: bold;
    }
`;

const Container = styled.div`
    animation: ${FadeInAnimation} 1s;
    padding-top: 50px;
    text-align: center;
`;

const LoadButton = styled.button`
    margin-top: 30px;
    margin-bottom: 30px;
    cursor: pointer;
    height: 50px;
    width: 200px;
    background-color: #366fb5;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 5px;

    &:hover {
        background-color: #5a9ae8;
    }
`;

const Content = styled.div`
    padding-top: 40px;
`;

export default App;
