# frozen_string_literal: true

Rails.application.routes.draw do
  root "home#index"

  resources :categories, path: "conteudos", only: [:index, :show] do
    get ":id", to: "subjects#show", as: :subject
  end

  resources :upsolving_codeforces, only: [:index]

  get "sobre", to: "about#index", as: :about
end
