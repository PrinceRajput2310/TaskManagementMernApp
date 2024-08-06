import React from "react";
import "../index.css";
import Header from "./Header";

export default function Profile() {
  return (
    <div>
      <Header />
      <div className="container" style={{ marginTop: "2rem" }}>
        <h2>My Profile</h2>
        <hr />
        <div className="row">
          <div className="col-md-3">
            <div className="text-center">
              <img
                src="https://png.pngitem.com/pimgs/s/150-1503945_transparent-user-png-default-user-image-png-png.png"
                className="avatar img-circle"
                alt="avatar"
              />
              <h6>Upload a different photo...</h6>

              <input type="file" className="form-control" />
            </div>
          </div>

          <div className="col-md-9 personal-info">
            {/* <div class="alert alert-info alert-dismissable">
              <a class="panel-close close" data-dismiss="alert">
                ×
              </a>
              <i class="fa fa-coffee"></i>
              This is an <strong>.alert</strong>. Use this to show important
              messages to the user.
            </div> */}
            <h3>Personal info</h3>

            <form className="form-horizontal">
              <div className="form-group">
                <label className="col-md-3 control-label">User Name:</label>
                <div className="col-md-8">
                  <input className="form-control" type="text" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-lg-3 control-label">Email:</label>
                <div className="col-lg-8">
                  <input className="form-control" type="text" />
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-3 control-label">Phone Number:</label>
                <div className="col-md-8">
                  <input className="form-control" type="password" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-3 control-label">Date of Birth:</label>
                <div className="col-md-8">
                  <input className="form-control" type="password" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-3 control-label">Place:</label>
                <div className="col-md-8">
                  <input className="form-control" type="text" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-3 control-label"></label>
                <div className="col-md-8">
                  <input
                    type="button"
                    className="btn btn-primary"
                    value="Save Changes"
                  />
                  <span></span>
                  <input
                    type="reset"
                    className="btn btn-default"
                    value="Cancel"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
