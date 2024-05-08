import { useEffect, useState } from "react"

export default function Countries(){
    const [countries,setCountries] = useState([]);
    const API_URL = 'https://restcountries.com/v3.1/all'

    useEffect(() => {
        fetch(API_URL)
        .then(res => res.json())
        .then(data => setCountries(data))
        .catch(err => console.log(err))
    }, [])


    function Country({imgUrl,alt,text}){
        return (
            <div style={{
                border: "1px solid grey",
                borderRadius: "8px",
                padding: "10px",
                width: "200px",
                display:"flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "10px"
            }}>
                <img src={imgUrl} alt={alt} style={{width:"100%", height: "100%", margin:"auto"}}/>
                <h3 style={{textAlign:"center", marginTop:"10px"}}>{text}</h3>
            </div>
        )
    }


    return (
        <div style={{
            display:"flex",
            flexWrap:"wrap",
            justifyContent:"center",
            gap: "10px"
        }}>
            {countries.map(country => {
                console.log(country.flag)
                return <Country key={country.flag.cca3} imgUrl={country.flags.png} alt={country.flags.alt} text={country.name.common}/>
            })}
        </div>
    )
}