/**
 * 获取当前是星期几, 0-6, 其中0为周一，6为周日
 * @param date
 * @returns
 */
export function getWeekDayIndex(date = new Date()) {
  // 获取当前是星期几, getDay() 返回0-6, 其中0为周日
  let dayIndex = date.getDay();

  // 如果是周日(0), 我们把它映射到数组的最后一位(6)
  if (dayIndex === 0) {
    dayIndex = 6;
  } else {
    // 否则我们将索引减1，使周一对应索引0
    dayIndex -= 1;
  }

  return dayIndex;
}

export function getStartOfDay(date = new Date()) {
  // 设置时间为当天零点
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function toOptions<S = string>(arr: S[]) {
  return arr.map((v) => ({ label: v, value: v }));
}
