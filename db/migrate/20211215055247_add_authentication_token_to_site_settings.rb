# frozen_string_literal: true

class AddAuthenticationTokenToSiteSettings < ActiveRecord::Migration[6.1]
  def change
    add_column :site_settings, :authentication_token, :string
  end
end
