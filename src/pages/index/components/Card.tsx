import styles from "./Card.module.scss"

function Card() {
    const openDialof = () => {
        console.log("함수 호출")
    }

    return (
      <div className={styles.card} onClick={openDialof}> 
        <img src="" alt="" className={styles.card__image}/>
      </div>
    )
}

export default Card