import styled from 'styled-components';

export interface CellProps {
    readonly minWidth: string | undefined;
    readonly relativeWidth: number | undefined;
}

export const Cell = styled.div<CellProps>`
    color: black;
    text-indent: 15px;
    box-sizing: border-box;
    font-size: 15px;
    line-height: 50px;
    font-weight: 700;
    flex: ${(props: CellProps) => props.relativeWidth};
    min-width: ${(props: CellProps) => props.minWidth};

    @media screen and (max-width: 1200px) {
        text-indent: 10px;
        font-size: 12px;
    }

    @media screen and (max-width: 768px) {
        text-indent: 5px;
        font-size: 7px;
        min-width: 30px;
        flex: 1;
    }
`;

export const MenuIcon = styled.span`
    cursor: pointer;
    line-height: 40px;
    font-size: 30px;

    &:hover {
        color: red;
        font-weight: bold;
    }

    @media screen and (max-width: 768px) {
        font-size: 15px;
        min-width: 30px;
    }
`;
