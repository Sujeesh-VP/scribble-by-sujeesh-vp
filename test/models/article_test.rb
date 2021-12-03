# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @category = Category.new(name: "Getting Started, Misc")
    @article = Article.new(
      title: "Setting up an account in Scribble",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus justo et nunc posuere,
                id eleifend tortor dictum. Duis sagittis, ipsum sed ultricies blandit, tortor lacus fringilla ipsum,
                non iaculis justo massa tincidunt augue. Nam ac elit augue.",
      category_id: @category
      )
  end

  def test_article_should_be_invalid_without_title
    @article.title = ""
    assert @article.invalid?
  end

  def test_article_should_be_invalid_without_content
    @article.content = ""
    assert @article.invalid?
  end

  def test_article_title_should_not_exceed_maximum_length
    @article.title = "a" * (Constants::MAX_TITLE_LENGTH + 1)
    assert @article.invalid?
  end

  def test_article_content_should_not_exceed_maximum_length
    @article.content = "a" * (Constants::MAX_CONTENT_LENGTH + 1)
    assert @article.invalid?
  end

  def test_article_should_not_be_valid_without_category
    @article.category_id = nil
    assert @article.invalid?
  end

  def test_article_should_not_be_valid_and_saved_without_status
    @article.status = ""
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Status can't be blank"
  end

  def test_article_should_have_valid_status
    @article.status = "published"
    assert @article.valid?
  end
end
