import React from "react";
import s from "./loading.module.css";
import loading from '../../images/loading.gif'

export default function Loading() {
  return (
    <div className={s.loading_container}>
     <div className={s.content}>
      <img src={loading} alt="" />
      <p>Loading...</p>
      </div>
    </div>
  );
}