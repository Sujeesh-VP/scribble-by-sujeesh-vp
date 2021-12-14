# frozen_string_literal: true

class Redirection < ApplicationRecord
  VALID_PATH_REGEX = /\A(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?\Z/i.freeze

  validates :from_path, presence: true, uniqueness: true, length: { maximum: Constants::MAX_FROM_PATH_LENGTH },
format: { with: VALID_PATH_REGEX }
  validates :to_path, presence: true, length: { maximum: Constants::MAX_TO_PATH_LENGTH },
format: { with: VALID_PATH_REGEX }
end
