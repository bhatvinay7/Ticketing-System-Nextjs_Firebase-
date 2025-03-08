"use client";
import React, { useState,useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate from "@/lib/useAxiosPrivate";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  faEllipsisVertical,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function ViewTicket() {
  

  const axiosPrivate = useAxiosPrivate();
  const [userData, setUserData] = useState<ticket[]>([]);
  const [updateResponse, setUpdateResponse] = useState<string>("");
  const [currentData, setCurrentData] = useState<{
    loading: boolean;
    index: number;
  }>({ loading: false, index: -1 });
  const [formData, setFormData] = useState<updateTicket[]>(
    Array(userData.length).fill({
      description: "",
      assignTo: "",
      priority: "",
      status: "",
      caregory: "",
    })
  );
  const [isOpen, setOpen] = useState<boolean[]>(
    Array(userData.length).fill(false)
  );
  const [editVisible, setVisible] = useState<boolean[]>(
    Array(userData.length).fill(false)
  );

  useEffect(() => {
    async function fetch() {
      const response = await axiosPrivate.get("/api/controller");
      setUserData(response.data);
     
    }
    fetch();
  }, []);

  function handleClick(index: number) {
    setOpen((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle only the clicked ticket
    }));
  }
  

  function handleChangeForShad(e: {
    target: { name: string; value: string; index: number };
  }) {
    let currentUser = userData[e.target.index];
    currentUser = { ...currentUser, [e.target.name]: e.target.value };
    const data = [...userData];
    data[e.target.index] = currentUser;

    const onChangeData = formData[e.target.index];
    const updatedFormData = [...formData];
    updatedFormData[e.target.index] = {
      ...updatedFormData[e.target.index],
      [e.target.name]: e.target.value,
    };
    setFormData(updatedFormData);

    setUserData(data);
  }

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) {
    let currentUser = userData[index];
    currentUser = { ...currentUser, [e.target.name]: e.target.value };
    const data = [...userData];
    data[index] = currentUser;
    const updateData = { ...formData };
    updateData[index] = {
      ...updateData[index],
      [e.target.name]: e.target.value,
    };
    setFormData(updateData);
    setUserData(data);
  }

  function deleteTicket() {}

  async function handleUpdate(
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
    index: number
  ) {
    try {
      const data = formData[index];
      const updateData = Object.entries(data)
        .filter(([key, value]) => value != "")
        .reduce((store, [key, value]) => {
          return { ...store, [key]: value };
        }, {});
      if (!updateData) {
        return;
      }
      setCurrentData({ loading: true, index: index });
      const response = await axiosPrivate.patch(
        `/api/controller?id=${encodeURIComponent(id)}`,
        JSON.stringify(updateData)
      );
      console.log(updateData);
      setUpdateResponse(response.data.message);
      console.log(response.data.message);
      setCurrentData({ loading: false, index: index });
      window.setTimeout(() => {
        setUpdateResponse("");
      }, 5000);
      console.log(response.data);
    } catch (error: any) {
      setCurrentData({ loading: false, index: index });
    }
  }

  function enableEdit(index: number) {
    setVisible((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle only the clicked ticket
    }));
  }

  return (
    <div className="lg:p-4 p-1 min-h-screen w-full min-w-[350px] overflow-x-scroll ">
      {currentData?.loading ? (
        <div className="absolute h-full w-full z-[37] flex justify-center items-center inset-0 bg-black/25">
          <FontAwesomeIcon
            className="text-gray-50 fixed inset-0 top-[40%] left-1/2  text-5xl animate-spin "
            icon={faCircleNotch}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="bg-white/80 lg:p-4 p-2 rounded-lg shadow-lg">
        <table className="w-full border-collapse border-x-0 border-y-0">
          {/* Table Head */}
          <thead>
            <tr className="text-indigo-600 text-[10px] md:text-base place-content-baseline   ">
              <th className=" lg:px-4 px-1  py-2 md:block hidden text-left ">
                {}
              </th>
              <th className=" select-none lg:px-4 px-1  py-2 font-mono  text-sm  md:text-base text-left">
                USER NAME
              </th>
              <th className=" select-none lg:px-4 py-2 md:inline-block hidden font-mono text-sm md:text-base text-left">
                TICKET ID
              </th>
              <th className=" select-none lg:px-4 px-1  py-2 font-mono text-sm md:text-base text-left">
                TASK TYPE
              </th>
              <th className=" select-none lg:px-4 px-1 py-2 font-mono  text-sm  md:inline-block hidden md:text-base text-left">
                CREATED ON
              </th>
              <th className="  select-none lg:px-4 px-1  py-2 font-mono  text-sm  md:text-base text-left">
                PRIORITY
              </th>
              <th className=" select-none lg:px-4 px-1 md:inline-block hidden py-2 font-mono text-sm md:text-base text-left">
                ASSIGN TO
              </th>
              <th className=" select-none lg:px-4 px-1  py-2 font-mono  text-sm md:text-base text-left">
                STATUS
              </th>
              <th className=" select-none lg:px-4 px-1  py-2 font-mono  text-sm  md:text-base text-left">
                {}
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          {Array.isArray(userData) &&
            userData.map((ticket, index: number) => (
              <tbody key={index} className="mb-1 ">
                <>
                  <tr className=" place-content-center rounded-md ">
                    <td className=" md:px-4 px-1 md:block hidden  py-2">
                      <div className="w-[32px] h-[32px]  bg-gray-400 rounded-full caret-transparent ">
                        {/* {user?.photoURL ? (
                          <Image
                            src={`${user.photoURL}`}
                            alt="userPhoto"
                            width={32}
                            height={32}
                            priority
                            className="rounded-full   inset-0 relative"
                          />
                        ) : (
                          <></>
                        )} */}
                      </div>
                    </td>
                    <td className=" md:px-4 px-0.5 py-2">
                      <p className="truncate text-sm  md:text-base max-w-24">
                        {ticket.name}
                      </p>
                    </td>
                    <td className=" md:px-4 px-0.5 md:block hidden text-sm md:text-base  py-2 truncate max-w-24">
                      <p>{ticket.tokenId}</p>
                    </td>
                    <td className=" md:px-4 px-0.5 py-2">
                      <p className="truncate text-sm md:text-base max-w-24">
                        {ticket.category}
                      </p>
                    </td>
                    <td className=" md:px-4 text-[10px] md:inline-block hidden truncate sm:max-w-20 lg:max-w-32  md:text-base px-1 py-2">
                      {ticket.date}
                    </td>
                    <td className={`  md:px-4 px-0.5 md:py-2 py-1 `}>
                      <div
                        className={`py-0.5 md:w-20 w-fit px-0.5 text-center text-base   h-auto rounded-sm text-white ${
                          ticket.priority === "High"
                            ? "bg-red-600/75"
                            : ticket.priority === "In Progress"
                            ? "bg-yellow-600"
                            : ticket.priority === "Medium"
                            ? "bg-green-600/75"
                            : "bg-yellow-200 text-black"
                        }`}
                      >
                        {ticket.priority}
                      </div>
                    </td>
                    <td className=" md:px-4 md:inline-block hidden px-0.5 md:py-2 py-0.5">
                      <p className="truncate text-sm md:text-base max-w-12 md:max-w-16 lg:max-w-20">
                        {ticket.assignTo}
                      </p>
                    </td>
                    <td className=" md:px-4 px-1  py-2">
                      <span className="bg-cyan-200/25 text-sm md:text-base rounded-md px-0.5">
                        {ticket.status}
                      </span>
                    </td>
                    <td className=" md:px-4 px-0.5 py-2 text-center place-content-start  cursor-pointer">
                      <FontAwesomeIcon
                        className=" !impetant text-[20px] mt-3 text-blue-300"
                        icon={faEllipsisVertical}
                        onClick={() => {
                          handleClick(index),
                          ()=>setVisible((prev) => ({
                              ...prev,
                              [index]: false, // Toggle only the clicked ticket
                            }));
                        }}
                      />
                    </td>
                  </tr>

                  {/* Description Row */}

                  <tr
                    key={index + 4}
                    className={`  w-full  ${
                      isOpen[index]
                        ? "transition-all  delay-700 ease-in h-auto"
                        : " hidden h-0"
                    }    `}
                  >
                    <td
                      colSpan={10}
                      className="md:p-4 p-1  border-collapse  w-full "
                    >
                    
                        <div className=" flex flex-col  md:grid md:grid-cols-2  gap-4 h-auto bg-white/75 relative border-2 border-indigo-700/45 p-4  rounded-xl ">
                          <div className=" absolute flex right-4 top-3 gap-x-4 mb-2 justify-end">
                            <FontAwesomeIcon
                              onClick={(e) => {
                                enableEdit(index);
                              }}
                              className="text-black/75  text-base"
                              icon={faPenToSquare}
                            />
                            <FontAwesomeIcon
                              onClick={() => {
                                deleteTicket();
                              }}
                              className="bg text-base text-black/75"
                              icon={faTrash}
                            />
                          </div>

                          <div className="flex lg:gap-x-8 gap-x-1 mt-4 sm:mt-0 text-sm md:text-base">
                            <p className="text-blue-700/75 text-sm md:text-base font-mono  uppercase">
                              TICKET ID:
                            </p>
                            <p>{ticket.tokenId}</p>
                          </div>
                          <div className="flex md:gap-x-4 gap-x-1 text-base">
                            <p className="text-blue-700/75 font-mono text-sm md:text-base uppercase">
                              TASK TYPE:
                            </p>
                            <p className="text-sm md:text-base">
                              {ticket.category}
                            </p>
                          </div>
                          <div className="flex md:gap-x-4 gap-x-1 text-base">
                            <p className="text-blue-700/75  font-mono text-sm  md:text-base uppercase">
                              CREATED ON:
                            </p>
                            <p className=" text-sm md:text-base t">
                              {ticket.date}
                            </p>
                          </div>
                          <div className="flex md:gap-x-4 gap-x-1 text-sm md:text-base">
                            <p className="text-blue-700/75 font-mono text-sm md:text-base uppercase">
                              USER NAME:
                            </p>
                            <p className="text-sm md:text-base">
                              {ticket.name}
                            </p>
                          </div>
                          <div className="flex md:gap-x-4 gap-x-14 items-center text-sm md:text-base">
                            <p className="text-blue-700/75 font-mono text-sm md:text-base uppercase">
                              USER CONTACT:
                            </p>

                            <p className="text-sm md:text-base">
                              {ticket.mobile}
                            </p>
                          </div>
                          <div className="flex md:gap-x-4 gap-x-1 items-center text-sm md:text-base">
                            <p className="text-blue-700/75 font-mono text-sm md:text-base uppercase">
                              PRIORITY:
                            </p>
                            {editVisible[index] ? (
                              <Select
                                onValueChange={(value) =>
                                  handleChangeForShad({
                                    target: { name: "priority", value, index },
                                  })
                                }
                              >
                                <SelectTrigger className=" border-2 w-fit border-blue-500 focus:border-blue-500 h-2 active:border-sky-700   rounded-sm">
                                  <SelectValue placeholder={ticket.priority} />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-200 text-black !important hover:bg-gray-100">
                                  <SelectItem
                                    className="data-[highlighted]:bg-gray-400 text-sm md:text-base data-[highlighted]:text-black "
                                    value="Low"
                                  >
                                    Low
                                  </SelectItem>
                                  <SelectItem
                                    className="data-[highlighted]:bg-gray-400 text-sm md:text-base data-[highlighted]:text-black "
                                    value="Medium"
                                  >
                                    Medium
                                  </SelectItem>
                                  <SelectItem
                                    className="data-[highlighted]:bg-gray-400 text-sm md:text-base data-[highlighted]:text-black "
                                    value="High"
                                  >
                                    High
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <p
                                className={`font-semibold text-sm md:text-base ${
                                  ticket.priority === "High"
                                    ? "text-red-600"
                                    : ticket.priority === "Medium"
                                    ? "text-yellow-600"
                                    : "text-green-600"
                                }`}
                              >
                                {ticket.priority}
                              </p>
                            )}
                          </div>
                          <div className="flex md:gap-x-4 gap-x-1 items-center text-base">
                            <p className="text-blue-700/75 font-mono text-sm md:text-base uppercase">
                              ASIGN TO :
                            </p>
                            {editVisible[index] ? (
                              <input
                                onChange={(e) => handleChange(e, index)}
                                className=" p-2 border-2 border-blue-500 lg:min-w-32 min-w-20 text-sm md:text-base rounded-sm outline-none caret-black focus:border-blue-500 active:border-sky-700"
                                name="assignTo"
                                value={ticket.assignTo}
                                type="text"
                                placeholder=" Enter the name"
                              />
                            ) : (
                              <p className="text-sm md:text-base">
                                {ticket.assignTo}
                              </p>
                            )}
                          </div>
                          <div className="col-span-2 text-sm md:text-base flex">
                            <div className="flex items-center justify-start gap-x-1 ">
                              <p className="text-blue-700/75 font-mono text-sm md:text-base uppercase">
                                STATUS:
                              </p>

                              {/* <FontAwesomeIcon className="text-black/60 ml-4 text-sm" icon={faPenToSquare} /> */}
                              {editVisible[index] ? (
                                <Select
                                  onValueChange={(value) =>
                                    handleChangeForShad({
                                      target: { name: "status", value, index },
                                    })
                                  }
                                >
                                  <SelectTrigger className=" border-2 border-blue-500 focus:border-blue-500  active:border-sky-700 h-2 text-sm md:text-base rounded-sm">
                                    <SelectValue placeholder={ticket.status} />
                                  </SelectTrigger>
                                  <SelectContent className="bg-gray-200 text-black !important hover:bg-gray-100">
                                    <SelectItem
                                      className="data-[highlighted]:bg-gray-400 text-sm md:text-base data-[highlighted]:text-black "
                                      value="Pending"
                                    >
                                      Pending
                                    </SelectItem>
                                    <SelectItem
                                      className="data-[highlighted]:bg-gray-400 data-[highlighted]:text-black "
                                      value=" In Progress"
                                    >
                                      In Progress
                                    </SelectItem>
                                    <SelectItem
                                      className="data-[highlighted]:bg-gray-400 data-[highlighted]:text-black "
                                      value="Closed"
                                    >
                                      Closed
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              ) : (
                                <p
                                  className={`font-semibold text-sm md:text-base rounded-md ${
                                    ticket.status === "Open"
                                      ? "text-blue-600"
                                      : ticket.status === "In Progress"
                                      ? "text-yellow-600"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {ticket.status}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="w-full col-span-2">
                            <div className="flex flex-col text-base">
                              <p className="text-blue-700/75 font-mono text-sm md:text-base uppercase">
                                DESCRIPTION:
                              </p>

                              {editVisible[index] ? (
                                <textarea
                                  onChange={(e) => {
                                    handleChange(e, index);
                                  }}
                                  rows={4}
                                  cols={50}
                                  name="description"
                                  className="p-2 outline-none caret-black max-h-80 min-h-20 border-2 border-blue-500 focus:border-blue-500  rounded-xl text-sm md:text-base bg-gradient-to-tr from-gray-200 to-yellow-50/45 text-start active:border-sky-700  h-40"
                                  value={ticket.description}
                                  placeholder="enter your problem description"
                                />
                              ) : (
                                <p className="w-3/4">{ticket.description}</p>
                              )}
                            </div>
                            {updateResponse && editVisible[index] ? (
                              <div className="w-full p-2">
                                <p className="text-green-700 font-sans font-semibold">
                                  {updateResponse}
                                </p>
                              </div>
                            ) : (
                              <></>
                            )}
                            {editVisible[index] ? (
                              <div className=" w-full flex justify-end col-span-full">
                                <button
                                  onClick={(e) =>
                                    handleUpdate(e, ticket.id, index)
                                  }
                                  className="bg-yellow-300 text-sm hover:bg-yellow-300/45 border-2 border-white  w-fit mt-4  text-black font-semibold rounded-md px-1.5 py-1 "
                                  type="button"
                                >
                                  Update
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                    
                    </td>
                  </tr>
                </>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
}

export default ViewTicket;
