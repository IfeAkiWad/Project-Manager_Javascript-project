class DevelopersController < ApplicationController
    def index
        developers = Developer.all
        render json: developers.to_json(except: [:created_at, :updated_at])
    end
    
    def show
        developer = Developer.find_by(id: params[:id])
        options = {
            include: [:projects]
          }
          render json: DeveloperSerializer.new(developer, options)
        # render json: DeveloperSerializer.new(developer).to_serialized_json
    end
end
