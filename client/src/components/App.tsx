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
import ErrorModal from './Modals/ErrorModal';
import LoaderModal from './Modals/LoaderModal';

function App() {
    const firstPageSize = 10;
    const [showWelcomeModal, setShowWelcomeModal] = useState(true);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showLoaderModal, setShowLoaderModal] = useState(false);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [rows, setRows] = useState<Promotion[]>([]);
    const [columns, setColumns] = useState<GridColumnConfig[]>([]);

    // used for initial data load - columns & first pages
    const loadInitialData = async () => {
        try {
            // only fetch once
            setIsFetching(true);

            // perform fetch
            let promotions = await loadPromotions(0, firstPageSize);
            let columns = await loadColumns();

            // save the result
            setRows(promotions);
            setColumns(columns);

            setIsFetching(false);
        } catch (error) {
            setShowErrorModal(true);
            setIsFetching(false);
        }
    };

    // used for lazy load - new rows
    const loadMoreRows = async (params: IndexRange) => {
        return loadPromotions(params.startIndex, params.stopIndex)
            .then((promotions) => {
                setRows([...rows, ...promotions]);
            })
            .catch(() => {
                setShowErrorModal(true);
            });
    };

    const loadTenThousandRows = async () => {
        setShowLoaderModal(true);
        return loadMoreRows({ startIndex: 0, stopIndex: 10000 }).then(() => {
            setTimeout(() => {
                setShowLoaderModal(false);
            }, 1500);
        });
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

    const renderEmptyState = () => {
        return (
            <RedMessage>
                <div>Nothing to display</div>
            </RedMessage>
        );
    };

    const renderContent = () => {
        if (isFetching) {
            return <Loader />;
        } else if (rows.length === 0 || columns.length === 0) {
            return renderEmptyState();
        }
        return renderGrid();
    };

    const closeWelcomeModal = () => {
        setShowWelcomeModal(false);
        loadInitialData();
    };

    const closeErrorModal = () => {
        setShowErrorModal(false);
    };

    return (
        <Container>
            <h1>Promotions Grid</h1>
            <ErrorBoundary>
                <Content>{renderContent()}</Content>
            </ErrorBoundary>
            <LoadButton onClick={loadTenThousandRows}>
                Load 10,000 rows
            </LoadButton>
            {showErrorModal && <ErrorModal closeModal={closeErrorModal} />}
            {showWelcomeModal && (
                <WelcomeModal closeModal={closeWelcomeModal} />
            )}
            {showLoaderModal && <LoaderModal />}
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
