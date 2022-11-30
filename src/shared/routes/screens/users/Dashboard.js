import React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import AccountList from "../../../../components/client-screens/AccountList";
import Header from "../../../../components/client-screens/Header";
import Nav from "../../../../components/client-screens/Nav";

const Dashboard = () => {
  const [params] = useSearchParams();
  console.log("params: ", params.get("session_id"));
  const { user } = useSelector((state) => state.authReducer);
  // console.log("user", user);
  return (
    <>
      <Nav />
      <div className="mt-[70]">
        <Header>My Account</Header>
        <div className="container mt-[40px]">
          <div className="flex flex-wrap -mx-6">
            <div className="w-full md:w-4/12 p-6">
              <AccountList />
            </div>
            <div className="w-full md:w-8/12 p-6">
              <h1 className="heading text-gray-600">
                Hello{" "}
                <span className="font-medium text-gray-800">{user?.name}</span>{" "}
                , Great to see you here ...
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
