class Project < ApplicationRecord
    belongs_to :developer
    validates :developer_id, presence: true
    
end
