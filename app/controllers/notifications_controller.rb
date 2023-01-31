class NotificationsController < ApplicationController

  protect_from_forgery with: :null_session

  def index
    @notifications = Notification.all
    render json: @notifications
  end

  def show
    @notification = Notification.find(params[:id])
    render json: @notification
  end

  def new
    @notification = Notification.new
    render json: @notification
  end

  def create
    @sender = User.find(Integer(params[:sender]))
    @recipient = User.find(Integer(params[:recipient]))
    
    @notification = Notification.new(task: params[:task], sender: @sender, recipient: @recipient)
    if @notification.save
      render json: @notification
    else
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    @notification = Notification.find(params[:id])
    resp = @notification.destroy

    render json: resp
    # redirect_to root_path, status: :see_other
  end

  private
  def notification_params
    params.require(:notification).permit(:task, :recipient, :sender)
  end

end
