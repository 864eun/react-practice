import { useEffect, useState } from 'react'
import { CardDTO, Tag } from '@/pages/index/types/card'
import styles from './DetailDialog.module.scss'
import toast, { toastConfig } from 'react-simple-toasts'
import 'react-simple-toasts/dist/theme/dark.css'

toastConfig({ 
    theme: 'dark',
    position: 'bottom-center'
 })

interface Props {
    data: CardDTO
    handleDialog: (eventValue: boolean) => void
}

function DetailDialog({ data, handleDialog }: Props) {
    const [bookmark, setBookmark] = useState(false)
    // 다이얼로그 끄기
    const closeDialog = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        handleDialog(false)
        event.stopPropagation()
    }
    // 북마크 추가 이벤트
    const addBookmark = (selected: CardDTO) => {
        setBookmark(true)

        const getLocalStorage = JSON.parse(localStorage.getItem('bookmark'))
        // 1. 로컬스토리지에 bookmark이라는 데이터가 없을 경우
        if (!getLocalStorage || getLocalStorage === null) {
            localStorage.setItem('bookmark', JSON.stringify([selected]))
            toast('해당 이미지를 북마크에 저장하였습니다.')
        } else {
            // 2. 해당 이미지가 이미 로컬스토리지 bookmark라는 데이터에 저장되어 있을 경우
            if (getLocalStorage.findIndex((item: CardDTO) => item.id === selected.id) > -1) {
                toast('해당 이미지는 이미 북마크에 추가된 상태입니다.')
            } else {
                // 3. 해당 이미지가 로컬스토리지 bookmark라는 데이터에 저장되어 있지 않을 경우 + bookmark라는 데이터에 이미 어떤 값이 담겨 있는 경우
                const res = [...getLocalStorage]
                res.push(selected)
                localStorage.setItem('bookmark', JSON.stringify(res))

                toast('해당 이미지를 북마크에 저장하였습니다.')
            }
        }
    }


    return (
        <div className={styles.container} >
            <div className={styles.container__dialog}>
                <div className={styles.container__dialog__header}>
                    <div className={styles.close}>
                        <button className={styles.close__button} onClick={closeDialog}>
                            {/* 구글 아이콘을 사용 */}
                            <span className="material-symbols-outlined" style={{ fontSize: 28 + 'px' }}>
                                close
                            </span>
                        </button>
                        <img src={data.user.profile_image.small} alt="사진작가 프로필 사진" className={styles.close__authorImage} />
                        <span className={styles.close__authorName}>{data.user.name}</span>
                    </div>
                    <div className={styles.bookmark}>
                        <button className={styles.bookmark__button} onClick={() => addBookmark(data)}>
                            {/* 구글 아이콘을 사용 */}
                            {bookmark === false ? (
                                <span className="material-symbols-outlined" style={{ fontSize: 16 + 'px' }}>
                                    favorite
                                </span>
                            ) : (
                                <span className="material-symbols-outlined" style={{ fontSize: 16 + 'px', color: 'red' }}>
                                    favorite
                                </span>
                            )}
                            북마크
                        </button>
                        <button className={styles.bookmark__button}>다운로드</button>
                    </div>
                </div>
                <div className={styles.container__dialog__body}>
                    <img src={data.urls.small} alt="상세이미지" className={styles.image} />
                </div>
                <div className={styles.container__dialog__footer}>
                    <div className={styles.infoBox}>
                        <div className={styles.infoBox__item}>
                            <span className={styles.infoBox__item__label}>이미지 크기</span>
                            <span className={styles.infoBox__item__value}>
                                {data.width} X {data.height}
                            </span>
                        </div>
                        <div className={styles.infoBox__item}>
                            <span className={styles.infoBox__item__label}>업로드</span>
                            <span className={styles.infoBox__item__value}>{data.created_at.split('T')[0]}</span>
                        </div>
                        <div className={styles.infoBox__item}>
                            <span className={styles.infoBox__item__label}>마지막 업데이트</span>
                            <span className={styles.infoBox__item__value}>{data.updated_at.split('T')[0]}</span>
                        </div>
                        <div className={styles.infoBox__item}>
                            <span className={styles.infoBox__item__label}>다운로드</span>
                            <span className={styles.infoBox__item__value}>{data.likes}</span>
                        </div>
                    </div>
                    <div className={styles.tagBox}>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailDialog