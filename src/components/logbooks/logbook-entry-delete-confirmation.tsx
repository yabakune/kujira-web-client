import { Signal } from "@preact/signals-react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Sagas from "@/sagas";
import * as Types from "@/types";

import Styles from "./logbook-entry-delete-confirmation.module.scss";
import Snippets from "@/styles/snippets.module.scss";

type Props = {
  confirmationOpen: Signal<boolean>;
  entryId: number;
};

export const LogbookEntryDeleteConfirmationModal = (props: Props) => {
  const dispatch = useDispatch();

  function deleteEntry(event: Types.OnSubmit): void {
    event.preventDefault();
    if (Helpers.userId) {
      dispatch(
        Sagas.deleteEntryRequest({
          entryId: props.entryId,
          userId: Helpers.userId,
        })
      );
    }
  }

  function closeModal(): void {
    props.confirmationOpen.value = false;
  }

  return (
    <AnimatePresence>
      {props.confirmationOpen.value && (
        <motion.form
          className={Styles.container}
          onClick={closeModal}
          onSubmit={deleteEntry}
        >
          <section className={Styles.content} onClick={Helpers.preventBubbling}>
            <header className={Styles.header}>
              <section className={Styles.copies}>
                <h1 className={Snippets.titleText}>
                  Are you sure you want to delete this logbook entry?
                </h1>
                <p className={Styles.caption}>
                  Once deleted, it will be gone forever.
                </p>
              </section>
              <button
                aria-label="Logbook Confirmation Modal Close Button"
                className={Snippets.iconContainer}
                type="button"
                onClick={closeModal}
              >
                <Components.Close width={12} fill={8} hoverFill={11} />
              </button>
            </header>

            <Components.Button text="Yes, I'm sure." centered primary submit />
          </section>
        </motion.form>
      )}
    </AnimatePresence>
  );
};
