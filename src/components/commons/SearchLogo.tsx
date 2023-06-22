import * as React from "react"
import ENBPolygonLogo from "../../Images/Answer-Head-logo.svg";

const SearchLogo = () =>{
return(
    <div className="polygon-logo mb-10">
              <div className="polygon-centred">
                <img
                  className="mx-auto"
                  src={ENBPolygonLogo}
                  alt="logo"
                  width={358}
                  height={63}
                />
              </div>
            </div>
)
}

export default SearchLogo