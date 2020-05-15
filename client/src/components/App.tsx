import React, { useState } from 'react';
import styled from 'styled-components';
import Loader from './Loader';
import Grid, { GridProps } from './Grid/Grid';
import Promotion from '../models/Promotion';
import GridColumnConfig from '../models/GridColumnConfig';
import { loadPromotions } from '../api/Promotions';
import { loadColumns } from '../api/GridColumnConfig';
import { FadeInAnimation } from '../animations/Animations';
import { IndexRange } from 'react-virtualized';
import ErrorBoundary from './ErrorBoundary';
import WelcomeModal from './Modals/WelcomeModal';

function App() {
    const firstPageSize = 10;
    const [showWelcomeModal, setShowWelcomeModal] = useState(true);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [rows, setRows] = useState<Promotion[]>([]);
    const [columns, setColumns] = useState<GridColumnConfig[]>([]);
    const [error, setError] = useState<string | null>(null);

    // used for initial data load - columns & first rows
    const onLoadButtonClick = async () => {
        try {
            // only fetch once
            if (isFetching) return;
            setIsFetching(true);

            // perform fetch
            let promotions = await loadPromotions(0, firstPageSize);
            let columns = await loadColumns();

            // save the result
            setRows(promotions);
            setColumns(columns);

            setIsFetching(false);
        } catch (error) {
            setError(error);
            setIsFetching(false);
        }
    };

    // used for lazy load - new rows
    const loadMoreRows = async (params: IndexRange) => {
        return loadPromotions(params.startIndex, params.stopIndex).then(
            (promotions) => {
                setRows([...rows, ...promotions]);
            }
        );
    };

    const renderGrid = () => {
        let gridProps: GridProps = {
            rows,
            columns,
            loadMoreRows,
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

    const closeModal = () => {
        setShowWelcomeModal(false);
    };

    return (
        <Container>
            <h1>Promotions Grid</h1>
            <ErrorBoundary>
                <Content>{renderContent()}</Content>
            </ErrorBoundary>
            <LoadButton onClick={onLoadButtonClick}>
                Load data from server
            </LoadButton>
            {showWelcomeModal && <WelcomeModal closeModal={closeModal} />}
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
    animation: ${FadeInAnimation} 1s;
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
