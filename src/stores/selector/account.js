export const getTransactions = ({account: {transactions}}) => {
  let filteredTransaction = transactions.filter(
    transaction => !transaction.deletedAt,
  );
  return filteredTransaction;
};
