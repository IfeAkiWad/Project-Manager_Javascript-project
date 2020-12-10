class DevelopersController < ApplicationController
    def index
        developers = Developer.all
        render json: developers, except: [:created_at, :updated_at]
    end
    
    def show
            developer = Developer.find_by(id: params[:id])
            render json: developer, include: [:projects], except: [:created_at, :updated_at]
    end
end
