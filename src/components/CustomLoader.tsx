import React from 'react';
import { Bars } from 'react-loader-spinner';

const CustomLoader = (props: any) => {
  return (
    <div style={{position: "absolute", top: "50%", left: props.left}}>
      <Bars height={100} width={100} color="#00BFFF" visible={props.visible} />
    </div>
  );
};

export default CustomLoader;
