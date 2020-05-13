import BaseApi from './BaseApi';
import GridColumnConfig from '../models/GridColumnConfig';

const gridColumnsConfigPath = '/config';

export const loadColumns = async (): Promise<Array<GridColumnConfig>> => {
    const response = await BaseApi().get(gridColumnsConfigPath);
    return response.data;
};

export default {
    loadColumns
};
