import { countDateByYear, countDateByQuarter, countDateByMonth } from "../Statistic/function";

export const updateRecent = (expiredList, setter) => {
  const getRecent = (obj) => Object.values(obj).pop();
  setter({
    month: getRecent(countDateByMonth(expiredList)),
    quarter: getRecent(countDateByQuarter(expiredList)),
    year: getRecent(countDateByYear(expiredList)),
  });
};

export const updatePredicted = (registeredList, setter) => {
  const getSum = (obj) => Object.values(obj).reduce((sum, val) => sum + val, 0);
  const getAverage = (obj) => Math.ceil(getSum(obj) / 10);
  setter({
    month: getAverage(countDateByMonth(registeredList)),
    quarter: getAverage(countDateByQuarter(registeredList)),
    year: getAverage(countDateByYear(registeredList)),
  });
};

export const updatePercent = (recentStat, predictedStat, setter) => {
  const getPercent = (recent, predicted) => ((predicted / recent - 1) * 100).toFixed(1);
  setter({
    month: getPercent(recentStat.month, predictedStat.month),
    quarter: getPercent(recentStat.quarter, predictedStat.quarter),
    year: getPercent(recentStat.year, predictedStat.year),
  });
};
