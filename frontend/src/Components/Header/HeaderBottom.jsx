import { useState } from "react";
import "./HeaderBortoom.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateRecordModal from "../../Pages/UserSide/Modals/CreateRecordModal/CreateRecordModal";

function HeaderBottom({ openModal }) {
  const [recordModal, setRecordModal] = useState(false);
  const closeRecordModal = () => setRecordModal(false);
  // const loggedInUser = useSelector((state) => state.loggedInUser.loggedInUser);

  return (
    <>
      <div className="Header_Bottom">
        <div className="headerBottomInner">
          {/* {loggedInUser.roles?.some(
            (itm) => itm.role_id === 5 || itm.role_id === 1
          ) ? ( */}
        {/*  <div className="headerBottomRgt">
            <div
              className="btn bg-[#eaeaea] text-black font-semibold py-3 px-4 rounded-md hover:bg-[#123e53] m-1" // Adjusted margin
              onClick={openModal}
            >
              Design BMR
            </div>
          </div>

          {/* ) : null} */}
        </div>
      </div>
    </>
  );
}

export default HeaderBottom;
