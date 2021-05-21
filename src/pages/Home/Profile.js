import React from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import api from "../../api";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();
  React.useEffect(() => {
    const getUser = async () => {
      const result = await api.getUser(id);
      const json = await result.json();
      console.log(json);
      if (!result.ok || !json.user) {
        navigate("/");
        return;
      }
      setUser(json);
    };
    getUser();
  }, [id]);
  return <div>a</div>;
};

export default Profile;
