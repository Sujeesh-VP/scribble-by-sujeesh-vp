# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article, only: %i[destroy]
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

  def destroy
    if @article.destroy
      render status: :ok, json: { notice: "Successfully deleted article." }
    else
      render status: :unprocessable_entity,
        json: { error: @article.errors.full_messages.to_sentence }
    end
  end

  private

    def article_params
      params.require(:article).permit(:title, :content, :status, :category_id)
    end

    def load_article
      @article = Article.find_by(id: params[:id])
      unless @article
        render status: :not_found, json: { error: "article not found" }
      end
    end
end
