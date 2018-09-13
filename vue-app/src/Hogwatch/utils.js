export default {
  formatTransferRate: (kbps) => {
    if (kbps / 1000 >= 1.0) return `${(kbps / 1000).toFixed(2)} MB/s`;
    return `${kbps} KB/s`;
  },

  formatTransferAmount: (kb) => {
    if (kb / 1000 >= 1.0) return `${(kb / 1000).toFixed(2)} MB`;
    return `${kb} KB`;
  },
  fixPrecision: (num, precision = 2) => parseFloat(num.toFixed(precision)),
};
