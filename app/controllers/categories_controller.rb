# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category, only: %i[destroy update]

  def index
    @categories = Category.all
  end

  def create
    category = Category.new(category_params)
    if category.save
      render status: :ok, json: { notice: t("successfully_created", entity: "Category") }
    else
      error = category.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  def update
    if @category.update(category_params)
      render status: :ok, json: { notice: t("successfully_updated", entity: "Category") }
    else
      render status: :unprocessable_entity,
        json: { error: @category.errors.full_messages.to_sentence }
    end
  end

  def destroy
    if @category.destroy
      render status: :ok, json: { notice: t("successfully_deleted", entity: "Category") }
    else
      render status: :unprocessable_entity,
        json: { error: @category.errors.full_messages.to_sentence }
    end
  end

  private

    def category_params
      params.require(:category).permit(:name, :sequence)
    end

    def load_category
      @category = Category.find_by(id: params[:id])
      unless @category
        render status: :not_found, json: { error: t("category.not_found") }
      end
    end
end
