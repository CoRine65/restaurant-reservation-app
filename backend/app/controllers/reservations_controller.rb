class ReservationsController < ApplicationController
  before_action :set_reservation, only: [:show, :update, :destroy]

  def index
    reservations = if params[:date].present?
      Reservation.where("DATE(reservation_time) = ?", params[:date])
      else
        Reservation.all
      end
  render json: reservations.map { |r|
    {
      id: r.id,
      date: r.reservation_time.strftime("%Y-%m-%d"),
      time: r.reservation_time.strftime("%-l:%M %p"),
      name: r.user.name
    }
  }
  end

  def show
    render json: @reservation
  end

  def create
    reservation = Reservation.new(reservation_params)

  if reservation.save
    render json: {
      id: reservation.id,
      date: reservation.reservation_time.strftime("%Y-%m-%d"),
      time: reservation.reservation_time.strftime("%-l:%M %p"),
      name: reservation.user.name
    }, status: :created
  else
    render json: { errors: reservation.errors.full_messages }, status: :unprocessable_entity
  end
  end

  def update
    if @reservation.update(reservation_params)
      render json: @reservation
    else
      render json: { errors: @reservation.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @reservation.destroy
    head :no_content
  end

  private

  def set_reservation
    @reservation = Reservation.find(params[:id])
  end

  def reservation_params
    params.require(:reservation).permit(:reservation_time, :user_id, :table_id)
  end
end
