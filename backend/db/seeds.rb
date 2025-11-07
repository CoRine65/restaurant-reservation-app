# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
# db/seeds.rb

# db/seeds.rb

# Clear existing data (optional)
Reservation.destroy_all
Table.destroy_all
User.destroy_all
Restaurant.destroy_all

# Create a restaurant
restaurant = Restaurant.create!(
  name: "Emberwood Dining",
  address: "123 Firelight Lane"
)


# Create some users
users = User.create!([
  { name: "Alice", email: "alice@example.com", password: "password" },
  { name: "Bob", email: "bob@example.com", password: "password" },
  { name: "Catherine", email: "catherine@example.com", password: "password" }
])

# Create some tables
tables = Table.create!([
  { table_number: 1, seats: 2, restaurant: restaurant },
  { table_number: 2, seats: 4, restaurant: restaurant },
  { table_number: 3, seats: 6, restaurant: restaurant }
])

puts "Seeded #{Restaurant.count} restaurant, #{User.count} users, #{Table.count} tables."
