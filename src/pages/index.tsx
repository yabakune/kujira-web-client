import Head from "next/head";
import { Mulish } from "next/font/google";
import styles from "@/styles/home.module.scss";

const mulish = Mulish({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Kujira</title>
        <meta name="description" content="Your spending habits made clear." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} ${mulish.className}`}></main>
    </>
  );
}
