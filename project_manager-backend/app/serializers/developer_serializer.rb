class DeveloperSerializer
    def initialize(developer_object)
        @developer = developer_object
    end

    def to_serialized_json
        options = {
            include: {
                projects: {
                    only: [:name, :started, :deadline, :description, :completed]
                }
            }, 
            except: [:created_at, :updated_at],
        }
            @developer.to_json(options)
    end

end