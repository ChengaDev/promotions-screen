import React from 'react';
import styled from 'styled-components';
import Promotion from '../../models/Promotion';
import GridColumnConfig from '../../models/GridColumnConfig';
import { FadeInAnimation } from '../../animations/Animations';
import Headers from '../Grid/Headers';
import Row from '../Grid/Row';
import { List, AutoSizer, InfiniteLoader, IndexRange } from 'react-virtualized';
import SummaryRow from './SummaryRow';

export type GridProps = {
    columns: Array<GridColumnConfig>;
    rows: Array<Promotion>;
    loadMoreRows: (params: IndexRange) => Promise<any>;
    totalRowText: string;
};

type RenderRowProps = {
    style: any;
    index: number;
    key: number | string | undefined;
};

type IsRowLoadedParams = {
    index: number;
};

const Grid = (props: GridProps) => {
    const { columns, rows } = props;

    const isRowLoaded = (params: IsRowLoadedParams) => {
        return !!rows[params.index];
    };

    const renderRow = (props: RenderRowProps) => {
        return (
            <Row
                key={props.key}
                columns={columns}
                style={props.style}
                row={rows[props.index]}
            />
        );
    };

    return (
        <Table>
            <Headers columns={columns} />
            <Body>
                <InfiniteLoader
                    isRowLoaded={isRowLoaded}
                    rowCount={10000}
                    loadMoreRows={props.loadMoreRows}
                >
                    {({ onRowsRendered, registerChild }) => (
                        <AutoSizer>
                            {({ height, width }) => (
                                <List
                                    width={width}
                                    height={450}
                                    rowHeight={50}
                                    rowRenderer={renderRow}
                                    rowCount={rows.length}
                                    ref={registerChild}
                                    onRowsRendered={onRowsRendered}
                                />
                            )}
                        </AutoSizer>
                    )}
                </InfiniteLoader>
            </Body>
            <SummaryRow displayText={`${rows.length} rows`} />
        </Table>
    );
};

const Body = styled.div`
    height: 450px;
    background-color: white;
    border-left: 1px solid lightgray;
    border-right: 1px solid lightgray;
`;

const Table = styled.div`
    text-align: left;
    animation: ${FadeInAnimation} 1s;
    min-width: fit-content;
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
    margin-bottom: 40px;
`;

export default Grid;
