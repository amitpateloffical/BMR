import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../../config.json";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AtmButton from "../../../../AtmComponents/AtmButton";
import { toast } from "react-toastify";
import UserVerificationPopUp from "../../../../Components/UserVerificationPopUp/UserVerificationPopUp";
import { useDispatch, useSelector } from "react-redux";
import { addTab } from "../../../../bmrTabsSlice";
import { IoIosAddCircle, IoIosTrash } from "react-icons/io";
import { Tooltip } from "@mui/material";

const BMRRecordsDetails = () => {
  const dispatch = useDispatch();
  const bmrTabs = useSelector((state) => state.bmrTabs.tabs);
  const [activeTabSections, setActiveTabSections] = useState([]);

  console.log(bmrTabs, "<><><>");
  const userDetails = JSON.parse(localStorage.getItem("user-details"));
  const location = useLocation();
  const [recordData, setRecordData] = useState(location?.state?.original || {});
  const [tabs, setTabs] = useState([
    "Initiator Remarks",
    "Reviewer Remarks",
    "Approver Remarks",
  ]);

  const allTabs = [...tabs, ...bmrTabs.flat()];
  const [flowoTabs, setFlowoTabs] = useState([
    "INITIATION",
    "UNDER REVIEW",
    "UNDER APPROVAL",
    "APPROVED",
  ]);
  const [fields, setFields] = useState({
    "Initiator Remarks": [
      {
        fieldName: "Initiator Name",
        field_type: "text",
        options: [],
        isMandatory: false,
      },
      {
        fieldName: "Date of Initiation",
        field_type: "date",
        options: [],
        isMandatory: false,
      },
      {
        fieldName: "Initiator Comments",
        field_type: "text-area",
        options: [],
        isMandatory: true,
      },
    ],
    "Reviewer Remarks": [
      {
        fieldName: "Reviewer Name",
        field_type: "text",
        options: [],
        isMandatory: false,
      },
      {
        fieldName: "Date of Review",
        field_type: "date",
        options: [],
        isMandatory: false,
      },
      {
        fieldName: "Reviewer Comments",
        field_type: "text-area",
        options: [],
        isMandatory: true,
      },
    ],
    "Approver Remarks": [
      {
        fieldName: "Approver Name",
        field_type: "text",
        options: [],
        isMandatory: false,
      },
      {
        fieldName: "Date of Approve",
        field_type: "date",
        options: [],
        isMandatory: false,
      },
      {
        fieldName: "Approver Comments",
        field_type: "text-area",
        options: [],
        isMandatory: true,
      },
    ],
  });
  const [activeFlowTab, setActiveFlowTab] = useState(flowoTabs[0]);
  const [activeDefaultTab, setActiveDefaultTab] = useState(allTabs[0]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupAction, setPopupAction] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(setFormData(recordData));
  //   dispatch(setRecordData(recordData));
  // }, [dispatch, recordData ]);
  // dispatch(setFormData(recordData));

  const formattedDateForInput = (dateString) => {
    if (dateString === "NA" || !dateString) {
      return "";
    }
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleFlowTabClick = (tab) => {
    setActiveFlowTab(tab);
  };
  const handleDefaultTabClick = (tab) => {
    setActiveDefaultTab(tab);
  };

  useEffect(() => {
    if (recordData?.stage === 1) {
      setActiveFlowTab("INITIATION");
    } else if (recordData?.stage === 2) {
      setActiveFlowTab("UNDER REVIEW");
    } else if (recordData?.stage === 3) {
      setActiveFlowTab("UNDER APPROVAL");
    } else if (recordData?.stage === 4) {
      setActiveFlowTab("APPROVED");
    }
  }, [recordData]);

  // const handleNewBMRTabClick = (bmrTab) => {
  //   console.log("New BMR tab clicked:", bmrTab);

  //   // Update the state to toggle active state of clicked tab
  //   bmrTabs((prevTabs) =>
  //     prevTabs.map(
  //       (tab) =>
  //         tab.name === bmrTab.name // Compare by a unique property, e.g., name
  //           ? { ...tab, active: true } // Set clicked tab as active
  //           : { ...tab, active: false } // Set all others as inactive
  //     )
  //   );
  // };

  const handlePopupSubmit = (credentials) => {
    const dataObject = {
      record_id: recordData.record_id,
      email: credentials?.email,
      password: credentials?.password,
      reviewComment: "editData.reviewComment",
      approverComment: "editData.approverComment",
      declaration: credentials?.declaration,
      comments: credentials?.comments,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        "Content-Type": "application/json",
      },
    };
    if (popupAction === "sendFromOpenToReview") {
      dataObject.initiatorDeclaration = credentials?.declaration;
      // dataObject.initiatorComment = recordData.initiatorComment;
      axios
        .put(
          `${BASE_URL}/bmr-record/send-record-for-review`,
          dataObject,
          config
        )
        .then(() => {
          toast.success("BMR Record successfully sent for review");
          navigate(`/bmr-forms`);
        })
        .catch((error) => {
          toast.error(
            error?.response?.data?.message || "Couldn't send BMR for review!!"
          );
        });
    } else if (popupAction === "sendFromReviewToApproval") {
      dataObject.reviewerDeclaration = credentials?.declaration;

      axios
        .put(
          `${BASE_URL}/bmr-record/send-record-from-review-to-approval`,
          dataObject,
          config
        )
        .then(() => {
          toast.success("BMR Record successfully sent for approval");
          setTimeout(() => navigate(`/bmr-forms`), 500);
        })
        .catch((error) => {
          toast.error(
            error?.response?.data?.message || "Couldn't send BMR for approval!!"
          );
        });
    } else if (popupAction === "sendFromReviewToOpen") {
      dataObject.reviewerDeclaration = credentials?.declaration;
      axios
        .put(
          `${BASE_URL}/bmr-record/send-record-from-review-to-open`,
          dataObject,
          config
        )
        .then(() => {
          toast.success("BMR Record successfully opened");
          navigate(`/bmr-forms`);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || "Couldn't open bmr!!");
        });
    } else if (popupAction === "sendFromApprovalToApproved") {
      dataObject.approverDeclaration = credentials?.declaration;
      axios
        .put(`${BASE_URL}/bmr-record/approve-BMR`, dataObject, config)
        .then(() => {
          toast.success("BMR Record successfully approved");
          navigate(`/bmr-forms`);
        })
        .catch((error) => {
          toast.error(
            error?.response?.data?.message || "Couldn't approve BMR!!"
          );
        });
    } else if (popupAction === "sendFromApprovalToOpen") {
      dataObject.approverDeclaration = credentials?.declaration;
      axios
        .put(
          `${BASE_URL}/bmr-record/send-record-from-approval-to-open`,
          dataObject,
          config
        )
        .then(() => {
          toast.success(" BMR Record successfully opened");
          navigate(`/bmr-forms`);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || "Couldn't open BMR!!");
        });
    }
    setIsPopupOpen(false);
    setPopupAction(null);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setPopupAction(null);
  };
  const populateApproverFields = () => {
    if (recordData) {
      const approvers = recordData.approvers || [];

      const approverFields = approvers.flatMap((approver, idx) => [
        {
          section: `Approver ${idx + 1}`,
          fields: [
            {
              fieldName: "Approver",
              field_type: "text",
              value: approver.approver,
              isMandatory: false,
            },
            {
              fieldName: "Date of Approval",
              field_type: "date",
              value: "",
              isMandatory: false,
            },
            {
              fieldName: "Approver Comment",
              field_type: "text",
              value: "",
              isMandatory: true,
            },
          ],
        },
      ]);

      setFields((prevFields) => ({
        ...prevFields,
        "Approver Remarks": approverFields,
      }));
    }
  };

  const populateReviewerFields = () => {
    if (recordData) {
      const reviewers = recordData.reviewers || [];

      const reviewerFields = reviewers.flatMap((reviewer, idx) => [
        {
          section: `Reviewer ${idx + 1}`,
          fields: [
            {
              fieldName: "Reviewer",
              field_type: "text",
              value: reviewer.reviewer,
              isMandatory: false,
            },
            {
              fieldName: "Date of Review",
              field_type: "date",
              value: "",
              isMandatory: false,
            },
            {
              fieldName: "Reviewer Comment",
              field_type: "text",
              value: "",
              isMandatory: true,
            },
          ],
        },
      ]);

      setFields((prevFields) => ({
        ...prevFields,
        "Reviewer Remarks": reviewerFields,
      }));
    }
  };

  useEffect(() => {
    populateApproverFields();
    populateReviewerFields();
  }, [recordData]);

  const [activeTab, setActiveTab] = useState(null); // Track the active tab
  const [activeSection, setActiveSection] = useState(null); // Track the active section

  const handleNewBMRTabClick = (tab) => {
    // Set the active sections based on the clicked tab
    setActiveTab(tab?.id);
    setActiveTabSections(tab.BMR_sections || []);
  };

  const handleSectionClick = (section) => {
    setActiveSection(activeSection === section ? null : section); // Toggle the active section
  };

  return (
    <div>
      <div className="flex gap-4 mt-4 mb-4">
        {flowoTabs?.map((tab, index) => (
          <button
            disabled
            style={{ border: "1px solid gray" }}
            key={index}
            onClick={() => handleFlowTabClick(tab)}
            className={`py-2 px-4 rounded border-2 border-black text-white ${
              activeFlowTab === tab && tab === "APPROVED"
                ? "bg-[#195b7a] text-white"
                : flowoTabs.indexOf(activeFlowTab) >= index
                ? "bg-[#2a323e] text-white"
                : "bg-[#777778] text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {allTabs?.map((tab, index) => (
        <button
          style={{ border: "1px solid gray", margin: "5px" }}
          key={index}
          onClick={() => {
            handleDefaultTabClick(tab);
            handleNewBMRTabClick(tab);
          }}
          className={`py-2 px-4 rounded-md ${
            activeDefaultTab === tab
              ? "text-white bg-gradient-to-r from-blue-800 to-blue-900 shadow-lg transform scale-100 transition duration-300 border border-blue-900 opacity-95"
              : "text-gray-800 bg-gray-300 border border-gray-400 hover:bg-gray-400 hover:text-blue-600 shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
          }`}
        >
          {/* Show tab name based on whether it's static or dynamic */}
          {typeof tab === "string" ? tab : tab.tab_name}
        </button>
      ))}
      <div className="flex flex-wrap gap-4 mb-4 ">
        {/* <div>
          {tabs?.map((tab, index) => (
            <button
              style={{ border: "1px solid gray", margin: "5px" }}
              key={index}
              onClick={() => handleDefaultTabClick(tab)}
              className={`py-2 px-4 rounded-md ${
                activeDefaultTab === tab
                  ? "text-white bg-gradient-to-r from-blue-800 to-blue-900 shadow-lg transform scale-100 transition duration-300 border border-blue-900 opacity-95"
                  : "text-gray-800 bg-gray-300 border border-gray-400 hover:bg-gray-400 hover:text-blue-600 shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div> */}
        {/* <div>
          {bmrTabs?.map((tabGroup, index) => (
            <div className="tab-group" key={index}>
              
              {tabGroup?.map((tb) => (
                <div
                  key={tb.id}
                  className="tab-container"
                  style={{ marginBottom: "10px" }}
                >
                  <button
                    style={{ border: "1px solid gray", margin: "5px" }}
                    onClick={() => handleNewBMRTabClick(tb)}
                    className={`py-2 px-4 rounded-md ${
                      tb.id === activeTab
                        ? "text-white bg-gradient-to-r from-blue-800 to-blue-900 shadow-lg transform scale-100 transition duration-300 border border-blue-900 opacity-95"
                        : "text-gray-800 bg-gray-300 border border-gray-400 hover:bg-gray-400 hover:text-blue-600 shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
                    }`}
                  >
                    {tb?.tab_name}
                  </button>
                </div>
              ))}
            </div>
          ))}

        </div> */}
      </div>

      <div className="relative m-2">
        <div className="p-3">
          {activeDefaultTab === "Initiator Remarks" &&
            fields["Initiator Remarks"]?.length > 0 && (
              <div className="mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                  {fields["Initiator Remarks"].map((field, index) => {
                    return (
                      <div
                        key={index}
                        className="p-6 flex flex-col bg-white border border-gray-100 shadow-md rounded-lg  mb-4"
                      >
                        <label className="text-lg font-semibold text-gray-800 mb-2">
                          {field.fieldName}
                          {activeFlowTab === "INITIATION" &&
                            field.fieldName === "Initiator Comments" && (
                              <span className="text-red-500">*</span>
                            )}
                        </label>

                        {field.field_type === "text" && (
                          <input
                            type="text"
                            value={recordData?.InitiatorUser?.name}
                            className="border border-gray-300 p-3 w-full bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 "
                            style={{
                              height: "40px",
                            }}
                            disabled
                          />
                        )}

                        {field.field_type === "date" && (
                          <input
                            type="date"
                            value={formattedDateForInput(
                              recordData?.date_of_initiation
                            )}
                            className="border border-gray-300 p-3 w-full bg-gray-100 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400 "
                            required={field.isMandatory}
                            readOnly
                          />
                        )}

                        {field.field_type === "text-area" && (
                          <textarea
                            value={recordData?.initiatorComment}
                            className="border border-gray-300 p-3 w-full bg-gray-100 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400 "
                            required={
                              activeFlowTab === "INITIATION" &&
                              field.fieldName === "Initiator Comments" &&
                              field.isMandatory
                            }
                            readOnly={
                              !(
                                activeFlowTab === "INITIATION" &&
                                field.fieldName === "Initiator Comments"
                              )
                            }
                            rows={4}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          {activeDefaultTab === "Reviewer Remarks" &&
            fields[activeDefaultTab]?.map((section, secIndex) => {
              return (
                <div key={secIndex} className="mb-20">
                  <div className="p-6 flex flex-col bg-white border border-gray-200 shadow-md rounded-lg  mb-4">
                    {section?.section}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {section.fields?.map((field, index) => {
                      return (
                        <div
                          key={index}
                          className="p-6 flex flex-col bg-white shadow  border border-gray-200 rounded"
                        >
                          <label className="text-lg font-semibold text-gray-800 mb-2">
                            {field.fieldName}
                            {activeFlowTab === "UNDER REVIEW" &&
                              field.fieldName === "Reviewer Comment" && (
                                <span className="text-red-500"> *</span>
                              )}
                          </label>
                          {field.field_type === "text" && (
                            <input
                              type="text"
                              className=" p-3 w-full bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 "
                              style={{
                                height: "30px",
                              }}
                              value={field.value || ""}
                              disabled
                            />
                          )}
                          {field.field_type === "date" && (
                            <input
                              type="date"
                              value={formattedDateForInput(
                                recordData?.reviewers?.map(
                                  (date) => date?.date_of_review
                                )
                              )}
                              className=" p-2 w-full bg-gray-100  rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                              style={{
                                height: "30px",
                              }}
                              readOnly
                            />
                          )}
                          {field.field_type === "text-area" && (
                            <textarea
                              className="border border-gray-300 p-2 w-full rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                              style={{ border: "1px solid #D1D5DB" }}
                              required={
                                activeFlowTab === "UNDER REVIEW" &&
                                field.fieldName === "Reviewer Comment" &&
                                field.isMandatory
                              }
                              readOnly={
                                !(
                                  activeFlowTab === "UNDER REVIEW" &&
                                  field.fieldName === "Reviewer Comment"
                                )
                              }
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

          {activeDefaultTab === "Approver Remarks" &&
            fields[activeDefaultTab]?.map((section, secIndex) => (
              <div key={secIndex} className="mb-20">
                <div className="p-6 flex flex-col bg-white border border-gray-200 shadow-md rounded-lg  mb-4">
                  {section.section}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {section.fields?.map((field, index) => (
                    <div
                      key={index}
                      className="p-6 flex flex-col bg-white shadow  border border-gray-200 rounded"
                    >
                      <label className="text-lg font-extrabold text-gray-700 mb-2">
                        {field.fieldName}
                        {activeFlowTab === "UNDER APPROVAL" &&
                          field.fieldName === "Approver Comment" && (
                            <span className="text-red-500"> *</span>
                          )}
                      </label>
                      {field.field_type === "text" && (
                        <input
                          type="text"
                          className="border border-gray-300 p-2 w-full bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                          style={{
                            // border: "1px solid #D1D5DB",
                            height: "30px",
                          }}
                          value={field.value || ""}
                          disabled
                        />
                      )}
                      {field.field_type === "date" && (
                        <input
                          type="date"
                          value={formattedDateForInput(
                            recordData?.approvers?.map(
                              (date) => date?.date_of_approval
                            )
                          )}
                          className="border border-gray-300 bg-gray-100  p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                          style={{
                            // border: "1px solid #D1D5DB",
                            height: "30px",
                          }}
                          readOnly
                        />
                      )}
                      {field.field_type === "text-area" && (
                        <textarea
                          className="border border-gray-300 p-2 w-full rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                          required={
                            activeFlowTab === "UNDER APPROVAL" &&
                            field.fieldName === "Approver Comment" &&
                            field.isMandatory
                          }
                          readOnly={
                            !(
                              activeFlowTab === "UNDER APPROVAL" &&
                              field.fieldName === "Approver Comment"
                            )
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))} 

          {activeTabSections.map((section, secIndex) => (
            <div
              key={secIndex}
              className="text-lg flex flex-col gap-9 font-bold text-gray-500"
            >
           
                <div
                  className="p-4 border mb-4 border-gray-500 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 opacity-95"
                >
                  <h3 className="font-semibold text-gray-600 mb-3 text-lg bg-gray-200 p-3">
                    <div className="flex items-center gap-5 ">
                      <p>Section :</p>
                      <div className="block text-black">
                      {section.section_name}
                      </div>
                    </div>
                  </h3>
                  <div
                    className={
                      section.BMR_fields.some(
                        (field) => field.field_type === "grid"
                      )
                        ? ""
                        : "grid grid-cols-2 gap-4"
                    }
                  >
                    {section.BMR_fields?.map((field, fieldIndex) => {
                      return (
                        <div
                        key={fieldIndex}
                          className={`${
                            field.field_type !== "grid"
                              ? "grid grid-cols-2"
                              : " p-2"
                          }`}
                        >
                          {field.field_type !== "grid" && (
                            <InputField
                            label={field.label}
                              type={field.field_type || "text"}
                              placeholder={field.placeholder}
                              value={field.defaultValue}
                              helpText={field.helpText}
                              className={` mb-4 rounded-md p-2 text-black ${
                                field.label
                                  ? "text-base text-gray-900 flex gap-1 mb-2"
                                  : ""
                              } `}
                              readOnly
                            />
                          )}
                          {/* Grid field */}
                          <div className="mt-2">
                            {field.field_type === "grid" && (
                              <div className="relative ">
                                <div className="flex justify-between items-center">
                                  <div> {field.label} </div>
                                  <div className="flex justify-end">
                                    <button
                                      onClick={addNewRow}
                                      className="p-2 rounded"
                                    >
                                      <IoIosAddCircle size={25} />
                                    </button>
                                  </div>
                                </div>

                                {(() => {
                                  let acceptsMultiple = field?.acceptsMultiple
                                    ? JSON.parse(field.acceptsMultiple)
                                    : { columns: [], rows: [] };
                                  return (
                                    acceptsMultiple?.columns?.length > 0 && (
                                      <table className="table-auto w-full border border-gray-600 mb-4">
                                        <thead>
                                          <tr>
                                            {acceptsMultiple.columns.map(
                                              (column, idx) => {
                                                return (
                                                  <th
                                                    key={idx}
                                                    className="border border-gray-600 p-2"
                                                  >
                                                    {column?.name || "No Name"}
                                                  </th>
                                                );
                                              }
                                            )}
                                            <th className="border border-gray-600 p-2">
                                              Action
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {gridData.map((row, rowIndex) => {
                                            return (
                                              <tr key={rowIndex}>
                                                {acceptsMultiple.columns.map(
                                                  (column, colIdx) => (
                                                    <td
                                                      key={colIdx}
                                                      className="border border-gray-600 p-2"
                                                    >
                                                      <input
                                                        type={
                                                          column.field_type ||
                                                          "text"
                                                        }
                                                        onChange={
                                                          (e) =>
                                                            handleGridChange(
                                                              rowIndex,
                                                              column.name,
                                                              e.target.value
                                                            ) // Update the value when typing
                                                        }
                                                        className="border text-black border-gray-600 p-2 w-full rounded"
                                                      />
                                                    </td>
                                                  )
                                                )}
                                                <td className="border border-gray-600 p-2 text-center">
                                                  <button
                                                    onClick={() =>
                                                      deleteRow(rowIndex)
                                                    }
                                                    className="text-red-500 hover:text-red-700"
                                                  >
                                                    <IoIosTrash size={20} />
                                                  </button>
                                                </td>
                                              </tr>
                                            );
                                          })}
                                        </tbody>
                                      </table>
                                    )
                                  );
                                })()}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
           
            </div>
          ))}
        </div>

        <div className="fixed bottom-36 right-[-10px] w-auto flex-col border-gray-300  flex gap-5">
          {recordData?.stage === 1 &&
            recordData?.initiator === userDetails.userId && (
              <AtmButton
                label={"Send For Review"}
                className="bg-[#195b7a] hover:bg-[#1f4f5f] p-2 rounded-l-full"
                onClick={() => {
                  setIsPopupOpen(true);
                  setPopupAction("sendFromOpenToReview"); // Set the action when opening the popup
                }}
              />
            )}
          {recordData?.stage === 2 &&
            recordData?.reviewers.some(
              (reviewer) => reviewer.reviewerId === userDetails.userId
            ) &&
            (recordData?.reviewers.find(
              (reviewer) => reviewer.reviewerId === userDetails.userId
            )?.status === "reviewed" ? (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-md">
                <p className="font-semibold text-lg flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m2 0h-1v-4h-1m1 10v1m4-6.582c.594-.34 1-.985 1-1.718V5.5a2.5 2.5 0 00-5 0v2.5c0 .733.406 1.378 1 1.718M10 9v6.034c0 1.386-.803 2.647-2.051 3.302a3.75 3.75 0 00-.95 5.27M19 13v7m0 0h-4m4 0v-3m4 3h-4m4 0v-3m4 3h-4"
                    />
                  </svg>
                  You have already reviewed this.
                </p>
              </div>
            ) : (
              <>
                <AtmButton
                  label={"Send For Approval"}
                  className="bg-[#195b7a] hover:bg-[#1f4f5f] p-2 rounded-l-full"
                  onClick={() => {
                    setIsPopupOpen(true);
                    setPopupAction("sendFromReviewToApproval"); // Set the action when opening the popup
                  }}
                />
                <AtmButton
                  label={"Open BMR"}
                  className="bg-[#195b7a] hover:bg-[#1f4f5f] p-2 rounded-l-full"
                  onClick={() => {
                    setIsPopupOpen(true);
                    setPopupAction("sendFromReviewToOpen"); // Set the action when opening the popup
                  }}
                />
              </>
            ))}
          {recordData?.stage === 3 &&
          recordData?.approvers.some(
            (approver) => approver.approverId === userDetails.userId
          ) ? (
            recordData?.approvers.find(
              (approver) => approver.approverId === userDetails.userId
            )?.status === "approved" ? (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md">
                <p className="font-semibold text-lg flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m2 0h-1v-4h-1m1 10v1m4-6.582c.594-.34 1-.985 1-1.718V5.5a2.5 2.5 0 00-5 0v2.5c0 .733.406 1.378 1 1.718M10 9v6.034c0 1.386-.803 2.647-2.051 3.302a3.75 3.75 0 00-.95 5.27M19 13v7m0 0h-4m4 0v-3m4 3h-4m4 0v-3m4 3h-4"
                    />
                  </svg>
                  You have already approved this.
                </p>
              </div>
            ) : (
              <>
                <AtmButton
                  label={"Approve BMR"}
                  className="bg-[#195b7a] hover:bg-[#1f4f5f] p-2 rounded-l-full"
                  onClick={() => {
                    setIsPopupOpen(true);
                    setPopupAction("sendFromApprovalToApproved"); // Set the action when opening the popup
                  }}
                />
                <AtmButton
                  label={"Open BMR"}
                  className="bg-[#195b7a] hover:bg-[#1f4f5f] p-2 rounded-l-full"
                  onClick={() => {
                    setIsPopupOpen(true);
                    setPopupAction("sendFromApprovalToOpen"); // Set the action when opening the popup
                  }}
                />
              </>
            )
          ) : null}
          <AtmButton
            label={"Exit"}
            onClick={() => {
              navigate("/bmr-forms");
            }}
            className="rounded-l-full"
          />
        </div>
      </div>
      {isPopupOpen && (
        <UserVerificationPopUp
          onClose={handlePopupClose}
          onSubmit={handlePopupSubmit}
        />
      )}
    </div>
  );
};

const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  helpText,
}) => (
  <div>
    <label className=" text-gray-700 font-bold p-2 mb-2 flex items-center">
      {label}
      {type === "text" && <span className="text-red-600">*</span>}
      {helpText && (
        <Tooltip title={helpText} placement="right-start">
          <div className="text-gray-950 cursor-pointer ml-2">
            <span className="text-black">ⓘ</span>
          </div>
        </Tooltip>
      )}
    </label>

    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly
      className="w-full px-3 h-10 p-2 border-2 font-sm text-black border-gray-500 rounded shadow-md focus:border-blue-500 transition duration-200"
      style={{ border: "1px solid gray" }}
    />
  </div>)

export default BMRRecordsDetails;
