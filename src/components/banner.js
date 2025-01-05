import React, { Component } from 'react';
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaBell, FaGear } from "react-icons/fa6";


export class Banner extends Component {
  render() {
    return (
      <div className="bg-[#EB4A00] py-2 flex justify-between px-2 mb-2">
        <p className="font-bold text-white text-2xl">SafeLine</p>
        <div className='flex items-center gap-2 text-xl text-white'>
        <FaRegQuestionCircle/>
        <FaBell />
        <FaGear />

        </div>

      </div>
    );
  }
}

export default Banner;
