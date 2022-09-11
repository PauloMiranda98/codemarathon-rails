Rails.application.routes.draw do
  root 'home#index'

  resources :contents, only: [:index, :show]
end
