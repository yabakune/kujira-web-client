import Styles from "./notification.module.scss";
import TextStyles from "@/styles/texts.module.scss";

import * as Components from "@/components";
import * as Redux from "@/redux";

export const Notification = (props: Redux.Notification) => {
  function setStatusBorder() {
    switch (props.status) {
      case "success":
        return Styles.success;
      case "failure":
        return Styles.failure;
      case "pending":
        return Styles.pending;
      default:
        return Styles.default;
    }
  }

  return (
    <section
      className={`
			${Styles.section}
			${setStatusBorder()}
		`}
    >
      <article className={Styles.texts}>
        {props.title && <h3 className={TextStyles.titleText}>{props.title}</h3>}

        <p>{props.body}</p>

        {props.caption && <p className={TextStyles.caption}>{props.caption}</p>}
      </article>

      <Components.Cross width={16} fill={8} hoverFill={11} addHover />
    </section>
  );
};
