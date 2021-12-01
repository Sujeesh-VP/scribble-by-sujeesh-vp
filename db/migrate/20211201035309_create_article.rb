# frozen_string_literal: true

class CreateArticle < ActiveRecord::Migration[6.1]
  def change
    create_table :articles do |t|
      t.string :title, null: false
      t.text :content, null: false
      t.string :author, default: "Oliver Smith"
      t.integer "status", default: 0, null: false
      t.references :category, foreign_key: true
      t.timestamps
    end
  end
end
