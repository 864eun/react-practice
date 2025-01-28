import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { imageData } from "@/recoil/selectors/imageSeletor";
import { pageState } from "@/recoil/atoms/pageState";
import styles from "./CommonFooter.module.scss";
import { searchState } from "@/recoil/atoms/searchState";

function CommonFooter() {
  const imgSelector = useRecoilValueLoadable(imageData);
  const search = useRecoilValue(searchState);
  const [page, setPage] = useRecoilState(pageState);
  const [step, setStep] = useState(0);

  //검색어 바뀔때마다 step(페이지의 그룹)을 0으로 세팅
  useEffect(() => {
    setStep(0);
  }, [search]);

  //전체 페이지 수를 10개씩 나누기
  const newArr: number[] = new Array();
  for (let i = 1; i <= imgSelector.contents.total_pages; i++) {
    newArr.push(i);
  }
  const length = newArr.length;
  const divide =
    Math.floor(length / 10) + (Math.floor(length % 10) > 0 ? 1 : 0);
  const res = [];

  for (let i = 0; i <= divide; i++) {
    res.push(newArr.splice(0, 10));
  }

  // ----------------------------------------------------------------------------------------------------

  const moveToPage = (selected: number) => {
    setPage(selected);
  };
  const moveToPrev = () => {
    if (step === 0) return;
    else {
      setStep(step - 1);
      setPage(res[step - 1][0]);
    }
  };
  const moveToNext = () => {
    const totalPages = Math.ceil(length / 10);
    if (step < totalPages - 1) {
      setStep(step + 1);
      setPage(res[step + 1][0]);
    } else {
      return;
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.pagination}>
        <button className={styles.pagination__button} onClick={moveToPrev}>
          <img src="/assets/icons/icon-arrowLeft.svg" alt="" />
        </button>
        {/* 변경될 UI 부분 */}
        {/* <span>1</span> */}
        {res[step] &&
          res[step].map((item: number, index: number) => (
            <button
              className={
                index === page - 1
                  ? `${styles.pagination__button} ${styles.active}`
                  : `${styles.pagination__button} ${styles.inactive}`
              }
              key={item}
              onClick={() => moveToPage(item)}
            >
              {item}
            </button>
          ))}
        <button className={styles.pagination__button} onClick={moveToNext}>
          <img src="/assets/icons/icon-arrowRight.svg" alt="" />
        </button>
      </div>
    </footer>
  );
}

export default CommonFooter;
