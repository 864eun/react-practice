import {imageData} from '@/recoil/selectors/imageSeletor'
import { useState, useMemo } from 'react'
import { CardDTO } from './types/card'
import { useRecoilValueLoadable } from 'recoil'

import styles from './styles/index.module.scss'

import CommonHeader from '@/components/common/header/CommonHeader'
import CommonNav from '@/components/common/navigation/CommonNav'
import CommonSearchBar from '@/components/common/searchBar/CommonSearchBar'
import CommonFooter from '@/components/common/footer/CommonFooter'
import DetailDialog from '@/components/common/dialog/DetailDialog'
import Loading from './components/Loading'
import Card from './components/Card'


function index() {
    const imgSelector = useRecoilValueLoadable(imageData)
    const [imgData, setImgData] = useState<CardDTO>()
    const [open, setOpen] = useState<boolean>(false) 
    
    //imgSelector(API 데이터)를 카드에 바인딩
    const CARD_LIST = useMemo(() => {
        console.log(imgSelector)
        if (imgSelector !== null && imgSelector.state === 'hasValue') {
            const result = imgSelector.contents.results.map((card: CardDTO) => {
                return <Card data={card} key={card.id} handleDialog={setOpen} handleSetData={setImgData} />
            })
            return result
        } else {
            return <Loading/>
        }
    }, [imgSelector])

  return (
    <div className={styles.page}>
        {/*공통 헤더 */}
        <CommonHeader />
        {/*공동 네비게이션 */}
        <CommonNav />
        <div className={styles.page__contents}>
            <div className={styles.page__contents__introBox}>
                <div className={styles.wrapper}>
                    <span className={styles.wrapper__title}>PhotoSplash</span>
                    <span className={styles.wrapper__desc}>
                        인터넷의 시각 자료 출처입니다<br/>
                        모든 지역에 있는 크리에디터들의 지원을 받습니다
                    </span>
                    {/*검색창 */}
                    <CommonSearchBar />
                </div>
            </div>
            <div className={styles.page__contents__imageBox}>{CARD_LIST}
            </div>
        </div>
        {/* 공통 푸터 */}
        <CommonFooter />
        {open && <DetailDialog data={imgData} handleDialog={setOpen} />}
    </div>
  )
}

export default index
