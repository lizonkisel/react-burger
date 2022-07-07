import React from "react";

import styles from './not-found-page.module.css';

export default function Page404() {
  return (
    <>
      <main className={styles.main}>
        <h1 className={`text text_type_main-large ${styles.title}`}>Оууу, страница не найдена. Попробуйте вернуться назад<span>&#127776;</span></h1>
        <a className={styles.rights_link} href="https://ru.freepik.com/photos/background">Background фото создан(а) kjpargeter - ru.freepik.com</a>
      </main>
    </>
  )
}
