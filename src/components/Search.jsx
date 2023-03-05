import { useEffect, useState } from "react"
import OpenWeather from '../apis/OpenWeather'
import { useGlobalContext } from "../context/context"

const Search = () => {

    const [searchTerm, setSearchTerm] = useState("")
    const [placeSuggestions, setPlaceSuggestions] = useState([{ name: "Place 1" }, { name: "Place 2" }, { name: "Place 3" }])
    const { setPlace } = useGlobalContext()

    const renderDropdown = () => {
        return (
            <ul className="dropdown-box">
                {placeSuggestions.map((suggestion, index) => {
                    return (
                        <li key={index} onClick={() => {
                            setPlace(suggestion)
                            setSearchTerm("")}}>{suggestion.name}, {suggestion.country}</li>
                    )
                })}
            </ul>
        )
    }

    useEffect(() => {
        let isMounted = true
        const getSuggestions = async () => {
            try {
                const response = await OpenWeather.get("/geo/1.0/direct", {
                    params: {
                        q: searchTerm,
                        limit: 5
                    }
                })
                setPlaceSuggestions(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        if (searchTerm.length > 0) {
            getSuggestions()
        } else {
            setSearchTerm("")
        }

        return () => (isMounted = false)
    }, [searchTerm])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <div className="search-bar">
            <input type="text" value={searchTerm} id="search-bar-input" placeholder="search..." onChange={e => handleSearch(e)} />
            {searchTerm && renderDropdown()}
        </div>
    )
}
export default Search