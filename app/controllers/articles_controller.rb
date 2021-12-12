# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article, only: %i[destroy update]
  def index
    @articles = Article.all
  end

  def show
    @articles = Article.all
  end

  def create
    article = Article.new(article_params)
    if article.save
      render status: :ok, json: { notice: t("successfully_created", entity: "Article") }
    else
      render status: :unprocessable_entity,
        json: { error: article.errors.full_messages.to_sentence }
    end
  end

  def update
    if @article.update(article_params)
      render status: :ok, json: { notice: t("successfully_updated", entity: "Article") }
    else
      render status: :unprocessable_entity,
        json: { error: @article.errors.full_messages.to_sentence }
    end
  end

  def destroy
    if @article.destroy
      render status: :ok, json: { notice: t("successfully_deleted", entity: "Article") }
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
        render status: :not_found, json: { error: t("article.not_found") }
      end
    end
end
