import { HonoRequest } from 'hono';

export const getInitDataFromHeaders = (req: HonoRequest) => {
  const initData = req.header('x-init-data');

  if (!initData) {
    throw new Error('no x-init-data');
  }

  return initData;
};
