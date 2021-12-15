# frozen_string_literal: true

class Public::SessionsController < ApplicationController
  before_action :load_site_setting, only: %i[create]

  def create
    unless @site_setting.authenticate(login_params[:password])

      render status: :unauthorized, json: { error: "Incorrect credentials, try again." }
    end
  end

  private

    def login_params
      params.require(:login).permit(:password)
    end
end
