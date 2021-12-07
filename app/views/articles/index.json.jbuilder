# frozen_string_literal: true

json.articles @articles do |article|
  json.extract! article,
    :title,
    :content,
    :author
  json.date article.created_at.to_date.to_s(:long)
  json.status article.status
  json.extract! article.category,
    :name
end
