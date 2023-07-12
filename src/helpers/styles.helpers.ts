import ThemeStyles from "@/styles/themes.module.scss";

export function setBorderRadius(borderRadius?: number): string {
  return borderRadius ? `${borderRadius}px` : "12px";
}

export function setBackgroundLevel(
  backgroundLevel: number,
  selected?: boolean
): string {
  switch (backgroundLevel) {
    case 2:
      return `${ThemeStyles.backgroundLevel} ${
        selected ? ThemeStyles.three : ThemeStyles.two
      }`;
    case 3:
      return `${ThemeStyles.backgroundLevel} ${
        selected ? ThemeStyles.four : ThemeStyles.three
      }`;
    case 4:
      return `${ThemeStyles.backgroundLevel} ${
        selected ? ThemeStyles.five : ThemeStyles.four
      }`;
    case 5:
      return `${ThemeStyles.backgroundLevel} ${
        selected ? ThemeStyles.six : ThemeStyles.five
      }`;
    case 6:
      return `${ThemeStyles.backgroundLevel} ${
        selected ? ThemeStyles.seven : ThemeStyles.six
      }`;
    case 7:
      return `${ThemeStyles.backgroundLevel} ${
        selected ? ThemeStyles.eight : ThemeStyles.seven
      }`;
    case 8:
      return `${ThemeStyles.backgroundLevel} ${
        selected ? ThemeStyles.nine : ThemeStyles.eight
      }`;
    case 9:
      return `${ThemeStyles.backgroundLevel} ${
        selected ? ThemeStyles.ten : ThemeStyles.nine
      }`;
    case 10:
      return `${ThemeStyles.backgroundLevel} ${ThemeStyles.ten}`;
    default:
      return `${ThemeStyles.backgroundLevel} ${
        selected ? ThemeStyles.two : ThemeStyles.one
      }`;
  }
}

export function setActiveLevel(backgroundLevel: number): string {
  switch (backgroundLevel) {
    case 2:
      return `${ThemeStyles.activeLevel} ${ThemeStyles.two}`;
    case 3:
      return `${ThemeStyles.activeLevel} ${ThemeStyles.three}`;
    case 4:
      return `${ThemeStyles.activeLevel} ${ThemeStyles.four}`;
    case 5:
      return `${ThemeStyles.activeLevel} ${ThemeStyles.five}`;
    case 6:
      return `${ThemeStyles.activeLevel} ${ThemeStyles.six}`;
    case 7:
      return `${ThemeStyles.activeLevel} ${ThemeStyles.seven}`;
    default:
      return `${ThemeStyles.activeLevel} ${ThemeStyles.eight}`;
  }
}

export function setHoverLevel(backgroundLevel: number): string {
  switch (backgroundLevel) {
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
