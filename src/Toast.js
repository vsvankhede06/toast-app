import React from "react";
import { useState, useRef } from "react";

export default function Toast() {
  const [toasts, setToasts] = useState([]);
  const timeRef = useRef({});
  const handleClose = (id) => {
    clearTimeout(timeRef.current[id]);
    delete timeRef.current[id];
    setToasts((prevToast) => {
      const filterArr = prevToast.filter((toast) => {
        return toast.id != id;
      });
      return filterArr;
    });
  };
  const handleAdd = (message, type) => {
    const id = new Date().getTime();
    const newToasts = [...toasts, { id, message, type }];
    setToasts(newToasts);
    timeRef.current[id] = setTimeout(() => handleClose(id), 5000);
  };
  return (
    <div className="container">
      <div className="toast-container">
        {toasts.map(({ id, message, type }) => {
          return (
            <div key={id} className={`toast ${type}`}>
              {message} <span onClick={() => handleClose(id)}> X</span>
            </div>
          );
        })}
      </div>
      <div className="btn-container">
        <button onClick={() => handleAdd("Success", "success")}>Success</button>
        <button onClick={() => handleAdd("Warning", "warning")}>Warning</button>
        <button onClick={() => handleAdd("Info", "info")}>Info</button>
        <button onClick={() => handleAdd("Error", "error")}>Error</button>
      </div>
    </div>
  );
}
