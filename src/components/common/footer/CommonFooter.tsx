import styles from "./CommonFooter.module.scss"

function CommonFooter() {
  return (
    <footer className={styles.fooer}>
        <div className={styles.pagination}>
            <button className={styles.pagination__button}>
                <img src="src\assets\icons\icon-arrowLeft.svg"></img>
            </button>
            {/*변경될 ui 부분*/}
            <span>1</span>
            <button className={styles.pagination__button}>
                <img src="src\assets\icons\icon-arrowRight.svg"></img>
            </button>
        </div>
    </footer>
  )
}

export default CommonFooter
