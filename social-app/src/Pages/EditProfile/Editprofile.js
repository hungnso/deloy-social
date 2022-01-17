import React from "react";
import FriendsLayout from "../../Components/Layout/FriendsLayout";
import RightLargeSidebarLayout from "../../Components/Layout/RightLargeSidebarLayout";
import useAuth from "../../hooks/useAuth";
import request from "../../Api/request";
import ProfileItemEdit from "../../Components/ProfileItemEdit/ProfileItemEdit";
import * as Icon from "react-feather";
import { Button } from "react-bootstrap";
import RightLargeFriends from "../../Components/Layout/RightLargeFriends";

export default function EditProfile() {
  const useMe = useAuth();
  const [profile, setProfile] = React.useState({});
  const [userMe, setUserMe] = React.useState({});
  const [image, setImage] = React.useState();
  const [showAvata, setShowAvata] = React.useState(false);
  const [fileAvata, setFileAvata] = React.useState();

  const fetchProfile = async () => {
    const res = await request({
      url: `/profile/${useMe._id}`,
      method: "GET",
    });
    setProfile(res.data);
  };

  const fetchUser = async () => {
    const res = await request({
      url: "/auth",
      method: "GET",
    });
    setUserMe(res.data);
    setImage(res.data.avatar);
  };

  React.useEffect(() => {
    fetchProfile();
    fetchUser();
  }, [useMe]);

  const handleSubmitData = async (data) => {
    const res = await request({
      url: "/profile",
      method: "PUT",
      data,
    });
    console.log(res);
    setProfile(res.data);
  };

  const handleSubmitUserName = async (data) => {
    const res = await request({
      url: "/auth/update",
      method: "PUT",
      data,
    });
    setUserMe(res.data);
  };

  React.useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image);
    };
  }, [image]);

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    const urlImage = URL.createObjectURL(file);
    // file.preview =
    setImage(urlImage);
    setShowAvata(true);
    setFileAvata(file);
    e.target.value = null;
  };

  const handleSubmit = async () => {
    let bodyFormData = new FormData();
    bodyFormData.append("file", fileAvata);
    const res = await request({
      url: "/upload",
      method: "POST",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data) {
      const newAvatar = {
        avatar: res.data,
      };
      await handleSubmitUserName(newAvatar);
      alert("Change Successfully");
    }
  };

  return (
    <FriendsLayout>
      <RightLargeFriends>
        <div className="text-center my-2">
          <h4>Edit Profile</h4>
        </div>
        <div
          className="flex-grow-1 overflow-auto"
          style={{ backgroundColor: "#fff" }}
        >
          <div className="mb-2">
            <div className="text-center ">
              <span className="position-relative">
                <img
                  className="rounded-circle border border-white"
                  style={{
                    width: "250px",
                    height: "250px",
                    objectFit: "cover",
                  }}
                  src={image}
                  alt="avatar"
                />
                <div
                  className="text-center position-absolute p-2 rounded-circle bg-primary d-flex justify-content-center align-items-center"
                  style={{
                    top: "100px",
                    left: "180px",
                  }}
                >
                  <label
                    htmlFor="uploadAvatar"
                    className="text-white"
                    style={{ cursor: "pointer" }}
                  >
                    <Icon.Camera />
                  </label>
                  <input
                    id="uploadAvatar"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleChangeFile}
                  />
                </div>
              </span>
            </div>
            {showAvata && (
              <div className="text-center mt-3">
                <Button variant="primary" size="sm" onClick={handleSubmit}>
                  Save Changes
                </Button>
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => {
                    setShowAvata(false);
                    fetchUser();
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
          <div>
            <ProfileItemEdit
              title="UserName"
              content={userMe.username}
              rule="username"
              handleSubmitData={handleSubmitUserName}
            />
          </div>
          <div>
            <ProfileItemEdit
              title="PassWord"
              rule="password"
              handleSubmitData={handleSubmitData}
            />
          </div>
          <div>
            <ProfileItemEdit
              title="Address"
              content={profile.address}
              rule="address"
              handleSubmitData={handleSubmitData}
            />
          </div>
          <div>
            <ProfileItemEdit
              title="BirthDay"
              content={profile.birthDay}
              rule="birthDay"
              type="date"
              handleSubmitData={handleSubmitData}
            />
          </div>
          <div>
            <ProfileItemEdit
              title="Gender"
              content={profile.gender}
              rule="gender"
              handleSubmitData={handleSubmitData}
            />
          </div>
          <div>
            <ProfileItemEdit
              title="Mobile"
              content={profile.mobile}
              rule="mobile"
              type="number"
              handleSubmitData={handleSubmitData}
            />
          </div>
          <div>
            <ProfileItemEdit
              title="Story"
              content={profile.story}
              rule="story"
              handleSubmitData={handleSubmitData}
            />
          </div>
        </div>
      </RightLargeFriends>
    </FriendsLayout>
  );
}
