import React from "react";
import SortRadioGroup from "./sort-by";
import Brands from "./brands";
import Model from "./model";

const Sidebar = () => {
  return (
    <div>
      <SortRadioGroup />
      <Brands />
      <Model />
    </div>
  );
};

export default Sidebar;
