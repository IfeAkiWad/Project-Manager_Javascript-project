class CreateProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :projects do |t|
      t.string :started
      t.string :deadline
      t.string :description
      t.string :completed

      t.timestamps
    end
  end
end
