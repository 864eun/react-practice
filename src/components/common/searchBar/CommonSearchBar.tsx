import { useState } from "react";
import styles from "./CommionSearchBar.module.scss";
import { useRecoilState } from "recoil";
import { searchState } from "@/recoil/atoms/searchState";

function CommonSearchBar() {
  const [inputData, setInputData] = useState<string>("");
  const [search, setSearch] = useRecoilState(searchState);

  const onChange = (event) => {
    setInputData(event.target.value);
  };

  const onSearch = () => {
    if (inputData === "") setSearch("korea");
    else setSearch(inputData);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ENTER") {
      if (inputData === "") setSearch("korea");
    } else setSearch(inputData);
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBar__search}>
        <input
          type="text"
          placeholder="찾으실 이미지를 검색하세요."
          className={styles.searchBar__search__input}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
        <img src="src\assets\icons\icon-search.svg" onClick={onSearch} />
      </div>
    </div>
  );
}

export default CommonSearchBar;
