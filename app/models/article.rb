# frozen_string_literal: true

class Article < ApplicationRecord
  validates :title, presence: true, length: { maximum: Constants::MAX_TITLE_LENGTH }
  validates :content, presence: true, length: { maximum: Constants::MAX_CONTENT_LENGTH }
  validates :status, presence: true

  enum status: { draft: 0, published: 1 }
end
