# frozen_string_literal: true

  json.extract! @article,
    :title,
    :content
  json.date @article.updated_at.to_date.to_s(:long)
  json.name @article.category.name
