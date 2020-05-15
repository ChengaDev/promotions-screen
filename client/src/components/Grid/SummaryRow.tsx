import React from 'react';
import styled from 'styled-components';

type SummaryRowProps = {
    displayText: string;
};

function SummaryRow(props: SummaryRowProps) {
    return (
        <Summary>
            <TotalRow>{props.displayText}</TotalRow>
        </Summary>
    );
}

const TotalRow = styled.div`
    position: absolute;
    font-size: 13px;
    right: 0;
    margin-right: 20px;
    font-weight: 700;
`;

const Summary = styled.div`
    background-color: #e4f0e5;
    position: relative;
    height: 40px;
    line-height: 40px;
    border-radius: 0 0 5px 5px;
    border-top: 2px solid lightgray;
    border-bottom: 1px solid lightgray;
    border-right: 1px solid lightgray;
    border-left: 1px solid lightgray;
`;

export default React.memo(SummaryRow);
