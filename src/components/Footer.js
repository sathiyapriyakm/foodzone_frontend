import React from "react";
import "./css/footer.css";
import { HeartFill } from "react-bootstrap-icons";

function Footer() {
  return (
    <div>
      <div className="footerDiv">
        Prepared and Delivered with <HeartFill color="white" /> by Food Zone 
      </div>
    </div>
  );
}

export default Footer;
