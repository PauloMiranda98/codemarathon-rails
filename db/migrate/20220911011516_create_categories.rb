class CreateCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :categories do |t|
      t.string :name
      t.string :slug
      t.integer :position
      t.text :image_data

      t.timestamps
    end
  end
end
