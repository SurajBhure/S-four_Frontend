import { useState, useEffect } from "react";
import Nav from "./Nav";
import axios from "axios";
import Spinner from "./Spinner";
import Pagination from "./Pagination";
import Modal from "./Modal";
import { CiFilter } from "react-icons/ci";
import { FiChevronDown } from "react-icons/fi";
import { AiOutlineCalendar } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
function LaunchesList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [launchesPerPage, setLaunchesPerPage] = useState(12);
  const [showModal, setShowModal] = useState(false);
  const [oneLaunch, setOneLaunch] = useState({});

  // pagelimit is 12

  // https://api.spacexdata.com/v3/launches
  // https://api.spacexdata.com/v3/launches/{{flight_number}}
  // https://api.spacexdata.com/v3/launches/upcoming

  const getLaunchesDetails = async (data) => {
    const url = `https://api.spacexdata.com/v3/launches${data}`;
    setLoading(true);
    await axios.get(`${url}`).then((res) => {
      setLaunches(res.data);
    });
    setLoading(false);
  };

  useEffect(() => {
    const param = searchParams.get("status");

    console.log("Search params: ", param);
    let query = "";
    if (!param) query = "";
    else if (param == "upcoming") query = "/upcoming";
    else if (param == "success") query = "?launch_success=true";
    else if (param == "failed") query = "?launch_success=false";

    getLaunchesDetails(query);
  }, [searchParams]);

  //getIndex of the lastLaunch
  const indexOfLastLaunch = currentPage * launchesPerPage;
  const indexOfFirstLaunch = indexOfLastLaunch - launchesPerPage;

  const currentLaunches = launches.slice(indexOfFirstLaunch, indexOfLastLaunch);

  // console.log("launches", launches);
  // console.log("indexOfLastLaunch", indexOfLastLaunch);
  // console.log("indexOfFirstLaunch", indexOfFirstLaunch);

  //changepage
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleOpenModal = async (id) => {
    setShowModal(true);
    await axios
      .get(`https://api.spacexdata.com/v3/launches/${id}`)
      .then((res) => setOneLaunch(res.data));
  };
  const handleModalClose = () => setShowModal(false);
  // console.log("oneLaunch", oneLaunch);

  const handleFilterSelect = (e) => {
    const { value } = e.target;
    setSearchParams({ status: value });
  };

  return (
    <>
      <Modal
        oneLaunch={oneLaunch}
        visible={showModal}
        onClose={handleModalClose}
      />
      <Nav />

      {/* Select filter part start */}

      <div className="flex justify-between container mx-auto px-4 sm:px-8">
        <div className="mb-3 xl:w-40">
          <AiOutlineCalendar className="relative top-[26px]" />
          <select
            className="form-select border-0 appearance-none block w-full px-6 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none hover:bg-gray-400"
            aria-label="Default select example"
          >
            <option selected>Past 6 Months</option>
            <option value={1}>One</option>
            <option value={2}>Two</option>
            <option value={3}>Three</option>
          </select>
          <FiChevronDown className="float-right mr-3 relative bottom-6" />
        </div>

        <div className="mb-3 xl:w-36">
          <CiFilter className="relative top-[25px] -left-2" />
          <select
            onChange={handleFilterSelect}
            className="form-select capitalize border-0 appearance-none block w-full px-3 py-1.5 text-sm font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          >
            <option selected>All Launches</option>
            <option value="upcoming" className="capitalize leading-4">
              Upcoming launches
            </option>
            <option value="success" className="capitalize">
              Succesful launches
            </option>
            <option value="failed" className="capitalize">
              failed launches
            </option>
          </select>
          <FiChevronDown className="float-right relative bottom-6" />
        </div>
      </div>

      {/* filter part ends here */}

      <div className="container mx-auto px-4 sm:px-8">
        <div className="pb-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 pb-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="th">No:</th>
                    <th className="th">Launched(UTC)</th>
                    <th className="th">Location</th>
                    <th className="th">Mission</th>
                    <th className="th">orbit</th>
                    <th className="th">launch status</th>
                    <th className="th">Rocket</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="h-[80vh]">
                        <Spinner />
                      </td>
                    </tr>
                  ) : (
                    currentLaunches.map((launch, i) => (
                      <tr
                        key={launch.flight_number + i}
                        onClick={() => handleOpenModal(launch.flight_number)}
                      >
                        <td className="td">
                          <p className="table-data-text">
                            {launch.flight_number}
                          </p>
                        </td>
                        <td className="td">
                          <p className="table-data-text">
                            24 March 2006 at 22:30
                          </p>
                        </td>
                        <td className="td">
                          <p className="table-data-text">
                            {launch.launch_site.site_name}
                          </p>
                        </td>
                        <td className="td">
                          <p className="table-data-text">
                            {launch.mission_name}
                          </p>
                        </td>
                        <td className="td">
                          {launch.rocket.second_stage.payloads.map(
                            (payload, i) => (
                              <p
                                className="table-data-text"
                                key={payload.orbit + i}
                              >
                                {payload.orbit}
                              </p>
                            )
                          )}
                        </td>
                        <td className="td">
                          <span
                            className={`relative inline-block px-3 py-1 font-semibold ${
                              launch.launch_success
                                ? "text-green-700"
                                : launch.upcoming
                                ? "text-yellow-700"
                                : "text-red-700"
                            }  leading-tight`}
                          >
                            <span
                              aria-hidden
                              className={`absolute inset-0 ${
                                launch.launch_success
                                  ? "bg-green-200"
                                  : launch.upcoming
                                  ? "bg-yellow-200"
                                  : "bg-red-200"
                              }  opacity-50 rounded-full`}
                            />
                            <span className="relative capitalize ">
                              {launch.launch_success
                                ? "success"
                                : launch.upcoming
                                ? "upcoming"
                                : "failed"}
                            </span>
                          </span>
                        </td>
                        <td className="td">
                          <p className="table-data-text">
                            {launch.rocket.rocket_name}
                          </p>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <Pagination
              launchesPerPage={launchesPerPage}
              totalLaunches={launches.length}
              paginate={paginate}
              currentLaunches={currentLaunches}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LaunchesList;
