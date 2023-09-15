import React, { useState, useEffect } from "react";
import Spinner from "./shared/Spinner";
import SearchOutput from "./SearchOutput";
import axios from "axios";

const Search = () => {
  // State variables
  const [inputText, setInputText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [sentences, setSentences] = useState([]);

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

  // Fetch data on form submission or input change
  useEffect(() => {
    if (submitted) {
      fetchData();
    }
  }, [submitted, inputText, output, isLoading]);

  // Fetch data asynchronously
  const fetchData = async () => {
    try {
      // Make a GET request to your REST endpoint
      const url = `${process.env.REACT_APP_URL}/${process.env.REACT_APP_TASK}?query=${inputText}`;
      console.log(url);
      const response = await axios.get(url);
      const data = await response.data;

      // Assuming the response contains the data you want to set in the state
      setOutput(response.data);
      setSearchResults(data[0]);
      setSentences(data[1]);
      setOutput(data[0]);

      // Set loading state to false
      setIsLoading(false);
    } catch (error) {
      // Handle errors here, e.g., show an error message
      console.error("Error fetching data:", error);

      // Set loading state to false on error
      setIsLoading(false);
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
        {/* <SearchOutput searchResults={searchResults} sentences={sentences} /> */}
        {submitted && output === "" ? (
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
