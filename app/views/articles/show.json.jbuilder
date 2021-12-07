# frozen_string_literal: true

json.published_count @articles.published.count
json.draft_count @articles.draft.count
json.article_count @articles.count
