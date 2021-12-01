# frozen_string_literal: true

class Category < ApplicationRecord
  validates :name, presence: true, length: { maximum: Constants::MAX_NAME_LENGTH }

  has_many :articles, dependent: :nullify
end
