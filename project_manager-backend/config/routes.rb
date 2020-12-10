Rails.application.routes.draw do
  resources :projects, only: [:show, :index]
  resources :developers

  root 'developers#show'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
