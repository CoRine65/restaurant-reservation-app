class Restaurant < ApplicationRecord
  has_many :tables, dependent: :destroy
  has_many :reservations, through: :tables

  validates :name, presence: true
  validates :address, presence: true

end
