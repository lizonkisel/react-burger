import React from "react";

import styles from './not-found-page.module.css';

import cosmoImage from '../images/page-404.webp';

export default function Page404() {

  return (
    <main className={styles.main}>
      <h1 className={`text text_type_main-large ${styles.title}`}>Оууу, страница не найдена. Попробуйте вернуться назад<span>&#127776;</span></h1>
      {/* <img className={styles.cover_image} src={cosmoImage} alt="cosmo page-404" /> */}
    </main>
  )
}
