class Table < ApplicationRecord
  belongs_to :restaurant
  has_many :reservations, dependent: :destroy

  validates :table_number, presence: true
  validates :seats, numericality: { greater_than: 0 }
end
