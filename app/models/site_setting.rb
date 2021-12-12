# frozen_string_literal: true

class SiteSetting < ApplicationRecord
  VALID_PASSWORD_REGEX = /(?=.*\d)(?=.*[A-zAz])/i.freeze

  validates :site_name, presence: true, length: { maximum: Constants::MAX_SITE_NAME_LENGTH }
  validates :password, length: { minimum: Constants::MIN_PASSWORD_LENGTH },
                        format: { with: VALID_PASSWORD_REGEX }, if: -> { password.present? }

  has_secure_password :password, validations: false

  def setPasswordAsNil
    self.password = nil
  end
end
