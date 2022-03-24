import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { Buffer } from "buffer";
import { create } from "ipfs-http-client";

const client = create(process.env.REACT_APP_INFURA_IPFS_ENDPOINT);

function App() {
  const [file, setFile] = useState(null);
  const [urlArr, setUrlArr] = useState([]);

  console.log(process.env.REACT_APP_INFURA_IPFS_ENDPOINT);
  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(Buffer(reader.result));
    };

    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const created = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${created.path}`;
      setUrlArr((prev) => [...prev, url]);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="App">
      <div className="main">
        <form className="form" onSubmit={handleSubmit}>
          <input type="file" name="data" onChange={retrieveFile} />
          <button type="submit" className="btn">
            Upload file
          </button>
        </form>
      </div>

      <div className="display">
        {urlArr.length !== 0 ? urlArr.map((el) => <img src={el} alt="nfts" />) : <h3>Upload data</h3>}
      </div>
    </div>
  );
}

export default App;
