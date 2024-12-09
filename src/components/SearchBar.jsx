import PropTypes from "prop-types";

const SearchBar = ({ city, setCity, handleSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Введите город"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Поиск</button>
    </div>
  );
};

SearchBar.propTypes = {
  city: PropTypes.string.isRequired,
  setCity: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};
export default SearchBar;
