# frozen_string_literal: true

class CreateRedirection < ActiveRecord::Migration[6.1]
  def change
    create_table :redirections do |t|
      t.string :from_path, null: false, index: { unique: true }
      t.string :to_path, null: false
      t.timestamps
    end
  end
end
