import React, { useState } from "react";

import { Typography, Input, Button, PageLoader } from "@bigbinary/neetoui/v2";

import authApi from "../../apis/auth";
import { setAuthHeaders } from "../../apis/axios";
import { setToLocalStorage } from "../../helpers/storage";

const Authentication = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await authApi.login({ login: { password } });
      setToLocalStorage({
        authToken: response.data.authentication_token,
        site_name: response.data.site_name,
      });
      setAuthHeaders();
      window.location.href = "/welcome";
    } catch (error) {
      logger.error(error);

      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto self-center w-1/3 pt-32">
      <div className="w-1/3 flex mx-auto">
        <img src="/Images/Vector.png" className="py-4 justify-center" />
      </div>

      <Typography style="h2" className="pt-4">
        Spinkart is password protected!
      </Typography>
      <Typography style="body1" className="neeto-ui-text-gray-500 pb-4">
        Enter the password to gain access to spinkart.
      </Typography>

      <Input
        label="Password"
        className="pb-4"
        type="password"
        onChange={e => setPassword(e.target.value)}
        error={password.trim().length === 0 && "Please enter password"}
      />
      <Button
        label="Continue"
        className="neeto-ui-bg-secondary-indigo"
        onClick={() => handleSubmit()}
      />
    </div>
  );
};

export default Authentication;
