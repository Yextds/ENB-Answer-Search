import * as React from "react";
import ENBRoundLogo from "../../Images/ENB-round-logo.svg";

const HeaderLogo = () =>{
    return(
        <>
          <div className="Round-logo">
            <div className="centred-logo">
                <a href="https://www.epnb.com/">
                <img className="mx-auto" src={ENBRoundLogo} alt="logo" width={196} height={96}/>
                </a>
              </div>
            </div>
        </>
    )
}

export default HeaderLogo