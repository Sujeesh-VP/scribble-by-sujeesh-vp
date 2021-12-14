# frozen_string_literal: true

json.articles @articles do |article|
  json.extract! article,
    :id,
    :title,
    :content,
    :author
  json.date article.created_at.to_date.to_s(:long)
  json.status article.status
  json.name article&.category&.name


end
