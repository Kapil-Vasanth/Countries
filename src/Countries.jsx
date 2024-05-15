import { useEffect, useState } from "react";
function Country({ imgUrl, alt, text }) {
  return (
    <div
      style={{
        border: "1px solid grey",
        borderRadius: "8px",
        padding: "10px",
        width: "150px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "10px",
      }}
      className="countryCard"
    >
      <img
        src={imgUrl}
        alt={alt}
        style={{ width: "100%", height: "100%", margin: "auto" }}
      />
      <h2 style={{ textAlign: "center", marginTop: "10px" }}>{text}</h2>
    </div>
  );
}
export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);
  const [searchInput, setSearchInput] = useState([]);
  const API_URL = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setFilterCountries(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSearch(val){
    const filteredCountry = countries.filter(country => {
        let text = '' + country.name.common
        return text.toLowerCase().search(val.toLowerCase()) > -1
    })
    setFilterCountries(prev => filteredCountry)
    setSearchInput(prev => val)
  }


  return (
    <>
      <div className="inputSearchContainer">
        <input className="inputSearch" type="text" name="q" value={searchInput} onChange={e => handleSearch(e.target.value)} />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent:'center'
        }}
        
      >
        {filterCountries.map((country) => (
              <Country
                key={country.flag.cca3}
                imgUrl={country.flags.png}
                alt={country.flags.alt}
                text={country.name.common}
              />
            ))}
      </div>
    </>
  );
}