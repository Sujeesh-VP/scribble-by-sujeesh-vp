import React, { useState, useEffect } from "react";

import siteSettingsApi from "../../apis/siteSettings";

const SettingsProvider = props => {
  const [loading, setLoading] = useState(true);
  const [passwordPresent, setPasswordPresent] = useState("");

  const fetchSiteSettings = async () => {
    try {
      const response = await siteSettingsApi.show();
      setPasswordPresent(response.data.password_present);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteSettings();
  }, []);

  if (loading) {
    return <div className="w-screen h-screen"></div>;
  }

  return (
    <SettingsContext.Provider value={{ passwordPresent }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
export const SettingsContext = React.createContext();
