import { Fragment } from "react";

import MainNavigation from "./MainNavigation";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main style={{ minHeight: "82vh", marginTop: "65px" }}>{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
