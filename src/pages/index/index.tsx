import {imageData} from '@/recoil/selectors/imageSeletor'
import { useState } from 'react'
import { CardDTO } from './types/card'
import { useRecoilValue } from 'recoil'

import styles from './styles/index.module.scss'

import CommonHeader from '@/components/common/header/CommonHeader'
import CommonNav from '@/components/common/navigation/CommonNav'
import CommonSearchBar from '@/components/common/searchBar/CommonSearchBar'
import CommonFooter from '@/components/common/footer/CommonFooter'
import DetailDialog from '@/components/common/dialog/DetailDialog'
import Card from './components/Card'


function index() {
    const imageSelector = useRecoilValue(imageData)
    const [imgData, setimgData] = useState<CardDTO[]>([])
    const [open, setOpen] = useState<boolean>(false)

    const cardList = imageSelector.data.results.map((card:CardDTO)=>{
        return (
            <Card data={card} key={card.id} handleDialog={setOpen}/>
        )}
    )


  return (
    <div className={styles.page}>
        {/*공통 헤더 ui 부분*/}
        <CommonHeader />
        {/*공동 네비게이션 ui 부분*/}
        <CommonNav />
        <div className={styles.page__contents}>
            <div className={styles.page__contents__introBox}>
                <div className={styles.wrapper}>
                    <span className={styles.wrapper__title}>PhotoSplash</span>
                    <span className={styles.wrapper__desc}>
                        인터넷의 시각 자료 출처입니다<br/>
                        모든 지역에 있는 크리에디터들의 지원을 받습니다
                    </span>
                    {/*검색창 ui 부분*/}
                    <CommonSearchBar />
                </div>
            </div>
            <div className={styles.page__contents__imageBox}>{cardList}
            </div>
        </div>
        {/* 공통 푸터 ui 부분*/}
        <CommonFooter />
        {open &&<DetailDialog />}
    </div>
  )
}

export default index
