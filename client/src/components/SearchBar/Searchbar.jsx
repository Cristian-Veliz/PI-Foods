import styles from "./Searchbar.module.css";




function SearchBar() {
  

  return (
    <form className={styles.container}>
      <input
        
        type="text"
        name="name"
        id="name"
        placeholder="Enter Recipes name..."
       
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
