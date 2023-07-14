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

export function setClickLevel(backgroundLevel: number): string {
  switch (backgroundLevel) {
    case 1:
      return `${ThemeStyles.clickLevel} ${ThemeStyles.one}`;
    case 2:
      return `${ThemeStyles.clickLevel} ${ThemeStyles.two}`;
    case 3:
      return `${ThemeStyles.clickLevel} ${ThemeStyles.three}`;
    case 4:
      return `${ThemeStyles.clickLevel} ${ThemeStyles.four}`;
    case 5:
      return `${ThemeStyles.clickLevel} ${ThemeStyles.five}`;
    case 6:
      return `${ThemeStyles.clickLevel} ${ThemeStyles.six}`;
    case 7:
      return `${ThemeStyles.clickLevel} ${ThemeStyles.seven}`;
    default:
      return `${ThemeStyles.clickLevel} ${ThemeStyles.eight}`;
  }
}

export function setHoverLevel(backgroundLevel: number): string {
  switch (backgroundLevel) {
    case 1:
      return `${ThemeStyles.hoverLevel} ${ThemeStyles.one}`;
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

export function setIconFill(fillColor?: number): string {
  switch (fillColor) {
    case 1:
      return ThemeStyles.fillOne;
    case 2:
      return ThemeStyles.fillTwo;
    case 3:
      return ThemeStyles.fillThree;
    case 4:
      return ThemeStyles.fillFour;
    case 5:
      return ThemeStyles.fillFive;
    case 6:
      return ThemeStyles.fillSix;
    case 7:
      return ThemeStyles.fillSeven;
    case 8:
      return ThemeStyles.fillEight;
    case 9:
      return ThemeStyles.fillNine;
    case 10:
      return ThemeStyles.fillTen;
    case 11:
      return ThemeStyles.fillText;
    default:
      return ThemeStyles.fillPrimary;
  }
}
