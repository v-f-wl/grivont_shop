'use client'
import { useState, useEffect } from "react";
import BagList from "./BagList";
import Loading from "../UI/Loading";
import EmptyPage from "../UI/EmptyPage";
import Title from "../UI/Title";

const BagContainer = () => {
  return ( 
    <div className="mt-[120px] text-gray-100">
      <Title title="Корзина"/>
      <div className="mt-8 mb-4">
        <BagList/>
      </div>
    </div>
  );
}
 
export default BagContainer;