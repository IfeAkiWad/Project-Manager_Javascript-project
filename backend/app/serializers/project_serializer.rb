class ProjectSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :started, :deadline, :description, :completed
  belongs_to :developer
end
