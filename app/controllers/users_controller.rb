class UsersController < ApplicationController

    # skip_before_action :require_login, only: [:new, :create]
    protect_from_forgery with: :null_session

    def authenticate
    end

    def show
        @user = User.find(params[:id])
        render json: @user.to_json(:include => [:recipients, :senders])
    end

    def index
        @users = User.all
        render json: @users
    end

    def new
        @user = User.new
        render json: @user
    end

    def create
        @user = User.create(user_params)
        if @user.save
            session[:user_id] = @user.id
            render json: @user
        else
            render :new
        end
    end

    def sent_notifications
        render json: Notification.where(sender: @user.id).last(10)
    end

    def recieved_notifications
        render json: Notification.where(recipient: @user.id).last(10)
    end

    private
    def user_params
        params.require(:user).permit(:email, :password)
    end
end
