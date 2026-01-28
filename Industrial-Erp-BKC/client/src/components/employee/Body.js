import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import Calendar from "react-calendar";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BoyIcon from "@mui/icons-material/Boy";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import ReplyIcon from "@mui/icons-material/Reply";
const Body = () => {
  const [value, onChange] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <HomeIcon />
          <h1>Dashboard</h1>
        </div>
        <div className="flex flex-col mr-5 space-y-4 overflow-y-auto">
          <div className="flex space-x-4">
            <div className="flex flex-col space-y-4 w-2/6">
              <div className="bg-white h-[17rem] rounded-xl shadow-lg">
                <Calendar onChange={onChange} value={value} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
