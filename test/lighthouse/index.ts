import lighthouse from 'lighthouse/lighthouse-core';
import * as lhConfig from './config';

export const lighthouseReport = async (target) => {
  return JSON.parse((await lighthouse(target, lhConfig)).report);
};
