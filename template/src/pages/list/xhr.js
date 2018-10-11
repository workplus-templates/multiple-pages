import { request } from 'shared/utils';

export const getTopics = (start, end) => request({ path: `/topics` });