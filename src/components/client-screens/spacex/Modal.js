import React from "react";
import { GrClose } from "react-icons/gr";
import { AiOutlineYoutube } from "react-icons/ai";
import { SiNasa } from "react-icons/si";
import { ImWikipedia } from "react-icons/im";
import ModalDataList from "./ModalDataList";
import { Link } from "react-router-dom";

const Modal = ({ oneLaunch, visible, onClose }) => {
  if (!visible) return null;

  const closeSearch = (e) => {
    const id = e.target.getAttribute("id");
    if (id === "bg-modal") {
      onClose();
    }
    // console.log(id);
  };
  const utcDate = oneLaunch.launch_date_utc;
  var localDate = new Date(utcDate);
  console.log("localDate", localDate.toLocaleString());

  return (
    <div
      className="fixed inset-0 overflow-y-hidden bg-black bg-opacity-20 z-[300] backdrop-blur-[0.5px]  flex justify-center items-center"
      onClick={closeSearch}
      id="bg-modal"
    >
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div
            id="modal-box"
            className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 "
          >
            <div
              className="mt-3 text-right flex justify-end sm:mt-0 sm:ml-4 sm:text-right cursor-pointer"
              onClick={onClose}
            >
              <GrClose size={22} />
            </div>
            <div className="sm:flex sm:items-start flex mb-3">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                <img
                  src={oneLaunch.links?.mission_patch}
                  alt={oneLaunch.mission_name}
                />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg font-medium leading-6 text-gray-900"
                  id="modal-title"
                >
                  <span className="mr-3">{oneLaunch.mission_name}</span>
                  <span
                    className={`relative inline-block px-3 py-0.5 font-semibold ${
                      oneLaunch.launch_success
                        ? "text-green-700"
                        : oneLaunch.upcoming
                        ? "text-yellow-700"
                        : "text-red-700"
                    }  leading-3`}
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-0 ${
                        oneLaunch.launch_success
                          ? "bg-green-200"
                          : oneLaunch.upcoming
                          ? "bg-yellow-200"
                          : "bg-red-200"
                      }  opacity-50 rounded-full`}
                    />
                    <span className="relative capitalize text-sm">
                      {oneLaunch.launch_success
                        ? "success"
                        : oneLaunch.upcoming
                        ? "upcoming"
                        : "failed"}
                    </span>
                  </span>
                </h3>

                <div className="mt-1">
                  <p className="text-sm text-gray-500">
                    {oneLaunch?.rocket?.rocket_name}
                  </p>
                </div>
                <div className="mt-1 flex flex-wrap">
                  <span className="text-sm text-gray-500 -mx-1">
                    <a
                      href={
                        oneLaunch?.links?.article_link
                          ? oneLaunch?.links?.article_link
                          : "/"
                      }
                      target="_blank"
                    >
                      <SiNasa className="mx-1" size={16} />
                    </a>
                  </span>
                  <span className="text-sm text-gray-500 ">
                    <a
                      href={
                        oneLaunch?.links?.wikipedia
                          ? oneLaunch?.links?.wikipedia
                          : "/"
                      }
                      target="_blank"
                    >
                      <ImWikipedia className="mx-1" size={16} />
                    </a>
                  </span>
                  <span className="text-sm text-gray-500 ">
                    <a
                      href={
                        oneLaunch?.links?.video_link
                          ? oneLaunch?.links?.video_link
                          : "/"
                      }
                      target="_blank"
                    >
                      <AiOutlineYoutube className="mx-1" size={16} />
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex mb-4">
              <p className="text-sm text-gray-800 leading-6">
                {oneLaunch.details}
                <Link
                  to={
                    oneLaunch?.links?.wikipedia
                      ? oneLaunch?.links?.wikipedia
                      : "/"
                  }
                  className="text-blue-500 ml-2"
                >
                  Wikipedia
                </Link>
              </p>
            </div>
            <ModalDataList
              title="flight number"
              data={oneLaunch.flight_number}
            />
            <ModalDataList title="mission name" data={oneLaunch.mission_name} />
            <ModalDataList
              title="rocket type"
              data={
                oneLaunch?.rocket?.rocket_type
                  ? oneLaunch?.rocket?.rocket_type
                  : "info not available"
              }
            />
            <ModalDataList
              title="rocket name"
              data={
                oneLaunch?.rocket?.rocket_name
                  ? oneLaunch?.rocket?.rocket_name
                  : "info not available"
              }
            />
            <ModalDataList
              title="manufacturer"
              data={
                oneLaunch?.rocket?.second_stage
                  ? oneLaunch?.rocket?.second_stage.payloads.map(
                      (payload) => payload.manufacturer
                    )
                  : "info not available"
              }
            />
            <ModalDataList
              title="nationality"
              data={
                oneLaunch?.rocket?.second_stage
                  ? oneLaunch?.rocket?.second_stage.payloads.map(
                      (payload) => payload.nationality
                    )
                  : "info not available"
              }
            />
            <ModalDataList
              title="launch date"
              data={oneLaunch.launch_date_utc}
            />
            <ModalDataList
              title="payload type"
              data={
                oneLaunch?.rocket?.second_stage
                  ? oneLaunch?.rocket?.second_stage.payloads.map(
                      (payload) => payload.payload_type
                    )
                  : "info not available"
              }
            />
            <ModalDataList
              title="orbit"
              data={
                oneLaunch?.rocket?.second_stage
                  ? oneLaunch?.rocket?.second_stage.payloads.map(
                      (payload) => payload.orbit
                    )
                  : "info not available"
              }
            />
            <ModalDataList
              title="launch site"
              data={
                oneLaunch?.launch_site?.site_name
                  ? oneLaunch?.launch_site?.site_name
                  : "info not available"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
