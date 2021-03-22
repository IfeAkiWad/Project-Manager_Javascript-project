class Project < ApplicationRecord
    belongs_to :developer
    validates :name, presence: true
    validates :started, presence: true
    validates :deadline, presence: true
    validates :description, presence: true
end
