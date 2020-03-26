import React, { useEffect, useLayoutEffect } from "react";
import { Toast, WingBlank, WhiteSpace } from "antd-mobile";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface ILoadingProps extends RouteComponentProps {}

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

export default withRouter(Loading);
