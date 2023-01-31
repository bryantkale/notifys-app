class SessionsController < ApplicationController

    # skip_before_action :require_login, only: [:new, :create]
    protect_from_forgery with: :null_session
    def new
    end

    def login
        @user = User.find_by(email: params[:email])
        render json: @user
    end

    def create
        @user = User.find_by(email: params[:username])
        if !!@user
            session[:user_id] = @user.id
            puts session
            render json: @user
        else
            redirect_to login_path
        end
    end

    def destroy
        session[:user_id] = nil
        redirect_to new_session_path
    end


end
