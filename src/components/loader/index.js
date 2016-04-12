import React from 'react'
import styles from './styles.scss'

export default () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <div className={styles.square}></div>
        <div className={styles.lines}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}
