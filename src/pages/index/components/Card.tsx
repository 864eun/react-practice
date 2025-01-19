import { CardDTO } from "../types/card"
import styles from "./Card.module.scss"

interface Props{
    data: CardDTO
}

function Card({data}:Props) {
    const openDialof = () => {
        console.log("함수 호출")
    }

    return (
      <div className={styles.card} onClick={openDialof}> 
        <img src={data.urls.small} alt={data.alt_description} className={styles.card__image}/>
      </div>
    )
}

export default Card