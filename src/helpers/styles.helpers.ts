import ThemeStyles from "@/styles/themes.module.scss";

export function setBorderRadius(borderRadius?: number): string {
  return borderRadius ? `${borderRadius}px` : "12px";
}

export function setBackgroundLevel(level: number): string {
  switch (level) {
    case 2:
      return `${ThemeStyles.backgroundLevel} ${ThemeStyles.two}`;
    case 3:
      return `${ThemeStyles.backgroundLevel} ${ThemeStyles.three}`;
    case 4:
      return `${ThemeStyles.backgroundLevel} ${ThemeStyles.four}`;
    case 5:
      return `${ThemeStyles.backgroundLevel} ${ThemeStyles.five}`;
    case 6:
      return `${ThemeStyles.backgroundLevel} ${ThemeStyles.six}`;
    case 7:
      return `${ThemeStyles.backgroundLevel} ${ThemeStyles.seven}`;
    case 8:
      return `${ThemeStyles.backgroundLevel} ${ThemeStyles.eight}`;
    case 9:
      return `${ThemeStyles.backgroundLevel} ${ThemeStyles.nine}`;
    case 10:
      return `${ThemeStyles.backgroundLevel} ${ThemeStyles.ten}`;
    default:
      return `${ThemeStyles.backgroundLevel} ${ThemeStyles.one}`;
  }
}

export function setHoverLevel(level: number): string {
  switch (level) {
    case 2:
      return `${ThemeStyles.hoverLevel} ${ThemeStyles.two}`;
    case 3:
      return `${ThemeStyles.hoverLevel} ${ThemeStyles.three}`;
    case 4:
      return `${ThemeStyles.hoverLevel} ${ThemeStyles.four}`;
    case 5:
      return `${ThemeStyles.hoverLevel} ${ThemeStyles.five}`;
    case 6:
      return `${ThemeStyles.hoverLevel} ${ThemeStyles.six}`;
    default:
      return `${ThemeStyles.hoverLevel} ${ThemeStyles.seven}`;
  }
}
