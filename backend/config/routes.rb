Rails.application.routes.draw do
  resources :projects
  
  resources :developers, only: [:index, :show] do
    resources :projects
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
