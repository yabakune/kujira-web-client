import { Signal } from "@preact/signals-react";

export type OnboardingPage = {
  page: Signal<number>;
  decrementPage: () => void;
};
