import React, { useState, useEffect } from "react";

import { Check, Close } from "@bigbinary/neeto-icons";
import {
  Typography,
  Input,
  Checkbox,
  Button,
  Label,
} from "@bigbinary/neetoui/v2";

import siteSettingsApi from "../../../apis/siteSettings";

const GeneralPage = () => {
  const [loading, setLoading] = useState(true);
  const [passwordPresent, setPasswordPresent] = useState("");
  const [isPassword, setIsPassword] = useState(true);
  const [password, setPassword] = useState("");
  const [siteName, setSiteName] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);

  const lengthRegex = /^\S{6,}$/;
  const patternRegex = /^(?=.*\d)(?=.*[a-zA-Z])/;

  const icons = {
    valid: <Check color="green" size={20} />,
    invalid: <Close color="red" size={20} />,
  };

  const fetchSiteSettings = async () => {
    try {
      const response = await siteSettingsApi.show();
      const { site_name, password_present } = response.data;
      setSiteName(site_name);
      setIsPassword(password_present);
      setPasswordPresent(password_present);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handlePassword = async () => {
    setLoading(true);
    const values = isPassword
      ? { site_name: siteName, password: password }
      : { site_name: siteName };
    try {
      await siteSettingsApi.update({
        payload: { site_setting: values },
      });
      await fetchSiteSettings();
      setPassword("");
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setLoading(true);
    fetchSiteSettings();
    setPassword("");
  };

  const handleChange = value => {
    setPassword(value);
    const validated = lengthRegex.test(value) && patternRegex.test(value);
    setPasswordValid(validated);
  };

  useEffect(() => {
    fetchSiteSettings();
  }, []);

  if (loading) {
    return <div className="w-screen h-screen"></div>;
  }

  return (
    <div className=" flex flex-col items-center pt-4">
      <div className="w-1/2">
        <div className="border-b-2">
          <Typography style="h1">General Settings</Typography>
          <Typography style="body1" className="neeto-ui-text-gray-500 pb-6">
            Configure general attributes of scribble
          </Typography>
          <Input
            label="Site Name"
            required
            value={siteName}
            onChange={e => setSiteName(e.target.value)}
            error={siteName.trim().length === 0 && "Please enter site name"}
          />
          <Typography style="body2" className="neeto-ui-text-gray-500">
            Customize the site name which is used to show the site name in
          </Typography>
          <Typography style="body2" className="neeto-ui-text-gray-700 pb-4">
            Open Graph Tags
          </Typography>
        </div>
        <Checkbox
          label="Password Protect Knowledge Base"
          className="py-4"
          onClick={() => setIsPassword(!isPassword)}
          defaultChecked={passwordPresent && isPassword}
        />
        {isPassword && !passwordPresent && (
          <div className="pb-4">
            <Input
              label="Password"
              type="password"
              className="pb-2 w-1/2"
              required
              onChange={e => handleChange(e.target.value)}
              value={password}
            />

            <Label className="pb-2">
              {lengthRegex.test(password) ? icons.valid : icons.invalid}
              Have at least 6 characters
            </Label>
            <Label>
              {patternRegex.test(password) ? icons.valid : icons.invalid}
              Include at least 1 letter and 1 number
            </Label>
          </div>
        )}
        <div className="flex">
          <Button
            label="Save Changes"
            style="secondary"
            className="neeto-ui-bg-secondary-indigo neeto-ui-text-white"
            onClick={() => handlePassword()}
            disabled={
              (!passwordValid && !passwordPresent && isPassword) ||
              siteName.trim().length === 0
            }
          />
          <Button label="Cancel" style="text" onClick={() => handleReset()} />
        </div>
      </div>
    </div>
  );
};

export default GeneralPage;
