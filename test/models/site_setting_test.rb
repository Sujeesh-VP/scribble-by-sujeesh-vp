# frozen_string_literal: true

require "test_helper"

class SiteSettingTest < ActiveSupport::TestCase
  def setup
    @site_setting = SiteSetting.new(site_name: "Spinkart", password: "welcome123")
  end

  def test_site_setting_should_not_be_valid_and_saved_without_site_name
    @site_setting.site_name = ""
    assert_not @site_setting.valid?
    assert_includes @site_setting.errors.full_messages, "Site name can't be blank"
  end

  def test_site_name_should_be_of_valid_length
    @site_setting.site_name = "a" * (Constants::MAX_SITE_NAME_LENGTH + 1)
    assert @site_setting.invalid?
  end

  def test_password_should_be_of_valid_length
    @site_setting.password = "a" * (Constants::MIN_PASSWORD_LENGTH - 1)
    assert_not @site_setting.valid?
    assert_includes @site_setting.errors.full_messages, "Password is too short (minimum is 6 characters)"
  end

  def test_password_should_not_be_valid_without_a_letter
    @site_setting.password = "123456"
    assert_not @site_setting.valid?
    assert_includes @site_setting.errors.full_messages, "Password is invalid"
  end

  def test_password_should_not_be_valid_without_a_number
    @site_setting.password = "welcome"
    assert_not @site_setting.valid?
    assert_includes @site_setting.errors.full_messages, "Password is invalid"
  end
end
