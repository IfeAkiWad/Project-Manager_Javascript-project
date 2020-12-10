class DevelopersController < ApplicationController
    def index
        developers = Developer.all
        render json: developers
    end
    
    def show
            developer = Developer.find_by(id: params[:id])
            render json: developer, include: [:projects]
    end
end
