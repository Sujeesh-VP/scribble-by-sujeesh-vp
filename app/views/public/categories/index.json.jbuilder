# frozen_string_literal: true
json.categories @categories do |category|
  json.extract! category,
    :name

  json.articles category.articles do |article|
    if article.published?
      json.extract! article,
        :id,
        :title,
        :slug
    end
end
end
