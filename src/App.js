import React from "react";
import "./index.scss";
import Collections from "./Collections";
import { Oval } from "react-loader-spinner";

function App() {
  const [collections, setCollections] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [indexOfTag, setIndexOfTag] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const pages = [{ id: 1 }, { id: 2 }, { id: 3 }];

  const onClickCurrentPage = (number) => {
    setCurrentPage(number);
  };
  const setActiveClass = (number) => {
    setIndexOfTag(number);
  };
  const onChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };
  React.useEffect(() => {
    fetch(
      `https://62fe88b5a85c52ee48396da0.mockapi.io/photos?${
        indexOfTag ? `category=${indexOfTag}` : ""
      }&page=${currentPage + 1}&limit=3`
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setCollections(json);
      })
      .catch((e) => alert(e))
      .finally(setIsLoading(false));
  }, [indexOfTag, currentPage]);
  React.useEffect(() => {
    fetch(`https://62fe88b5a85c52ee48396da0.mockapi.io/categories`)
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch((e) => alert(e));
  }, []);
  console.log(isLoading);
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {tags.map((obj, index) => (
            <li
              onClick={() => setActiveClass(index)}
              className={indexOfTag === index ? "active" : ""}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          className="search-input"
          placeholder="Поиск по названию"
          value={searchValue}
          onChange={onChangeSearch}
        />
      </div>
      <div className="content">
        {isLoading ? (
          <Oval color="#00BFFF" height={80} width={80} />
        ) : (
          collections
            .filter((obj) =>
              obj.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((obj, index) => (
              <Collections key={index} name={obj.name} images={obj.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {pages.map((page, index) => (
          <li
            onClick={() => onClickCurrentPage(index)}
            className={index === currentPage ? "active" : ""}
          >
            {page.id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
