import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function Table() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(false);
  const [links, setLinks] = useState("");
  const [imgs, setImgs] = useState("");
  const [years, setYears] = useState("");
  const num=30;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:4000/scrape", { url });
    if(response.status === 200){
      setData(true)
    }
    // setData(response.data);
    // console.log(response)
    // setTitles(response.data.titles);
    setYears(response.data.years);
    setLinks(response.data.links);
    setImgs(response.data.imgs)
  
    
  }

  return (
    <>
      <div>
        {console.log(links)}
        {console.log(imgs)}
        {console.log(years)}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit">Scrape</button>
        </form>
        {/* <pre>{data.years}</pre> */}
        {/* <h1>hi</h1> */}
        {/* <pre>{years}</pre> */}
        <table>
          <thead>
            <tr className="headings">
              <th>Year</th>

              <th>Report title</th>
              <th>Report link</th>
            </tr>
          </thead>
          <tbody className="data">
            {data ? years.map((year,index) => (
               <> {console.log(index)}
              <tr key={index}>
                <td>{year}</td>
                <td>Annual Reports</td>
                <td>{(links[index]==="-" ?<><h3>No Documents Found!</h3> </> : <a href={links[index]}>{(imgs[index]==="No Documents Found!") ?<></> :<img src={imgs[index]} alt="annual report"></img>}</a>)}</td>
              </tr>
              </>
            )) : <></>}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
