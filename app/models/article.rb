# frozen_string_literal: true

class Article < ApplicationRecord
  enum status: { draft: 0, published: 1 }
  belongs_to :category
  validate :slug_not_changed
  before_create :set_slug

  validates :title, presence: true, length: { maximum: Constants::MAX_TITLE_LENGTH }
  validates :content, presence: true, length: { maximum: Constants::MAX_CONTENT_LENGTH }
  validates :status, presence: true
  validates :slug, uniqueness: true

  private

    def set_slug
      itr = 1
      loop do
        title_slug = title.parameterize
        slug_candidate = itr > 1 ? "#{title_slug}-#{itr}" : title_slug
        break self.slug = slug_candidate unless Article.exists?(slug: slug_candidate)

        itr += 1
      end
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, t("article.slug.immutable"))
      end
    end
end
