class CreateSubjects < ActiveRecord::Migration[7.0]
  def change
    create_table :subjects do |t|
      t.string :name
      t.string :slug
      t.references :category, null: false, foreign_key: true
      t.integer :difficulty
      t.integer :obi_frequency
      t.integer :icpc_frequency
      t.integer :position
      t.boolean :is_public

      t.timestamps
    end
  end
end
