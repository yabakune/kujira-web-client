import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Redux from "@/redux";

import Styles from "./notification.module.scss";
import Snippets from "@/styles/snippets.module.scss";

export const Notification = () => {
  const dispatch = useDispatch();
  const { notification } = useSelector((state: Redux.ReduxStore) => state.ui);
  const { title, body, caption, status, timeout } = notification;

  function setStatusBorder(): string {
    if (status === "success") return Styles.success;
    else if (status === "failure") return Styles.failure;
    else if (status === "pending") return Styles.pending;
    else return Styles.default;
  }

  function closeNotification(): void {
    dispatch(Redux.uiActions.resetNotification());
  }

  useEffect(() => {
    if (body.length > 0) {
      setTimeout(() => {
        dispatch(Redux.uiActions.resetNotification());
      }, timeout);
    }
  }, [dispatch, body, timeout]);

  return (
    <AnimatePresence>
      {body.length > 0 && (
        <LazyMotion features={domAnimation}>
          <m.section
            className={`${Styles.section} ${setStatusBorder()}`}
            onClick={closeNotification}
            initial={{ opacity: 0, top: "0px" }}
            animate={{ opacity: 1, top: "16px" }}
            exit={{ opacity: 0, top: "-100px" }}
            transition={{ duration: 0.1 }}
          >
            <article className={Styles.texts}>
              {title && <h3 className={Snippets.titleText}>{title}</h3>}

              <p>{body}</p>

              {caption && <p className={Snippets.captionEmphasis}>{caption}</p>}
            </article>
          </m.section>
        </LazyMotion>
      )}
    </AnimatePresence>
  );
};
