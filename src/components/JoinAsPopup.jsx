import React, { useState, useEffect } from "react";
import "../css/JoinAsPopup.css";

const JoinAsPopup = ({ socket, setJoinAs }) => {
  // const [Joined_as, setJoined_as] = useState("");
  const [Driver_pass, setDriver_pass] = useState("");
  const [IfPassWrong, setIfPassWrong] = useState("Enter your password");

  const handleInputChange = event => {
    setDriver_pass(event.target.value);
  };

  const onButtonClick = clickedOn => {
    // console.log("onButtonClick", clickedOn);
    if (clickedOn === "student") {
      setJoinAs("student");
    } else if (Driver_pass) {
      const data = {
        socketID: socket.id,
        password: Driver_pass
      };
      socket.emit("checkDriverPass", data);
    }
  };

  useEffect(() => {
    socket.on("isDriverPassTrue", isTrue => {
      if (isTrue) {
        setJoinAs("driver");
        setIfPassWrong("Successful");
      } else {
        setIfPassWrong("Wrong password");
      }
    });
  }, [setJoinAs, socket]);

  return (
    <div className="join_as_box">
      <h1>JOIN AS</h1>
      <div className="join_popup">
        <button
          className="student_div"
          onClick={() => onButtonClick("student")}
        >
          student
        </button>
        <button className="driver_div" onClick={() => onButtonClick("driver")}>
          driver
          <div>
            <p>
              {IfPassWrong}
            </p>
            <input value={Driver_pass} onChange={handleInputChange} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default JoinAsPopup;
