Rails.application.routes.draw do

  resources :biographies

  mount Bootsy::Engine => '/bootsy', as: 'bootsy'
  resources :stories

  devise_for :users
  root to: "home#index"
end
