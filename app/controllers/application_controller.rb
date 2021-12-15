# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def load_site_setting
    @site_setting = SiteSetting.first

    unless @site_setting
      render status: :not_found, json: { error: t("not_found", entity: "Site Settings") }
    end
  end

  def authenticate_user_using_x_auth_token
    load_site_setting
    if @site_setting.password_digest.present?

      auth_token = request.headers["X-Auth-Token"].presence

      unless auth_token && ActiveSupport::SecurityUtils.secure_compare(
        @site_setting.authentication_token, auth_token
      )

        site_setting = { site_name: @site_setting.site_name }

        render status: :unauthorized, json: {
          error: t("session.incorrect_credentials"), site_setting: site_setting
        }
      end
    end
  end
end
