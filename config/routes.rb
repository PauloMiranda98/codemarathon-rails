Rails.application.routes.draw do
  root 'home#index'

  resources :categories, path: 'conteudos', only: [:index, :show] do 
    get ':id', to: 'subjects#show', as: :subject
  end
end
