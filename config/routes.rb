Rails.application.routes.draw do
  root 'home#index'

  resources :categories, path: 'conteudos', only: [:index, :show]
end
