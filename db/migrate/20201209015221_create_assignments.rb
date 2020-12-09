class CreateAssignments < ActiveRecord::Migration[6.0]
  def change
    create_table :assignments do |t|
      t.date :started
      t.string :deadline
      t.text :description
      t.boolean :completed, :default => false
     

      t.timestamps
    end
  end
end
