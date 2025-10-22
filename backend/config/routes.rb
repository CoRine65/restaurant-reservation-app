Rails.application.routes.draw do
   devise_for :users, controllers: {
    sessions: 'users/sessions'
  }, defaults: { format: :json }

  resources :restaurants do
    resources :tables, only: [:index]
  end

  resources :tables, except: [:index] do
    resources :reservations, only: [:index]
  end

  resources :reservations
end
