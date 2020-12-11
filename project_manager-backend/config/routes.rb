Rails.application.routes.draw do
  # resources :projects, only: [:show, :index]
  resources :developers, only: [:show, :index]

  resources :developers do
    # nested resource for reviews
    resources :projects
  end

  # get '/test', to: 'application#test'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
