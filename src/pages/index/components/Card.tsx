import { CardDTO } from "../types/card"
import styles from "./Card.module.scss"

interface Props{
    data: CardDTO
    handleDialog:(evnetValue:boolean)=>void
}

function Card({data, handleDialog}:Props) {
    const openDialof = () => {
        console.log("함수 호출")
        handleDialog(true)
    }

    return (
      <div className={styles.card} onClick={openDialof}> 
        <img src={data.urls.small} alt={data.alt_description} className={styles.card__image}/>
      </div>
    )
}

export default Card