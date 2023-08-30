import { AnimatePresence, m } from "framer-motion";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Types from "@/types";
import { signalsStore } from "@/signals/signals";

import Styles from "./confirmation-modal.module.scss";
import Snippets from "@/styles/snippets.module.scss";

type Props = {
  title: string;
  caption?: string;
  buttonText?: string;
  submit: () => void;
};

const { confirmationModalOpen } = signalsStore;

export const ConfirmationModal = (props: Props) => {
  console.log("Confirmation modal rendered");

  function closeModal(): void {
    confirmationModalOpen.value = false;
  }

  function submit(event: Types.OnSubmit): void {
    event.preventDefault();
    props.submit();
  }

  return (
    <AnimatePresence>
      {confirmationModalOpen.value && (
        <m.main
          className={`${Styles.container} ${Snippets.responsiveSidePadding}`}
          onClick={closeModal}
        >
          <form
            className={Styles.form}
            onClick={Helpers.preventBubbling}
            onSubmit={submit}
          >
            <header className={Styles.header}>
              <section className={Styles.titleContainer}>
                <h1 className={Snippets.titleText}>{props.title}</h1>
                {props.caption && (
                  <p className={Styles.caption}>{props.caption}</p>
                )}
              </section>

              <button
                aria-label="Confirmation Modal Close Button"
                className={Snippets.iconContainer}
                type="button"
                onClick={closeModal}
              >
                <Components.Close width={12} fill={8} hoverFill={11} />
              </button>
            </header>

            <Components.Button
              text={props.buttonText || "Yes, I'm sure"}
              centered
              primary
              submit
            />
          </form>
        </m.main>
      )}
    </AnimatePresence>
  );
};
