# frozen_string_literal: true

class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end

  def show
    @articles = Article.all
  end

  def create
    article = Article.new(article_params)
    if article.save
      render status: :ok, json: {}
    else
      render status: :unprocessable_entity,
        json: { error: article.errors.full_messages.to_sentence }
    end
  end

  private

    def article_params
      params.require(:article).permit(:title, :content, :status, :category_id)
    end
end
