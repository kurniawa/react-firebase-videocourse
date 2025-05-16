import React, { useState } from "react";
import EditProfileForListView from "./EditProfileForListView";

export default function TrForListView({ userData }) {
  const [showDetail, setShowDetail] = useState(false);
  
  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };

  return (
    <React.Fragment>
        <tr>
            <td>{userData.fullName}</td>
            <td>{userData.email}</td>
            <td className='flex gap-1'>
            <button onClick={toggleDetail} className={`${showDetail ? "bg-amber-200 " : ""}border border-amber-300 text-amber-400 rounded-xl px-2 py-1 hover:cursor-pointer`}>Detail</button>
            </td>
        </tr>
        <tr className={showDetail ? "" : "hidden"}>
            <td colSpan={4}>
                <EditProfileForListView userData={userData} />
            </td>
        </tr>
    </React.Fragment>
  );
    
}