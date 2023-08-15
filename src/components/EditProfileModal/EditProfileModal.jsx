import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useUsers } from "../../contexts/UserContext";
import Modal from "react-modal";

import "./EditProfileModal.css";

export const EditProfileModal = ({ setModalOpen, modalOpen }) => {
  const { loggedInUser } = useAuth();
  const { editUser } = useUsers();

  const [userDetails, setUserDetails] = useState({
    profileAvatar: loggedInUser.profileAvatar,
    bio: loggedInUser.bio,
    website: loggedInUser.website,
  });

  const avatars = [
    "https://cdn.vectorstock.com/i/preview-1x/41/11/flat-business-woman-user-profile-avatar-icon-vector-4334111.jpg",
    "https://cdn.vectorstock.com/i/preview-1x/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg",
    "https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg",
    "https://static.vecteezy.com/system/resources/previews/004/819/322/non_2x/female-avatar-woman-profile-icon-for-network-vector.jpg",
    "https://static.vecteezy.com/system/resources/previews/004/819/318/non_2x/blond-woman-avatar-profile-icon-of-smiling-girl-vector.jpg",
  ];

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveHabit = () => {
    editUser(userDetails);
    setModalOpen(false);
  };

  const popupContent = (
    <div className="pop-up">
      <h3>Edit Profile</h3>
      {/* {!isFieldsValid() && <p>Please fill all the fields</p>} */}

      <div>
        <p>Avatar</p>
        <img className="avatar" src={userDetails.profileAvatar} />
        <div>
          {avatars.map((avatar, index) => (
            <img
              key={index}
              className="avatar-select"
              src={avatar}
              onClick={(e) =>
                setUserDetails({ ...userDetails, profileAvatar: e.target.src })
              }
            />
          ))}
        </div>
      </div>

      <label htmlFor="bio">Bio</label>
      <input
        id="bio"
        name="bio"
        className="input"
        type="text"
        value={userDetails.bio}
        placeholder="Bio"
        onChange={(e) =>
          setUserDetails({ ...userDetails, bio: e.target.value })
        }
      />

      <label htmlFor="website">Website</label>
      <input
        id="website"
        name="website"
        className="input"
        type="text"
        value={userDetails.website}
        placeholder="Website"
        onChange={(e) =>
          setUserDetails({ ...userDetails, website: e.target.value })
        }
      />
      <div>
        <button className="pop-up-btn" onClick={() => handleSaveHabit()}>
          Save
        </button>
        <button className="pop-up-btn" onClick={() => handleCloseModal()}>
          Discard
        </button>
      </div>
    </div>
  );

  return (
    <Modal
      ariaHideApp={false}
      className="pop-up-container"
      isOpen={modalOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Edit Profile"
    >
      {popupContent}
    </Modal>
  );
};
