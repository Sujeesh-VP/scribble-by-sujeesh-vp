# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  defaults format: :json do
    resources :articles, except: %i[new edit], param: :id
    resources :categories, except: %i[new edit], param: :id
    resource :site_settings, only: %i[show update]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all

end
