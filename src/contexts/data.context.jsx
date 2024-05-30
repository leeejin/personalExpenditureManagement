import { createContext, useContext, useState } from "react";
const initialState = {
  changeMonth: () => {},
  addRecord: () => {},
  modifyRecord: () => {},
  deleteRecord: () => {},
};

export const RecordContext = createContext(initialState); //데이터관리

export const useRecord = () => useContext(RecordContext);

export function RecordProvider({ children }) {
  const data = JSON.parse(localStorage.getItem("data")) || [];
  const [recordOptions, setRecordOptions] = useState(data);
  const [selectedMonth, setSelectedMonth] = useState("01");

  const value = {
    recordOptions,
    selectedMonth,
    changeMonth: (month) => {
      setSelectedMonth(month);
      const filteredDatas = data.filter(
        (data) => data.date.slice(5, 7) == month
      );
      setRecordOptions(filteredDatas);
    },
    addRecord: (data) => {
      setRecordOptions((prev) => [...prev, data]);
      setSelectedMonth(`${data.date.slice(5, 7)}`);
      const newData = [...recordOptions, data];
      localStorage.setItem("data", JSON.stringify(newData));
    },
    modifyRecord: (recordId, formData) => {
      const modifiedData = recordOptions.map((data) => {
        if (data.id === recordId) return { ...data, ...formData };
        return data;
      }, recordOptions);
      setRecordOptions(modifiedData);
      localStorage.setItem("data", JSON.stringify(modifiedData));
    },
    deleteRecord: (recordId) => {
      console.log("실행됨");
      const deleteData = recordOptions.filter((data) => data.id !== recordId);
      setRecordOptions(deleteData);
      localStorage.setItem("data", JSON.stringify(deleteData));
    },
  };
  return (
    <RecordContext.Provider value={value}>{children}</RecordContext.Provider>
  );
}
