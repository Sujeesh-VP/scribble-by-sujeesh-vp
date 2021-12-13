# frozen_string_literal: true

class Category < ApplicationRecord
  acts_as_list column: :sequence
  default_scope { order(sequence: :asc) }
  validates :name, presence: true, length: { maximum: Constants::MAX_NAME_LENGTH }

  has_many :articles, dependent: :nullify
end
