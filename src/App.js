import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import Artist from "./App/Artist";
import { AUTH_TOKEN, urlArtist } from "./App/constant";
import InputField from "./App/Input";
import Track from "./App/Track";
// gán token cho axios
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

function App() {
  const [artist, setArtist] = useState();
  const [q, setq] = useState();
  const [offset, setOffset] = useState(0);
  const [topTrack, setTopTrack] = useState(null);
  const blurEl = useRef(null);
  const containerEL = useRef(null);
  useEffect(() => {
    // gọi data artist
    axios({
      method: "get",
      url: urlArtist,
      params: {
        q: q,
        type: "artist",
        offset: offset,
      },
    })
      .then((ok) => {
        setArtist(ok.data.artists.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [q, offset]);
  //lấy id khi bấm vào artist
  const hangdleId = (id) => {
    //gọi data topTrack của các artist
    axios({
      method: "get",
      url: `https://api.spotify.com/v1/artists/${id}/top-tracks`,
      params: {
        market: "us",
      },
    })
      .then((ok) => {
        setTopTrack(ok.data.tracks);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //lấy dữ liệu từ input nhập nào q
  const changeQ = (e) => {
    setq(e);
  };
  const changeOffset = (e) => {
    setOffset(e);
  };
  return (
    <div className="container" ref={containerEL}>
      <div
        ref={blurEl}
        onClick={() => {
          blurEl.current.classList.remove("blur");
          let track = document.querySelector(".track");
          track.style.display = "none";
        }}
      ></div>
      <InputField changeQ={changeQ} q={q} />
      <Artist
        artist={Array.isArray(artist) ? artist : null}
        hangdleId={hangdleId}
        changeOffset={changeOffset}
        offset={offset}
        blur={blurEl.current}
      />
      {topTrack !== null ? <Track tracks={topTrack} /> : ""}
    </div>
  );
}

export default App;
