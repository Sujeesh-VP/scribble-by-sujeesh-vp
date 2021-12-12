# frozen_string_literal: true

json.extract! @site_setting,
  :site_name
password_present = @site_setting.password_digest != nil
json.password_present password_present
