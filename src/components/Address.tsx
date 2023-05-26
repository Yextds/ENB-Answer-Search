import * as React from "react";

const Address = (props: any) => {
    const { address } = props;
  return (
    <>
      <div>
        
            <div>{address.line1}</div>
            {address.line2 && (<div>{address.line2}</div>)}
            <div>{address.city}, {address.region} {address.postalCode}</div>
          
      </div>
    </>
  );
};

export default Address;
