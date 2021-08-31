import React, { useRef } from "react";
import "./style.scss";
export default function Artist({
  artist,
  hangdleId,
  changeOffset,
  offset,
  blur,
}) {
  const artistBoxEl = useRef(null);
  const hangdleNext = () => {
    changeOffset(offset + 20);
  };
  const hangdlePrev = () => {
    if (offset >= 0) {
      changeOffset(offset - 20);
    }
  };

  return (
    <div className="artist">
      <div className="row" ref={artistBoxEl}>
        {artist !== null
          ? artist.map((ok) => (
              <div className="col-lg-4 col-md-6 d-flex">
                <div
                  className="content-artist"
                  onClick={() => {
                    hangdleId(ok.id);
                    setTimeout(() => {
                      blur.classList.add("blur");
                      let track = document.querySelector(".track");
                      track.style.display = "block";
                    }, 500);
                  }}
                >
                  <div className="img">
                    <img src={ok.images[0]?.url} alt="" />
                  </div>
                  <div className="text-artist">
                    <div className="content-text">
                      <div className="name">
                        <h3>{ok.name}</h3>
                      </div>
                      <div className="popularity">
                        popularity: {ok.popularity}
                      </div>
                      <div className="genres">
                        <div className="text">
                          {ok.genres.length !== 0 ? "genres:" : ""}
                        </div>
                        {ok.genres.map((oki) => (
                          <div className="tag"> {oki}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
      {artist !== null ? (
        <div className="pagination">
          <div className="prev" onClick={hangdlePrev}>
            Back
          </div>
          <div className="next" onClick={hangdleNext}>
            Next
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
