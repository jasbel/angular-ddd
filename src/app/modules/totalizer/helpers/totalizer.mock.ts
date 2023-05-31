import { v4 } from 'uuid';
import { ITotalizerInfo } from '../models';
import { generateArray, randomString, sId } from 'src/app/utils';

const itemTotalizer: () => ITotalizerInfo = () => ({
  id: <sId>v4(),
  collection: randomString(6),
  password: randomString(6),
});

export const mockDataTotalizer = generateArray(10).map((a) => itemTotalizer());
