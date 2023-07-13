import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Components from "@/components";
import * as Redux from "@/redux";

import Styles from "./notification.module.scss";
import TextStyles from "@/styles/texts.module.scss";

export const Notification = () => {
  const dispatch = useDispatch();
  const { notification } = useSelector((state: Redux.ReduxState) => state.ui);
  const { title, body, caption, status, timeout } = notification;

  useEffect(() => {
    if (body.length > 0) {
      setTimeout(() => {
        dispatch(Redux.uiActions.resetNotification());
      }, timeout);
    }
  }, [dispatch, body, timeout]);

  function setStatusBorder(): string {
    if (status === "success") return Styles.success;
    else if (status === "failure") return Styles.failure;
    else if (status === "pending") return Styles.pending;
    else return Styles.default;
  }

  function exitNotification(): void {
    dispatch(Redux.uiActions.resetNotification());
  }

  return (
    <AnimatePresence>
      {body.length > 0 && (
        <LazyMotion features={domAnimation}>
          <m.section
            className={`${Styles.section} ${setStatusBorder()}`}
            onClick={exitNotification}
            initial={{ opacity: 0, top: "0px" }}
            animate={{ opacity: 1, top: "16px" }}
            exit={{ opacity: 0, top: "-100px" }}
            transition={{ duration: 0.1 }}
          >
            <article className={Styles.texts}>
              {title && <h3 className={TextStyles.titleText}>{title}</h3>}

              <p>{body}</p>

              {caption && <p className={TextStyles.caption}>{caption}</p>}
            </article>

            <Components.Cross width={16} fill={8} hoverFill={11} addHover />
          </m.section>
        </LazyMotion>
      )}
    </AnimatePresence>
  );
};
