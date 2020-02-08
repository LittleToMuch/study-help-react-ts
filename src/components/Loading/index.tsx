import React, { useEffect, useLayoutEffect } from "react";
import { Toast, WingBlank, WhiteSpace } from "antd-mobile";

interface ILoadingProps {}

const Loading: React.FunctionComponent<ILoadingProps> = () => {
  useLayoutEffect(() => {
    Toast.loading("Loading...", 10)
    return () => Toast.hide()
  }, []);
  return (
    <WingBlank>
      <WhiteSpace />
      <WhiteSpace />
    </WingBlank>
  );
};

export default Loading;
