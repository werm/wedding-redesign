Rails.application.routes.draw do

  mount Bootsy::Engine => '/bootsy', as: 'bootsy'
  resources :stories

  devise_for :users
  root to: "home#index"
end
