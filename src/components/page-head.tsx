import Head from "next/head";

type Props = {
  title: string;
  description?: string;
};

export const PageHead = (props: Props) => {
  return (
    <Head>
      <title>Kujira | {props.title}</title>
      <meta
        name="description"
        content={props.description || "Your spending habits made clear."}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
