import Styles from "@/styles/onboarding.module.scss";

export const OnboardingFinal = () => {
  return (
    <section className={Styles.textBody}>
      <p>
        Thank you for taking the time to fill in everything up to this point.
        With that, you’re done with your initial setup! If there is anything you
        want to go back and change, simply click or tap the arrow button
        situated on the top-left corner of this window. Keep in mind that you
        can always make changes later on in your settings page.
      </p>
      <p>
        If you’re ready to proceed, click on the button below to start using
        Kujira!
      </p>
    </section>
  );
};
