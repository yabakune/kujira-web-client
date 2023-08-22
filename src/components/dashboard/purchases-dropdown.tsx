import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";

import Styles from "./purchases-dropdown.module.scss";

type Props = {
  header: JSX.Element;
  children: React.ReactNode;
  borderRadius?: number;
  startOpened?: true;
};

export const PurchasesDropdown = (props: Props) => {
  const opened = useSignal(props.startOpened || false);

  function toggleOpened(): void {
    opened.value = !opened.value;
  }

  return (
    <section
      className={`
				${Styles.container}
				${opened.value ? Styles.opened : Styles.closed}
			`}
      style={{ borderRadius: Helpers.setBorderRadius(props.borderRadius) }}
      onClick={toggleOpened}
    >
      {props.header}

      <article
        className={`
				${Styles.purchases}
				${opened.value ? Styles.opened : Styles.closed}
			`}
      >
        {props.children}
      </article>
    </section>
  );
};
