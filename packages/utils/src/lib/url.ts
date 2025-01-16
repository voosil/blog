/**
 * URL 路径匹配
 * @param pagePath 当前页面路径
 * @param patternPath 匹配路径
 * @returns
 */ export function isPathMatch(
  pagePath: string,
  patternPath: string,
): boolean {
  // 移除路径两端的斜杠并分割成数组
  const pathToSegments = (path: string) =>
    path.replace(/^\//, '').replace(/\/*$/, '').split('/');

  const baseSegments = pathToSegments(patternPath);
  const comparisonSegments = pathToSegments(pagePath);

  if (baseSegments.length > comparisonSegments.length) {
    return false;
  }

  for (let i = 0; i < baseSegments.length; i++) {
    if (baseSegments[i] !== comparisonSegments[i]) {
      return false;
    }
  }

  return true;
}
