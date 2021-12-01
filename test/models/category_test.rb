# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = Category.new(name: "Getting Started, Misc")
  end

  def test_category_should_be_valid
    assert @category.valid?
  end

  def test_category_should_be_invalid_without_name
    @category.name = ""
    assert @category.invalid?
  end

  def test_category_name_should_not_exceed_maximum_length
    @category.name = "a" * (Constants::MAX_NAME_LENGTH + 1)
    assert @category.invalid?
  end

  def test_valid_category_should_be_saved
    assert_difference "Category.count" do
      @category.save
    end
  end
end
