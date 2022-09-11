class Category < ApplicationRecord  
  extend FriendlyId
  friendly_id :name, use: :slugged
  
  validates :name, :slug, :position, presence: true
  validates :slug, uniqueness: true

  has_many :subjects
end
