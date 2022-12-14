import moment from 'moment';
import {
  getDeviceId,
  getBrand,
  getModel,
  getSystemName,
  getUniqueId,
} from 'react-native-device-info';

export const logTelegram = async (...args) => {
  const time = moment().format('D/M/Y H:mm:ss');
  let url = 'https://bot.khan.my.id/log?chatId=-1001550758874&clientName=Cake';
  fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      ...args,
      '__________________________________',
      `🔥 ID::${await getUniqueId()}`,
      `📱 Device::${getDeviceId()}:${getModel()}:${getBrand()}:${getSystemName()}`,
      `[${time}]`,
    ]),
  });
};

export const log = (...args) => {
  __DEV__ && console.log(...args);
};

export const logger = (...args) => {
  logTelegram(...args);
  log(...args);
};
