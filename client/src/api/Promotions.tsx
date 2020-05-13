import BaseApi from './BaseApi';
import Promotion from '../models/Promotion';

const promotionsPath = '/promotions';

export const loadPromotions = async (): Promise<Array<Promotion>> => {
    const response = await BaseApi().get(promotionsPath);
    return response.data;
};

export default {
    loadPromotions
};
