Rails.application.routes.draw do
  get '/app', to: 'homepage#index'
  get '/app/*path', to: 'homepage#index'
  resources :users, only: [:new, :create, :show, :index]
  
  resources :notifications

  # get 'users/recieved_notifications', to: "users#recieved_notifications"
  # get 'users/sent_notifications', to: "users#sent_notifications"

  get '/session/login', to: "sessions#login"
  post '/session/login', to: "sessions#create"
  post '/session/logout', to: "sessions#destroy"
  get '/session/logout', to: "sessions#destroy"

end
