class Subject < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged
  
  validates :name, :slug, :category, :difficulty, presence: true
  validates :slug, uniqueness: true

  belongs_to :category
end
