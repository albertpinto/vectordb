import React, { useState, useEffect } from "react";
import Spinner from "./shared/Spinner";
import SearchOutput from "./SearchOutput";
import axios from "axios";

const Search = () => {
  // State variables
  const [inputText, setInputText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [searchResults, setSearchResults] = useState([]);
  const [sentences, setSentences] = useState([]);
  const [output, setOutput] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setSubmitted(false);
    console.log(e.target.value);
  };

  // Handle form submission
  const handleSubmit = () => {
    setSubmitted(true);
  };

  // Clean output data
  const cleanData = () => {
    setOutput("");
  };

  // Fetch data on form submission
  useEffect(() => {
    if (submitted) {
      fetchData();
    }
  }, [submitted, inputText]);

  // Fetch data asynchronously
  const fetchData = async () => {
    setIsLoading(true); // Set loading state to true before the request

    try {
      const url = `${process.env.REACT_APP_URL}/${process.env.REACT_APP_SEARCH_END_POINT}?query=${inputText}`;
      console.log(url);
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Replace '*' with the actual allowed origin(s) on your server
        },
      });
      //const response = await axios.get(url);
      const data = response.data;

      setSearchResults(data[0]);
      setSentences(data[1]);
      setOutput(data[0]);

      setIsLoading(false); // Set loading state to false after a successful request
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); // Set loading state to false on error
    }
  };

  return (
    <>
      <div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="query"
          >
            Search
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="query"
            name="query"
            type="text"
            placeholder="Your search string"
            value={inputText}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center justify-start">
          <button
            className="px-4 py-1 bg-sky-500/100 shadow-lg shadow-sky-500/100 rounded-full"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="mt-4">
        {isLoading ? (
          <Spinner />
        ) : (
          submitted && (
            <SearchOutput searchResults={searchResults} sentences={sentences} />
          )
        )}
      </div>
    </>
  );
};

export default Search;
