import React from 'react'

function SearchOutput({ searchResults, sentences }) {
  return (
    // <div className="bg-white w-200 p5 rounded-lg shadow-md">
    <div className="flex xs:flex-col sm:flex-row flex-wrap  gap-2">
      {searchResults.length > 0 &&
        searchResults[0].map((item, index) => (
          <div className="p-2 w-96 h-96  border-spacing-2 border-8 border-sky-500/100 rounded-2xl shadow-2xl" key={index}>
            <p>
              <b>Search Rank:</b> {index + 1}
            </p>
            <p>
              <b>Relevance score:</b> {item.score}
            </p>
            <p><b>Chunk:</b>{sentences[item.corpus_id]}</p>
            <p>
              <b>Link to document:</b> { <a href="/path-to-your-pdf/document.pdf" target="_blank" rel="noopener noreferrer">
        View Document
      </a>}
            </p>
          </div>
        ))}
    </div>
  );
}

export default SearchOutput
