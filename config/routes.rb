# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  defaults format: :json do
    resources :articles, except: %i[new edit], param: :id
    resources :categories, except: %i[new edit], param: :id
    resource :site_settings, only: %i[show update]
    resources :redirections, except: %i[new edit], param: :id
  end

  namespace :public do
    resources :categories, only: %i[index show], param: :slug
    resources :articles, only: %i[show], param: :slug
  end

  root "home#index"
  get "*path", to: "home#index", via: :all

end
