import { ReactNode } from "react";
import styles from './Alert.module.css'

export default function ErrorMessage({children}: {children: ReactNode}) {
  return (
    <p className={styles.error}>{children}</p>
  )
}
