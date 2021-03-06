class CreateProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :projects do |t|
      t.string :name
      t.date :started
      t.date :deadline
      t.text :description
      t.integer :developer_id

      t.timestamps
    end
  end
end
