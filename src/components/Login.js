import React, { useState } from "react";
import "../css/login.css";

export default function Login() {
  const [User_name, setUser_name] = useState("");
  const [Driver_pass, setDriver_pass] = useState("hiden");

  const handle_submit = e => {
    e.preventDefault();
  };

  const user_name_func = event => {
    setUser_name(event.target.value);
  };

  const driver_click = () => {
    User_name && setDriver_pass("");
  };

  return (
    <div className="user_form">
      <div className="heading">LOGIN</div>
      <form id="my_form" onSubmit={handle_submit}>
        <input
          type="text"
          name="user"
          placeholder="USERNAME"
          onChange={user_name_func}
          required
        />

        <div className="i_am_a_btn">
          <button className="student" type="btn" name="student">
            i am a student
          </button>
          <button
            className="driver"
            type="btn"
            name="driver"
            onClick={driver_click}
          >
            i am a bus driver
          </button>
        </div>
      </form>

      <div id="pass_popup" className={Driver_pass}>
        <form id="password">
          <input
            type="password"
            name="driver_password"
            placeholder="DRIVER PASSWORD"
            required
          />
          <button
            className="submit_pass"
            type="btn"
            name="driver_pass"
            onclick="()=>{login_func()}"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

//   function login_func() {
//     var form = document.getElementById("my_form");
//     var pass = document.getElementById("password");
//     var pass_popup = document.getElementById("pass_popup");
//     let password = "";
//     let sub_btn;

//     form.addEventListener("submit", function(event) {
//       event.preventDefault(); // prevent the form from submitting normally
//       var formData = new FormData(form); // create a new FormData object
//       var user = formData.get("user"); // get the value of the "user" field
//       var joinAs = formData.get("join_as_"); // get the value of the "join_as_" field

//       if (joinAs == "driver") {
//         pass_popup.style.bottom = "4px";
//         sub_btn = this;
//       } else {
//         this.submit();
//       }
//       document.cookie = "advn" + user + "split" + joinAs + "dvnb";
//     });

//     pass.addEventListener("submit", function(pass_event) {
//       pass_event.preventDefault();
//       var inp_pass = new FormData(pass);
//       password = inp_pass.get("driver_password");
//       if (password == "dvn") sub_btn.submit();
//       else alert("wrong password");
//     });
//   }

//   function ima_btn_click() {

//   }
