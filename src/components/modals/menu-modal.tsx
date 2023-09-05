import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import { signalsStore } from "@/signals/signals";

import Styles from "./menu-modal.module.scss";
import Snippets from "@/styles/snippets.module.scss";

const { menuModalOpen } = signalsStore;

type Props = {
  extraOpenConditional?: boolean;
  title: string;
  children: React.ReactNode;
};

export const MenuModal = (props: Props) => {
  function closeModal(): void {
    menuModalOpen.value = false;
  }

  return (
    <AnimatePresence>
      {props.extraOpenConditional && menuModalOpen.value && (
        <LazyMotion features={domAnimation}>
          <m.menu
            className={Styles.container}
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <section
              className={Styles.content}
              onClick={Helpers.preventBubbling}
            >
              <header className={Styles.header}>
                <h1 className={`${Styles.title} ${Snippets.titleText}`}>
                  {props.title}
                </h1>
                <Components.ButtonIcon
                  onClick={() => (menuModalOpen.value = false)}
                >
                  <Components.Close width={14} fill={8} />
                </Components.ButtonIcon>
              </header>

              {props.children}
            </section>
          </m.menu>
        </LazyMotion>
      )}
    </AnimatePresence>
  );
};
