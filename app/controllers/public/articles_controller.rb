# frozen_string_literal: true

class Public::ArticlesController < ApplicationController
  def show
    @article = Article.find_by_slug(params[:slug])

    unless @article
      render status: :not_found, json: { error: t("article.not_found") }
    end
  end
end
