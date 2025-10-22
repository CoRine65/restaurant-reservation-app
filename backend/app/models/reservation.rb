class Reservation < ApplicationRecord
  belongs_to :user
  belongs_to :table

  validates :reservation_time, presence: true
end
