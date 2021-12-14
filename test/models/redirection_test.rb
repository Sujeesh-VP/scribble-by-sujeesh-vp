# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @redirection = Redirection.new(from_path: "https://scribble.com/welcome", to_path: "https://scribble.com")
  end

  def test_redirection_should_be_valid
    assert @redirection.valid?
  end

  def test_redirection_should_be_invalid_without_from_path
    @redirection.from_path = ""
    assert @redirection.invalid?
    assert_includes @redirection.errors.full_messages, "From path can't be blank"
  end

  def test_redirection_should_be_invalid_without_to_path
    @redirection.to_path = ""
    assert @redirection.invalid?
    assert_includes @redirection.errors.full_messages, "To path can't be blank"
  end

  def test_redirection_from_path_should_not_exceed_maximum_length
    @redirection.from_path = "a" * (Constants::MAX_FROM_PATH_LENGTH + 1)
    assert @redirection.invalid?
    assert_includes @redirection.errors.full_messages, "From path is too long (maximum is 200 characters)"
  end

  def test_redirection_to_path_should_not_exceed_maximum_length
    @redirection.to_path = "a" * (Constants::MAX_TO_PATH_LENGTH + 1)
    assert @redirection.invalid?
    assert_includes @redirection.errors.full_messages, "To path is too long (maximum is 200 characters)"
  end

  def test_redirection_should_not_be_valid_and_saved_if_from_path_is_not_unique
    @redirection.save!
    test_redirection = @redirection.dup
    assert_not test_redirection.valid?
    assert_includes test_redirection.errors.full_messages, "From path has already been taken"
  end
end
