"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchData } from "@/redux/slices/dataSlice";
import DataTable from "@/components/DataTable";
import SelectModal from "@/components/SelectModel";

const IndexPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.data.data);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchData("bitcoin"));
    const interval = setInterval(() => {
      dispatch(fetchData("bitcoin"));
    }, 1000 * 60 + 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-center text-2xl font-semibold my-10">
        Crypto/Stock Tracker
      </h1>
      <div className="text-center">
        <button
          className="text-xl text-center bg-slate-500 text-white px-4 py-2 mb-20 rounded-sm"
          onClick={() => setModalIsOpen(true)}
        >
          Change Stock
        </button>
      </div>
      <DataTable data={data} />
      <SelectModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </div>
  );
};

export default IndexPage;
