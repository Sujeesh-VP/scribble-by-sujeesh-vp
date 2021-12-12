# frozen_string_literal: true

class CreateSiteSettings < ActiveRecord::Migration[6.1]
  def change
    create_table :site_settings do |t|
      t.string :site_name, null: false
      t.string :password_digest
      t.timestamps
    end
  end
end
