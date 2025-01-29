import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './CommonNav.module.scss'
import navJson from './nav.json'
import { useRecoilState } from 'recoil'
import { pageState } from '@/recoil/atoms/pageState'
import { searchState } from '@/recoil/atoms/searchState'

interface Navigation {
    index: number
    path: string
    label: string
    searchValue: string
    isActive: boolean
}

function CommonNav() {
    const location = useLocation()
    const [navigation, setNavigation] = useState<Navigation[]>(navJson)
    const [, setPage] = useRecoilState(pageState)
    const [, setSearch] = useRecoilState(searchState)

    useEffect(() => {
        navigation.forEach((nav: Navigation) => {
            nav.isActive = false

            //nav.path과 현재 페이지의 pathname이 같으면 활성화, setSearch,setPage 실행
            if (nav.path === location.pathname || location.pathname.includes(nav.path)) {
                nav.isActive = true
                setSearch(nav.searchValue)
                setPage(1)
            }
        })
        setNavigation([...navigation])
    }, [location.pathname])

    //Navigation을 map하여 nav만들기
    const navLinks = navigation.map((item: Navigation) => {
        return (
            <Link to={item.path} className={item.isActive ? `${styles.navigation__menu} ${styles.active}` : `${styles.navigation__menu} ${styles.inactive}`} key={item.path}>
                <span className={styles.navigation__menu__label}>{item.label}</span>
            </Link>
        )
    })
    return <nav className={styles.navigation}>{navLinks}</nav>
}

export default CommonNav