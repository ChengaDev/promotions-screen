import BaseApi from './BaseApi';
import Promotion from '../models/Promotion';

const promotionsPath = '/promotions';

export const loadAllPromotions = async (): Promise<Array<Promotion>> => {
    const response = await BaseApi().get(`${promotionsPath}/all`);
    return response.data;
};

export const loadPromotions = async (
    startIndex: number,
    endIndex: number
): Promise<Array<Promotion>> => {
    const response = await BaseApi().get(
        `${promotionsPath}?startIndex=${startIndex}&stopIndex=${endIndex}`
    );
    return response.data;
};

export default {
    loadAllPromotions
};
