# frozen_string_literal: true

class SiteSettingsController < ApplicationController
  before_action :load_site_setting, only: %i[show update]

  def update
    if !site_setting_params[:password]
      @site_setting.setPasswordAsNil
    end
    if @site_setting.update(site_setting_params)
      render status: :ok, json: { notice: "successfully_updated" }
    else
      render status: :unprocessable_entity,
        json: { error: @site_setting.errors.full_messages.to_sentence }
    end
  end

  private

    def site_setting_params
      params.require(:site_setting).permit(:site_name, :password)
    end

    def load_site_setting
      @site_setting = SiteSetting.first
      unless @site_setting
        render status: :not_found, json: { error: "settings not found" }
      end
    end
end
