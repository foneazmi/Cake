import {camelize} from '../../helpers';

export const getTransactions = ({account: {transactions}}) => {
  let filteredTransaction = transactions.filter(
    transaction => !transaction.deletedAt,
  );
  return filteredTransaction;
};

export const getFeatures = ({account: {features}}) => {
  return features.reduce((acc, cur) => {
    acc[`${camelize(cur.name)}`] = cur.active;
    return acc;
  }, {});
};

export const getAccounts = ({account: {accounts}}) => {
  return {
    archivedAccounts: accounts.filter(account => account.archivedAt),
    activeAccounts: accounts.filter(account => !account.archivedAt),
  };
};
