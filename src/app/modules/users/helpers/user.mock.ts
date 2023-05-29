import { v4 } from 'uuid';
import { IUserInfo } from '../models';
import { generateArray, randomString, sId } from 'src/app/utils';

const itemUser: () => IUserInfo = () => ({
  id: <sId>v4(),
  name: randomString(6),
  password: randomString(6),
});

export const mockDataUser = generateArray(10).map((a) => itemUser());
