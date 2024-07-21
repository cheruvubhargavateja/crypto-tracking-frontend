import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { fetchData } from "../redux/slices/dataSlice";
import { AppDispatch } from "../redux/store";

interface SelectModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const SelectModal: React.FC<SelectModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [symbol, setSymbol] = useState("bitcoin");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    dispatch(fetchData(symbol));
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2 className="text-lg text-slate-500 text-center">
        Select Stock or Crypto
      </h2>
      <div className="flex items-center justify-center mx-auto">
        <select
          className="outline-none px-4 py-2 border-b border-slate-400"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        >
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="litecoin">Litecoin</option>
        </select>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </Modal>
  );
};

export default SelectModal;
