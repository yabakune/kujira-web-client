import { useSignal } from "@preact/signals-react";

import * as Components from "@/components";

import Styles from "./recurring-purchase.module.scss";
import Snippets from "@/styles/snippets.module.scss";

type Props = {
  status: "Pending" | "Paid" | "Missed";
  description: string;
  cost: string;
  delete: () => void;
};

export const RecurringPurchase = (props: Props) => {
  const description = useSignal(props.description);
  const cost = useSignal(props.cost);
  const descriptionError = useSignal("");
  const costError = useSignal("");

  return (
    <article className={Styles.container}>
      <section className={Styles.header}>
        {props.status === "Pending" ? (
          <Components.Pending width={12} fill={10} />
        ) : props.status === "Paid" ? (
          <Components.Success width={12} fill={10} />
        ) : (
          <Components.Error width={12} fill={10} />
        )}

        <p className={Styles.title}>
          Status : <span className={Styles.status}>{props.status}</span>
        </p>

        <button
          className={Snippets.iconContainer}
          type="button"
          onClick={props.delete}
        >
          <Components.Close width={12} fill={8} hoverFill={11} />
        </button>
      </section>

      <section className={Styles.body}>
        <Components.Input
          key="recurring-purchase-description-input"
          type="text"
          placeholder="Description"
          userInput={description}
          errorMessage={descriptionError}
          icon={<Components.Text width={12} fill={8} />}
          backgroundLevel={1}
        />
        <Components.Input
          key="recurring-purchase-cost-input"
          type="text"
          placeholder="Cost"
          userInput={cost}
          errorMessage={costError}
          icon={<Components.USD width={12} fill={8} />}
          backgroundLevel={1}
        />
      </section>
    </article>
  );
};
